import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for server components
export const getServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}
