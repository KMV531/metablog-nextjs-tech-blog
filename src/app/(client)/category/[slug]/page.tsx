import { fetchCategoryPosts } from "@/sanity/helpers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Advertisement from "@/components/Advertisement";
import PaginatedCategoryPosts from "@/components/PaginatedCategoryPosts";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchCategoryPosts(slug);

  if (
    !data ||
    (!data.featuredPost && (!data.otherPosts || data.otherPosts.length === 0))
  ) {
    notFound();
  }

  const { featuredPost, otherPosts } = data;
  const placeholderImage = "/assets/placeholder-image.jpg";
  const authorImage =
    featuredPost?.author?.image && urlFor(featuredPost.author.image).url()
      ? urlFor(featuredPost.author.image).url()
      : placeholderImage;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold capitalize mb-8 text-center">
        {slug.replace(/-/g, " ")} Posts
      </h1>

      {featuredPost && (
        <section>
          <div className="container mx-auto py-5 px-5 lg:px-0">
            <div className="relative w-full flex flex-col items-center lg:items-start">
              {/* Featured Image */}
              {featuredPost.coverImage && (
                <Image
                  src={urlFor(featuredPost.coverImage).url()}
                  alt={featuredPost.title}
                  width={1200}
                  height={700}
                  className="object-cover w-full max-w-7xl rounded-xl"
                  priority
                />
              )}

              {/* Dark Overlay on Desktop */}
              <div className="hidden lg:block absolute inset-0 bg-black/40 rounded-xl z-10" />

              {/* Text Container (over image on desktop, below on mobile) */}
              <div className="flex flex-col space-y-2 mt-6 lg:mt-0 lg:absolute lg:bottom-10 lg:left-16 lg:z-20 max-w-2xl px-5">
                <p className="bg-[#4B6BFB] text-white rounded-lg px-3 py-1 w-max font-medium text-[14px]">
                  {featuredPost.category.name}
                </p>

                <Link
                  href={`/blog/${featuredPost.slug.current}`}
                  className="hover:underline transition-all"
                >
                  <h1 className="font-semibold text-xl md:text-2xl lg:text-[34px] text-white drop-shadow-md">
                    {featuredPost.title}
                  </h1>
                </Link>

                {featuredPost.author && (
                  <div className="flex items-center gap-4 mt-2">
                    <Image
                      src={authorImage}
                      alt={featuredPost.author.name || "Author image"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <Link
                      href={`/about/${featuredPost.author.slug.current}`}
                      className="hover:underline transition-all"
                    >
                      <p className="text-white text-[16px]">
                        {featuredPost.author.name}
                      </p>
                    </Link>
                    <p className="text-sm text-white text-[16px]">
                      {new Date(featuredPost._createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Posts */}
      <section className="container mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold mb-6 max-w-6xl mx-auto">
          Latest Posts
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <PaginatedCategoryPosts posts={otherPosts} />
        </Suspense>
      </section>

      <div className="pt-8">
        <Advertisement />
      </div>
    </main>
  );
}
