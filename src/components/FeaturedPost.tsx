import { getPost } from "@/sanity/helpers";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const FeaturedPost = async () => {
  const { featuredPost } = await getPost();

  if (!featuredPost) return <p>Not Found</p>;
  const placeholderImage = "/assets/placeholder-image.jpg";

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
                <p className="text-[#97989F] text-[16px] dark:text-[#97989F]">
                  {featuredPost.author.name}
                </p>
              </Link>
              <p className="text-sm text-[#97989F] dark:text-[#97989F] text-[16px]">
                {new Date(featuredPost._createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
