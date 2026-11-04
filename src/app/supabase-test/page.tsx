
"use client";

import { useEffect, useState } from "react";

export default function SupabaseTestPage() {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!url || !key) {
        setStatus("Missing Supabase environment variables.");
        return;
      }

      try {
        const response = await fetch(`${url}/auth/v1/settings`, {
          headers: { apikey: key },
        });

        setStatus(
          response.ok
            ? "Supabase connection successful!"
            : `Supabase responded with status: ${response.status}`
        );
      } catch {
        setStatus("Connection failed. Check URL and network.");
      }
    }

    testConnection();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">
        Supabase Connection Test
      </h1>
      <p className="mt-4">{status}</p>
    </main>
  );
}
