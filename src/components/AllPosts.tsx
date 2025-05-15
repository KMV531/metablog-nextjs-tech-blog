import { getPost } from "@/sanity/helpers";
import PaginatedPosts from "./PaginatedPosts";

const AllPosts = async () => {
  const { allPosts } = await getPost();

  if (!allPosts || allPosts.length === 0) {
    return <p className="text-center">No blog posts available.</p>;
  }

  return (
    <section className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center py-10">Blog Page</h1>
      <PaginatedPosts allPosts={allPosts} />
    </section>
  );
};

export default AllPosts;
