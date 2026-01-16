import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/get-user";

// GET /api/auth/me - Get current user info
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    bio: user.bio,
  });
}
