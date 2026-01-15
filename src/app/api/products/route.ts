import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

// GET: Fetch all products for the authenticated user
export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, user.id))
    .orderBy(desc(products.createdAt));

  return NextResponse.json(userProducts);
}

// POST: Create a new product
export async function POST(request: NextRequest) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, price, imageUrl } = body;

  if (!name || !price) {
    return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
  }

  const [newProduct] = await db
    .insert(products)
    .values({
      userId: user.id,
      name,
      description: description || null,
      price,
      imageUrl: imageUrl || null,
    })
    .returning();

  return NextResponse.json(newProduct, { status: 201 });
}
