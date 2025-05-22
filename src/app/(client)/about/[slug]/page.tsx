import { fetchAuthorPage } from "@/sanity/helpers";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import PaginatedAuthors from "@/components/PaginatedAuthors";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchAuthorPage(slug);

  if (!data || !data.author) {
    notFound();
  }

  type PortableTextSpan = {
    _key: string;
    _type: "span";
    text: string;
    marks: string[];
  };

  type PortableTextBlock = {
    _key: string;
    _type: "block";
    children: PortableTextSpan[];
    markDefs: unknown[]; // or specific mark types if you know them
    style?: string;
  };

  const { author, posts } = data;

  const placeholderImage = "/assets/placeholder-image.jpg";
  const authorImage = author?.image
    ? urlFor(author.image)?.url()
    : placeholderImage;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Author Info */}
      <section className="flex flex-col items-center justify-center gap-6 mb-12 bg-[#F6F6F7] dark:bg-[#242535] rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Image
            src={authorImage}
            alt={author?.name || "Author image"}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <h1 className="text-[20px] text-[#181A2A] font-bold dark:text-white">
            {author.name}
          </h1>
        </div>
        <div>
          <div className="prose max-w-3xl mt-2 text-center text-[18px] text-[#3B3C4A] dark:text-[#BABABF]">
            {(author.bio as PortableTextBlock[])?.map((block, i) => (
              <p key={block._key || i}>
                {block.children.map((child) => child.text).join(" ")}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Image
            src={"/assets/facebook-button.png"}
            alt="Facebook Icon"
            width={32}
            height={32}
            className="object-cover cursor-pointer"
          />
          <Image
            src={"/assets/twitter-button.png"}
            alt="Twitter Icon"
            width={32}
            height={32}
            className="object-cover cursor-pointer"
          />
          <Image
            src={"/assets/instagram-button.png"}
            alt="Instagram Icon"
            width={32}
            height={32}
            className="object-cover cursor-pointer"
          />
          <Image
            src={"/assets/youtube-button.png"}
            alt="Youtube Icon"
            width={32}
            height={32}
            className="object-cover cursor-pointer"
          />
        </div>
      </section>

      {/* Posts by Author */}
      <section className="container mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold mb-6 max-w-6xl mx-auto">
          Latest Posts
        </h2>
        <PaginatedAuthors posts={posts} author={author} />
      </section>
    </main>
  );
}
