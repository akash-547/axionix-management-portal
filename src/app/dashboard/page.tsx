
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";

export const instant = false;

async function DashboardContent() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold tracking-widest text-cyan-400">
          AXIONIX X
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Agency Management Dashboard
        </h1>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">
            Account
          </h2>

          <p className="mt-2 text-slate-400">
            Signed in as: {user.email}
          </p>

          <p className="mt-4 text-sm text-amber-400">
            Role-based permissions are not configured yet.
          </p>

          <LogoutButton />
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 p-8 text-white">
          Loading dashboard...
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
