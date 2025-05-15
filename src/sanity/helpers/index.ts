import { sanityFetch } from "../lib/live";
import { POST_QUERY } from "./query";

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
