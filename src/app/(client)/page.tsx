import { getPost } from "@/sanity/helpers";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Advertisement from "@/components/Advertisement";

const HomePage = async () => {
  const { featuredPost } = await getPost();

  if (!featuredPost) return <p>Not Found</p>;

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
  const { otherPosts } = await getPost();
  const placeholderImage = "/assets/placeholder-image.jpg";

  if (!otherPosts || otherPosts.length === 0) {
    return <p className="text-center">No other posts found.</p>;
  }

  return (
    <section>
      <div className="container mx-auto py-5 px-5 lg:px-0">
        <div className="relative w-full h-full flex flex-col items-center lg:items-start">
          {featuredPost?.coverImage && (
            <Image
              src={urlFor(featuredPost.coverImage).url()}
              alt={featuredPost.title}
              width={700}
              height={700}
              className="object-cover w-full max-w-4xl h-auto rounded-xl mx-auto"
            />
          )}

          {/* Text Container - below image on small screens, absolute on large screens */}
          <div className="bg-white dark:bg-[#181A2A] shadow-lg p-5 flex flex-col space-y-2 mt-6 lg:mt-0 lg:absolute lg:bottom-10 lg:left-30 rounded-lg max-w-xl">
            <Link
              href={`/category/${featuredPost.category.slug.current}`}
              className="hover:underline transition-all"
            >
              <p className="bg-[#4B6BFB] text-white rounded-lg p-2 w-max font-medium text-[14px]">
                {featuredPost.category.name}
              </p>
            </Link>
            <Link
              href={`/blog/${featuredPost.slug.current}`}
              className="hover:underline transition-all"
            >
              <h1 className="font-semibold text-xl lg:text-[36px] dark:text-white">
                {featuredPost.title}
              </h1>
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <Image
                src={
                  featuredPost.author?.image
                    ? urlFor(featuredPost.author.image).url()
                    : placeholderImage
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
                <p className="text-[#97989F] text-[16px]">
                  {featuredPost.author.name}
                </p>
              </Link>
              <p className="text-sm text-[#97989F] text-[16px]">
                {new Date(featuredPost._createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="px-5 py-10">
        <h2 className="text-2xl font-bold mb-6 max-w-6xl mx-auto">
          Latest Posts
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {otherPosts.slice(0, 6).map((post: Post) => (
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
                <Link
                  href={`/category/${post.category.slug.current}`}
                  className="hover:underline transition-all"
                >
                  <p className="dark:bg-transparent  text-[#4B6BFB] rounded-lg p-2 w-max font-medium text-[14px]">
                    {post?.category.name}
                  </p>
                </Link>
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
                    <p className="text-[#97989F] text-[16px]">
                      {post.author.name}
                    </p>
                  </Link>
                  <p className="text-[#97989F] text-[16px] mt-1">
                    {new Date(post._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="py-5 flex justify-center">
        <Link
          href={"/blog"}
          className="border border-[#97989F] rounded-lg p-2 text-[#696A75] text-[16px]"
        >
          View All Post
        </Link>
      </div>
      <div className="py-10">
        <Advertisement />
      </div>
    </section>
  );
};

export default HomePage;
