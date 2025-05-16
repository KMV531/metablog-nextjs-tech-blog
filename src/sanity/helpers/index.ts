import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import {
  AUTHOR_PAGE_QUERY,
  BLOG_DETAIL_QUERY,
  CATEGORY_POSTS_QUERY,
  POST_QUERY,
} from "./query";

export const getPost = async () => {
  try {
    const postData = await sanityFetch({
      query: POST_QUERY,
    });
    return postData?.data || [];
  } catch (error) {
    console.error("Error fetching Posts data:", error);
    return null;
  }
};

export async function fetchCategoryPosts(slug: string) {
  const query = CATEGORY_POSTS_QUERY(slug);
  return await client.fetch(query);
}

export async function fetchAuthorPage(slug: string) {
  const query = AUTHOR_PAGE_QUERY(slug);
  return await client.fetch(query);
}

export async function fetchBlogDetail(slug: string) {
  const query = BLOG_DETAIL_QUERY(slug);
  return await client.fetch(query);
}
