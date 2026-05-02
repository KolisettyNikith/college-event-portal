import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lgvaojgtivxujwuhxgmd.supabase.co";
const supabaseAnonKey = "sb_publishable_zVDqm_NJVwATUnZEbLkVHA_cuPOlm3H";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const tables = ['events', 'participants', 'winners'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(3);
    console.log(`\nTable: ${t}`);
    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
  }
}

run();
