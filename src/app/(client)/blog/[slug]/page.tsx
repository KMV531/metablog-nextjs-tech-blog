import CommentSection from "@/components/CommentSection";
import SocialShareButtons from "@/components/SocialShareButtons";
import { fetchBlogDetail } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Comment = {
  clerkUserId: string;
  content: string;
  postedAt: string;
  author: {
    username: string;
    profileImage: string;
  };
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchBlogDetail(slug);

  if (!data?.post) {
    notFound();
  }

  const { post } = data;
  const placeholderImage = "/assets/placeholder-image.jpg";
  const authorImage = post.author?.image
    ? urlFor(post.author.image).url()
    : placeholderImage;

  // Inside your component, construct the share URL
  const blogUrl = `${process.env.NEXT_PUBLIC_URL}/blog/${post?.slug?.current}`;
  const blogTitle = post.title;
  const blogCategory = post.category.name;
  const blogCoverImage = post.coverImage
    ? urlFor(urlFor(post.coverImage).url())
        .width(1200)
        .height(630)
        .format("jpg") // Ensure extension and compatibility
        .url()
    : `${process.env.NEXT_PUBLIC_URL}/assets/Logo.png`; // Ensure this also ends in .webp

  const customComponents: PortableTextReactComponents = {
    types: {
      // Define custom block types if needed
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-6 text-gray-800 dark:text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl font-semibold my-5 text-gray-700 dark:text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl sm:text-2xl font-medium my-4 text-gray-600 dark:text-white">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-lg sm:text-xl leading-relaxed mb-4 text-gray-800 dark:text-white">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc pl-6 space-y-2">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-6 space-y-2">{children}</ol>
      ),
      li: ({ children }) => (
        <li className="text-lg sm:text-xl text-gray-700 dark:text-white">
          {children}
        </li>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-800 dark:text-white">
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-600">{children}</em>
      ),
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children: React.ReactNode;
        value?: { href: string };
      }) => (
        <a
          href={value?.href || "#"}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    list: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2">{children}</ul>
    ),
    listItem: ({ children }) => (
      <li className="text-lg sm:text-xl text-gray-700 dark:text-white">
        {children}
      </li>
    ),
    hardBreak: () => <br />,

    // Adding the required unknown properties with styles
    unknownMark: ({ children }) => (
      <span className="text-red-500 italic">{children}</span> // For unrecognized marks
    ),
    unknownType: ({ children }) => (
      <div className="border-2 border-dashed p-2 text-center text-gray-500">
        {children}
      </div> // For unknown types
    ),
    unknownBlockStyle: ({ children }) => (
      <div className="my-4 p-4 bg-gray-200">{children}</div> // For unknown block styles
    ),
    unknownList: ({ children }) => (
      <ul className="list-inside pl-4 text-gray-600 dark:text-white">
        {children}
      </ul> // For unknown list types
    ),
    unknownListItem: ({ children }) => (
      <li className="list-item text-gray-600 dark:text-white">{children}</li> // For unknown list items
    ),
  };

  // Render the blog post, content blocks, approved comments, and related posts here.
  return (
    <>
      <Head>
        <title>{blogTitle} - MetaBlog</title>
        <meta name="description" content={blogCategory} />

        {/* Open Graph tags */}
        <meta property="og:title" content={blogTitle} />
        <meta property="og:description" content={blogCategory} />
        <meta property="og:image" content={blogCoverImage} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={blogUrl} />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogTitle} />
        <meta name="twitter:description" content={blogCategory} />
        <meta name="twitter:image" content={blogCoverImage} />
      </Head>
      <main className="max-w-7xl mx-auto px-5 lg:px-0">
        <section className="flex flex-col pt-10 pb-4 space-y-2">
          <Link
            href={`/category/${post.category.slug.current}`}
            className="hover:underline transition-all w-max"
          >
            <h1 className="bg-[#4B6BFB] text-white rounded-lg p-2 w-max font-medium text-[14px]">
              {post.category.name}
            </h1>
          </Link>
          <h1 className="text-lg md:text-2xl lg:text-4xl text-[#181A2A] font-bold max-w-5xl dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center justify-start space-x-4">
            <Image
              src={authorImage}
              alt={post.author?.name || "Author image"}
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
            <Link
              href={`/about/${post.author.slug.current}`}
              className="hover:underline transition-all"
            >
              <p className="text-[14px] text-[#696A75] py-2 dark:text-white font-bold">
                {post.author?.name}
              </p>
            </Link>
            <p className="text-[#696A75] text-[14px] pt-2 dark:text-white">
              {new Date(post._createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="py-[32px]">
            {post?.coverImage && (
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.title}
                width={800}
                height={800}
                className="object-cover w-full max-w-4xl h-auto rounded-xl mx-auto"
              />
            )}
          </div>
          <div className="px-0 mx-auto sm:max-w-3xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 leading-8 w-[85%] pb-20">
            {post?.content && (
              <PortableText
                value={post?.content}
                components={customComponents}
              />
            )}
          </div>
          <SocialShareButtons url={blogUrl} title={blogTitle} />
        </section>
        {/* Comment Section (Form or "Login to comment") */}
        <CommentSection blogId={post._id} comments={post.comments || []} />

        {/* Approved Comments */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {post.comments?.length ? (
            <ul className="space-y-6">
              {post.comments.map((comment: Comment, idx: number) => (
                <li key={idx} className="border-b pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    {comment.author?.profileImage && (
                      <Image
                        src={comment.author.profileImage}
                        alt={`${comment.author.username}`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {comment.author?.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white">
                        {new Date(comment.postedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-white">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-white">No comments yet.</p>
          )}
        </section>
      </main>
    </>
  );
}
