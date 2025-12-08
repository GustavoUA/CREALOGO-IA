// Middleware simple para proteger rutas usando Supabase Auth
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function requireAuth() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { redirect: "/login", user: null };
  }

  return { user };
}
