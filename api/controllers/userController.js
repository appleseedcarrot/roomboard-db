// Import supabase client
const supabase = require("../config/supabase.js");

// Create our userController
class UserController {
    async getUsers(req, res) {
        try {
            const { data , error } = await supabase
                .from('user_profiles')
                .select('id, \
                    date_of_birth, \
                    first_name, \
                    last_name, \
                    profile_picture_url')
            
                if (error) {
                    return res.status(400).json({ error: error.message});
                }

                res.json(data);
        }
        catch (err) {
            return res.status(500).json({error : err.message});
        }
    }
    async getProfile(req, res) {
        try {
            // grab user ID
            const userID = req.params.id;
            
            // Perform the query from supabase
            const { data , error } = await supabase
                .from('user_profiles')
                .select('id, \
                    date_of_birth, \
                    bio, \
                    graduation_year, \
                    first_name, \
                    last_name, \
                    profile_picture_url')
                .eq('id', userID); 
            
            // Check for errors
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            
            // Return the query
            res.json(data);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async updateProfile(req, res) {
        try {
            // Grab user's id
            const userID = req.user.id;

            // Grab the new updated profile informations from the body
            // const { firstName, lastName, bio, profilePicture } = req.body;

            // Send update request to profiles table
            const { error: profilesError } = await supabase
            .from('user_profiles')
            .update({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                bio: req.body.bio,
                profile_picture_url: req.body.profilePicture,
            })
            .eq('user_id', userID);

            if (profilesError) throw profilesError;

            res.json({ message: "Profile updated successfully!" });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

// Create an instance of userController
const userController = new UserController();

// Export our controller
module.exports = userController;