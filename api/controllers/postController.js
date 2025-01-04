// Import supabase client
const supabase = require("../config/supabase.js");

// Create our userController
class PostController {
    
    async getAllPosts(req, res) {
        try {
            // make the query
            const { data , error } = await supabase
                .from('posts')
                .select(
                    'created_at, \
                    genre, \
                    description, \
                    picture_url, \
                    user_id');
            
            if (error) throw error;
            res.json(data);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getPostByID(req, res) {
        try {
            // get post id
            const postID = req.params.id;
            // make the query
            const { data, error } = await supabase
                .from('posts')
                .select(
                    'created_at, \
                    genre, \
                    description, \
                    picture_url, \
                    user_id'
                )
                .eq("id", postID)
                .single();

            if (error) throw error;
            // check if our post exists
            if (!data) {
                return res.status(404).json({error: "Post does not exist"});
            }
            res.json(data);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }

    }
    async createPost(req, res) {
        try {
            // get the post information from the body
            const { genre, description, picture_url } = req.body;
            // get user id
            const userID = req.user.id;
            // make the query
            const { data , error } = await supabase
                .from('posts')
                .insert({
                    created_at: new Date().toISOString,
                    genre,
                    description,
                    picture_url,
                    user_id: userID,
                });
            
            if (error) throw error;
            res.json(data)
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updatePost(req, res) {
        try {
            // get user id
            const userID = req.user.id;
            // update post
            const { data , error } = await supabase
                .from('posts')
                .update({
                    genre,
                    description,
                    picture_url
                })
                .eq('user_id', userID);

            if (error) throw error;
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deletePost(req, res) {
        try {
            // get the post id
            const postID = req.params.id;
            // get the user's id
            const userID = req.user.id;
            // make the query
            const { data, error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postID)
                .eq('user_id', userID)
            
            if (error) throw error;
            // user might not be authenticated to delete post
            if (data.length === 0) {
                return res.status(404).json({ error: "You are not authenticated to delete this post"});
            }
            res.json({ message: "Post was deleted"});
        }
        catch (err) {
            res.status(400).json({error: err.message});
        }
    }
}

// Create an instance of userController
const postController = new PostController();

// Export our controller
module.exports = postController;