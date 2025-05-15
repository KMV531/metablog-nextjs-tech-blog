"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Advertisement from "./Advertisement";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  _type: string;
  asset: { _ref: string; _type: string };
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: SanityImage;
  category: { name: string; slug: { current: string } };
  author: {
    name: string;
    slug: { current: string };
    image: SanityImage | null;
  };
  _createdAt: string;
};

const POSTS_PER_PAGE = 6;
const placeholderImage = "/assets/placeholder-image.jpg";

const PaginatedPosts = ({ allPosts }: { allPosts: Post[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const pageParam = searchParams.get("page");
  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  const isPageInvalid = currentPage > totalPages;

  // ✅ This runs even if page is invalid (safe)
  useEffect(() => {
    if (!isPageInvalid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, isPageInvalid]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  if (isPageInvalid) {
    return (
      <div className="text-center py-10 text-red-500 text-lg font-semibold">
        ❌ Page not found. Try a lower page number.
      </div>
    );
  }

  return (
    <>
      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {currentPosts.map((post) => (
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
                <p className="text-[#4B6BFB] rounded-lg p-2 w-max font-medium text-[14px]">
                  {post.category.name}
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

      {/* Pagination */}
      <div className="flex justify-center items-center flex-wrap gap-3 mt-10">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black cursor-pointer"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page
                ? "bg-blue-500 text-white font-bold"
                : "text-gray-800 dark:text-white hover:text-black hover:bg-gray-300 dark:hover:text-black"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 dark:text-black cursor-pointer"
        >
          Next
        </button>
      </div>

      <div className="pt-8">
        <Advertisement />
      </div>
    </>
  );
};

export default PaginatedPosts;
