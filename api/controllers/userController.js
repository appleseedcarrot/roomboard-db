// Import supabase client
const supabase = require("../config/supabase.js");

// Create our userController
class UserController {
    async getUsers(req, res) {
        try {
            const { data , error } = await supabase
                .from('user_profiles')
                .select('date_of_birth, \
                    bio, \
                    graduation_year, \
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
                .select('date_of_birth, \
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
            const { firstname, lastname, bio, date_of_birth, profile_picture_url } = req.body;

            // Send update request to users table
            const { error: usersError } = await supabase
                .from('users')
                .update({
                    firstname,
                    lastname,
                })
                .eq('id', userID);

            if (usersError) throw usersError;

            // Send update request to profiles table
            const { error: profilesError } = await supabase
            .from('user_profiles')
            .update({
                bio,
                date_of_birth,
                profile_picture_url,
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