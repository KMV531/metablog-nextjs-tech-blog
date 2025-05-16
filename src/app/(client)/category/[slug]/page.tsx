// app/category/[slug]/page.tsx

import { fetchCategoryPosts } from "@/sanity/helpers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Advertisement from "@/components/Advertisement";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const data = await fetchCategoryPosts(slug);

  type SanityImage = {
    _type: string;
    asset: { _ref: string; _type: string };
  };

  type Post = {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage: SanityImage; // Strongly type coverImage
    category: { name: string; slug: { current: string } };
    author: {
      name: string;
      slug: { current: string };
      image: SanityImage | null; // Image is optional, so we allow null
    };
    _createdAt: string;
  };

  if (
    !data ||
    (!data.featuredPost && (!data.otherPosts || data.otherPosts.length === 0))
  ) {
    notFound();
  }

  const { featuredPost, otherPosts } = data;
  const placeholderImage = "/assets/placeholder-image.jpg";

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold capitalize mb-8 text-center">
        {slug.replace(/-/g, " ")} Posts
      </h1>

      {/* Featured Post */}
      {featuredPost && (
        <section>
          <div className="container mx-auto py-5 px-5 lg:px-0">
            <div className="relative w-full h-full flex flex-col items-center lg:items-start">
              {featuredPost?.coverImage && (
                <Image
                  src={urlFor(featuredPost.coverImage).url()}
                  alt={featuredPost.title}
                  width={700}
                  height={700}
                  className="object-cover w-full max-w-5xl h-auto rounded-xl mx-auto"
                />
              )}

              {/* Text Container - below image on small screens, absolute on large screens */}
              <div className="flex flex-col space-y-2 mt-6 absolute bottom-10 left-40 rounded-lg max-w-2xl">
                <p className="bg-[#4B6BFB] text-white rounded-lg p-2 w-max font-medium text-[14px]">
                  {featuredPost.category.name}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug.current}`}
                  className="hover:underline transition-all"
                >
                  <h1 className="font-semibold text-xl lg:text-[34px] text-white">
                    {featuredPost.title}
                  </h1>
                </Link>
                <div className="flex items-center gap-4 mt-2">
                  <Image
                    src={
                      featuredPost.author?.image
                        ? urlFor(featuredPost.author.image).url()
                        : featuredPost
                    }
                    alt={featuredPost.author?.name || "Author image"}
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {otherPosts.map((post: Post) => (
            <div
              key={post.title}
              className="bg-white dark:bg-[#181A2A] shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.coverImage && (
                <Image
                  src={urlFor(post.coverImage).url()}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-[80%] h-48 mx-auto"
                />
              )}
              <div className="p-4">
                <p className="dark:bg-transparent  text-[#4B6BFB] rounded-lg p-2 w-max font-medium text-[14px]">
                  {post?.category.name}
                </p>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="hover:underline transition-all"
                >
                  <h3 className="text-lg font-semibold dark:text-white">
                    {post.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-start mt-3 gap-3">
                  <Image
                    src={
                      post.author?.image
                        ? urlFor(post.author.image).url()
                        : placeholderImage
                    }
                    alt={post.author?.name || "Author image"}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                  <Link
                    href={`/about/${post.author.slug.current}`}
                    className="hover:underline transition-all"
                  >
                    <p className="text-[#97989F] text-[16px] dark:text-[#97989F]">
                      {post.author.name}
                    </p>
                  </Link>
                  <p className="text-[#97989F] text-[16px] dark:text-[#97989F] mt-1">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="pt-8">
        <Advertisement />
      </div>
    </main>
  );
}
