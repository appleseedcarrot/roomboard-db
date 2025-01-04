const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Check that both url and anon key have been provided
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_URL or SUPABASE_ANON_KEY is missing");
}

// Create our supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Export so we can use in the other file
module.exports = supabase;