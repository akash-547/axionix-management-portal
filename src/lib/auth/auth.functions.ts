
import { createClient } from "@/lib/supabase/client";

type SignInCredentials = {
  email: string;
  password: string;
};

export async function signInWithEmail({
  email,
  password,
}: SignInCredentials) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOutUser() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
