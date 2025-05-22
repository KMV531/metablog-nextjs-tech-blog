import { algoliasearch } from "algoliasearch";
import { client } from "@/sanity/lib/client";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { BlogPost } from "../../../../../types/blogType";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.ALGOLIA_API_KEY!;
const indexName = process.env.ALGOLIA_INDEX_NAME!;
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET!;

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);

async function performInitialIndexing() {
  console.log("Starting initial indexing...");

  // Fetch all blog posts from Sanity
  const sanityData = await client.fetch(`*[_type == "blog"]{
    _id,
    title,
    "slug": slug.current,
    "category": category->name,
    "categorySlug": category->slug.current,
    "author": author->name,
    "authorId": author->_id,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    isFeatured,
    comments,
    _createdAt,
    _updatedAt
  }`);

  const records = sanityData.map((doc: BlogPost) => ({
    objectID: doc._id,
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    categorySlug: doc.categorySlug,
    author: doc.author,
    authorId: doc.authorId,
    coverImage: {
      url: doc.coverImageUrl,
      alt: doc.coverImageAlt,
    },
    isFeatured: doc.isFeatured || false,
    comments: doc.comments || [],
    _createdAt: doc._createdAt,
    _updatedAt: doc._updatedAt,
  }));

  // Save all records to Algolia
  await algoliaClient.saveObjects({
    indexName,
    objects: records,
  });

  console.log("Initial indexing completed.");
  return { message: "Successfully completed initial indexing!" };
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const initialIndex = searchParams.get("initialIndex") === "true";

    if (initialIndex) {
      const response = await performInitialIndexing();
      return Response.json(response);
    }

    // Validate webhook signature
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) {
      return Response.json(
        { success: false, message: "Missing signature header" },
        { status: 401 }
      );
    }

    // Get request body for signature validation
    const body = await request.text();
    const isValid = await isValidSignature(body, signature, webhookSecret);
    if (!isValid) {
      return Response.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch (err) {
      return Response.json(
        { error: "Invalid JSON payload:", err },
        { status: 400 }
      );
    }

    const { _id, operation, value } = payload;

    if (!operation || !_id || !value) {
      return Response.json(
        { error: "Invalid payload, missing required fields" },
        { status: 400 }
      );
    }

    if (operation === "delete") {
      await algoliaClient.deleteObject({
        indexName,
        objectID: _id,
      });
      console.log(`Deleted object with ID: ${_id}`);
      return Response.json({
        message: `Successfully deleted blog post with ID: ${_id}`,
      });
    } else {
      const updatedDoc = {
        objectID: value._id,
        title: value.title,
        slug: value.slug?.current,
        category: value.category?.name,
        categorySlug: value.category?.slug?.current,
        author: value.author?.name,
        authorId: value.author?._id,
        coverImage: {
          url: value.coverImage?.asset?.url,
          alt: value.coverImage?.alt,
        },
        content: value.content,
        isFeatured: value.isFeatured || false,
        comments: value.comments || [],
        _createdAt: value._createdAt,
        _updatedAt: value._updatedAt,
      };
      await algoliaClient.saveObject({
        indexName,
        body: updatedDoc,
      });
      console.log(`Indexed/Updated object with ID: ${_id}`);
      return Response.json({
        message: `Successfully processed document with ID: ${_id}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      // Type guard to check if error is an instance of Error
      console.error("Error indexing objects:", error.message);
      return Response.json(
        { error: "Error indexing objects", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error:", error);
      return Response.json(
        { error: "Unexpected error", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
