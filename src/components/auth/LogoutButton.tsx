
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/lib/auth/auth.functions";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      await signOutUser();

      router.replace("/login");
      router.refresh();
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-400 disabled:opacity-60"
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
