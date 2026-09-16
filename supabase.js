import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujmfvlktaxhefrqzkmdl.supabase.co';
const supabaseKey = 'sb_publishable_zcu1n2OSXR7xlizKMHWHgw_IljNK7JS';

export const supabase = createClient(supabaseUrl, supabaseKey);
