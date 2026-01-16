import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

// GET /api/users/[username]/blogs - Get user's published blogs
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userBlogs = await db.query.blogs.findMany({
    where: and(eq(blogs.userId, user.id), eq(blogs.published, true)),
    orderBy: [desc(blogs.createdAt)],
  });

  return NextResponse.json(userBlogs);
}
