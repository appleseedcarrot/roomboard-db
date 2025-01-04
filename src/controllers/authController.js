const supabase = require("../config/supabase");

class AuthController {
  async signUp(req, res) {
    try {
        const { email, password } = req.body;
        
        // Authenticate user
        const { data: signUpData , error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) throw signUpError;
        
        // Our new user data
        const userData = signUpData;

        // Add new user to user profiles
        const { error: createUserError } = await supabase
            .from('users')
            .insert({
                id: userData.id,
                email: userData.email,
                created_at: new Date(),
            });
        if (createUserError) {
            // Make sure to delete our user if there was an error
            await supabase.auth.admin.deleteUser(userData.id);
            throw createUserError;
        }

        // Now create user_profile
        const { error: createProfileError } = await supabase
            .from('user_profiles')
            .insert({
                id: userData.id,
                date_of_birth: null,
                bio: "",
                graduation_year: null,
                profile_picture_url: "",
            });
        if (createProfileError) {
            // Make sure to delete our user if there was an error
            await supabase.auth.admin.deleteUser(userData.id);
            throw createProfileError;
        }

        res.json({
            message: "Signup successful! Check your email for verification.",
            user: signUpData.user,
        });
        } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      res.json({
        message: "Login successful",
        session: data.session,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();