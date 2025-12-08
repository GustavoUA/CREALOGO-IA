import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default function supabaseServer() {
  return createServerComponentClient({ cookies });
}
