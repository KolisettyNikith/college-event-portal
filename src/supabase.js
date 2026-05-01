
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lgvaojgtivxujwuhxgmd.supabase.co'

const supabaseKey = 'sb_publishable_zVDqm_NJVwATUnZEbLkVHA_cuPOlm3H'

export const supabase = createClient(supabaseUrl, supabaseKey)

