import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult?.userId;
  } catch (authError) {
    console.error("Auth error:", authError);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }

  if (!userId) {
    console.warn("Missing userId from Clerk auth.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch (jsonError) {
    console.error("Failed to parse JSON body:", jsonError);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { blogId, content, author } = body;

  if (!blogId) console.warn("Missing blogId:", blogId);
  if (!content) console.warn("Missing content:", content);
  if (!author) console.warn("Missing author:", author);

  if (!blogId || !content || !author) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const result = await writeClient
      .patch(blogId)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: crypto.randomUUID(), // ✅ Unique key
          _type: "embeddedComment",
          clerkUserId: userId,
          content,
          postedAt: new Date().toISOString(),
          isApproved: false,
          author,
        },
      ])
      .commit();

    return NextResponse.json({ success: true, result });
  } catch (dbError) {
    console.error("Sanity write error:", dbError);
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
