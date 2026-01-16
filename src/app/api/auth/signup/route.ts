import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

// Validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,10}$/;

export async function POST(req: Request) {
  // Rate limit: 3 signups per hour per IP
  const ip = getClientIP(req);
  const { success, remaining, resetIn } = rateLimit(`signup:${ip}`, {
    maxRequests: 3,
    windowMs: 3600000, // 1 hour
  });

  if (!success) {
    return new NextResponse("Too many signup attempts. Please try again later.", {
      status: 429,
      headers: {
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(Math.ceil(resetIn / 1000)),
      },
    });
  }

  const { email, username, password } = await req.json();

  // Validate required fields
  if (!email || !username || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return new NextResponse("Invalid email format", { status: 400 });
  }

  // Validate username format
  if (!usernameRegex.test(username)) {
    return new NextResponse("Username must be 3-10 characters, letters, numbers, and underscores only", { status: 400 });
  }

  // Validate password length
  if (password.length < 6) {
    return new NextResponse("Password must be at least 6 characters", { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const [user] = await db
      .insert(users)
      .values({ email: email.toLowerCase(), username: username.toLowerCase(), passwordHash })
      .returning();

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    return new NextResponse(null, {
      status: 201,
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (error: unknown) {
    // Handle unique constraint violations
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return new NextResponse("Email or username already taken", { status: 409 });
    }
    throw error;
  }
}
