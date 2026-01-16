import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, links } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

// GET /api/users/[username]/links - Get user's public links
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

  const userLinks = await db.query.links.findMany({
    where: eq(links.userId, user.id),
    orderBy: [asc(links.order)],
  });

  return NextResponse.json(userLinks);
}
