import { createClient } from "@supabase/supabase-js";

export async function requireAuth(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return { user: null, error: "No token provided" };
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return { user: null, error: "Unauthorized" };
  }

  return { user: data.user, error: null };
}

