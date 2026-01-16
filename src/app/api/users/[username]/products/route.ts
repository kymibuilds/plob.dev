import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, products } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

// GET /api/users/[username]/products - Get user's active products
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

  const userProducts = await db.query.products.findMany({
    where: and(eq(products.userId, user.id), eq(products.isActive, true)),
    orderBy: [desc(products.createdAt)],
  });

  return NextResponse.json(userProducts);
}
