import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, blogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// GET /api/users/[username]/blogs/[slug] - Get a specific published blog by slug
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string; slug: string }> }
) {
  const { username, slug } = await params;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const blog = await db.query.blogs.findFirst({
    where: and(
      eq(blogs.userId, user.id),
      eq(blogs.slug, slug),
      eq(blogs.published, true)
    ),
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  // Increment views
  await db
    .update(blogs)
    .set({ views: blog.views + 1 })
    .where(eq(blogs.id, blog.id));

  return NextResponse.json({
    ...blog,
    views: blog.views + 1,
  });
}
