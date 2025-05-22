import { BlogComment } from "./commentType";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  author: string;
  authorId: string;
  coverImageUrl: string;
  coverImageAlt: string;
  isFeatured?: boolean;
  comments?: BlogComment[];
  _createdAt: string;
  _updatedAt: string;
}
