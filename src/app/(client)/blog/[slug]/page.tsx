import { fetchBlogDetail } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  const customComponents: PortableTextReactComponents = {
    types: {
      // Define custom block types if needed
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-6 text-gray-800">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl font-semibold my-5 text-gray-700">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl sm:text-2xl font-medium my-4 text-gray-600">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-lg sm:text-xl leading-relaxed mb-4 text-gray-800">
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
        <li className="text-lg sm:text-xl text-gray-700">{children}</li>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-800">{children}</strong>
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
      <li className="text-lg sm:text-xl text-gray-700">{children}</li>
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
      <ul className="list-inside pl-4 text-gray-600">{children}</ul> // For unknown list types
    ),
    unknownListItem: ({ children }) => (
      <li className="list-item text-gray-600">{children}</li> // For unknown list items
    ),
  };

  // Render the blog post, content blocks, approved comments, and related posts here.
  return (
    <main className="max-w-7xl mx-auto px-5 lg:px-0">
      <section className="flex flex-col pt-10 pb-4 space-y-2">
        <h1 className="bg-[#4B6BFB] text-white rounded-lg p-2 w-max font-medium text-[14px]">
          {post.category.name}
        </h1>
        <h1 className="text-[36px] text-[#181A2A] font-bold max-w-5xl">
          {post.title}
        </h1>
        <div className="flex items-center justify-start space-x-4">
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
          <p className="text-[14px] text-[#696A75] py-2">{post.author?.name}</p>
          <p className="text-[#696A75] text-[14px] pt-2">
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
        <div className="px-0 mx-auto sm:max-w-2xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 leading-8 w-[75%] pb-28">
          {post?.content && (
            <PortableText value={post?.content} components={customComponents} />
          )}
        </div>
      </section>
    </main>
  );
}
