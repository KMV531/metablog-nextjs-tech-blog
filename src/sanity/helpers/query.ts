import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`
{
  "featuredPost": *[_type == "blog" && isFeatured == true][0] {
    title,
    slug,
    coverImage,
    category->{name, slug},
    author->{name, slug, image},
    _createdAt
  },
  "otherPosts": *[_type == "blog" && isFeatured != true] | order(_createdAt desc) {
    title,
    slug,
    coverImage,
    category->{name, slug},
    author->{name, slug, image},
    _createdAt
  },
  "allPosts": *[_type == "blog"] | order(_createdAt desc) {
    title,
    slug,
    coverImage,
    category->{name, slug},
    author->{name, slug, image},
    _createdAt
  }
}
`);

export const CATEGORY_POSTS_QUERY = (slug: string) => `
{
  "featuredPost": *[_type == "blog" && isFeatured == true && references(*[_type == "category" && slug.current == "${slug}"][0]._id)][0] {
    title,
    slug,
    coverImage,
    category->{name, slug},
    author->{name, slug, image},
    _createdAt
  },
  "otherPosts": *[_type == "blog" && isFeatured != true && references(*[_type == "category" && slug.current == "${slug}"][0]._id)] | order(_createdAt desc) {
    title,
    slug,
    coverImage,
    category->{name, slug},
    author->{name, slug, image},
    _createdAt
  }
}
`;

export const AUTHOR_PAGE_QUERY = (slug: string) => `
{
  "author": *[_type == "author" && slug.current == "${slug}"][0]{
    name,
    image,
    bio,
    slug
  },
  "posts": *[_type == "blog" && author->slug.current == "${slug}"] | order(_createdAt desc){
    title,
    slug,
    coverImage,
    _createdAt,
    category->{name, slug}
  }
}
`;
