import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_BASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Init Supabase:\n", supabase);

const useSupabase = () => {
    return supabase;
};
