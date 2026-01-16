"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { CenteredLayout } from "@/components/centered-layout";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username validation: alphanumeric and underscores only, 3-10 chars
const usernameRegex = /^[a-zA-Z0-9_]{3,10}$/;

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateForm(): string | null {
    if (!emailRegex.test(email)) {
      return "please enter a valid email address";
    }
    if (!usernameRegex.test(username)) {
      return "username must be 3-10 characters, letters, numbers, and underscores only";
    }
    if (password.length < 6) {
      return "password must be at least 6 characters";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username: username.toLowerCase(), password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "failed to create account");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CenteredLayout>
      <div className="w-full max-w-md flex flex-col gap-4 text-sm">
        {/* title */}
        <h1 className="text-lg font-medium text-center">
          create account
        </h1>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* email */}
          <div className="flex items-center gap-2">
            <span className="w-20 text-muted-foreground">
              email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 bg-transparent outline-none border-b border-border focus:border-foreground"
            />
          </div>

          {/* username */}
          <div className="flex items-center gap-2">
            <span className="w-20 text-muted-foreground">
              username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourname"
              required
              className="flex-1 bg-transparent outline-none border-b border-border focus:border-foreground"
            />
          </div>

          {/* password */}
          <div className="flex items-center gap-2">
            <span className="w-20 text-muted-foreground">
              password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="flex-1 bg-transparent outline-none border-b border-border focus:border-foreground"
            />
          </div>

          {/* hint */}
          <p className="text-[10px] text-muted-foreground">
            password must be at least 6 characters
          </p>

          {error && (
            <p className="text-xs text-destructive">
              {error}
            </p>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="text-left hover:underline disabled:opacity-50"
          >
            {loading ? "creating account…" : "create account"}
          </button>
        </form>

        {/* footer */}
        <p className="text-xs text-muted-foreground text-center">
          already have an account?{" "}
          <Link href="/login" className="hover:underline">
            sign in
          </Link>
        </p>
      </div>
    </CenteredLayout>
  );
}
