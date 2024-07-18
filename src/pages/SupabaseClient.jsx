import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'PASTE_URL_HERE'
const supabaseKey = 'PASTE_KEY_HERE'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase