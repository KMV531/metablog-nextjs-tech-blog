import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`
{
  "featuredPost": *[_type == "blog" && isFeatured == true][0] {
    title,
    slug,
    coverImage,
    category->{name},
    author->{name, slug, image},
    _createdAt
  },
  "otherPosts": *[_type == "blog" && isFeatured != true] | order(_createdAt desc) {
    title,
    slug,
    coverImage,
    category->{name},
    author->{name, slug, image},
    _createdAt
  }
}
`);
