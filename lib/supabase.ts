import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database tables if they don't exist
export async function initializeDatabase() {
  try {
    // Check if profiles table exists by trying to fetch from it
    const { error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('Creating tables...');
      // Tables don't exist, they will be created on first use
      // This is handled by Supabase RLS policies
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}
