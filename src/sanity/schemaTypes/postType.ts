import { defineField, defineType } from "sanity";

export const postTypes = defineType({
  name: "blog", // Changed from "blogs" to singular (standard Sanity convention)
  title: "Blog Post", // More precise
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required().max(100), // Added max length
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96, // Added max length
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: {
        hotspot: true,
      },
      fields: [
        // Added alt text field
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              name: "alt", // Added name property
              type: "text", // Changed to "text" for consistency
              title: "Alternative text",
              validation: (Rule) => Rule.required(), // Added validation
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "comments",
      type: "array",
      title: "Comments",
      of: [
        {
          type: "object",
          name: "embeddedComment",
          fields: [
            {
              name: "clerkUserId",
              type: "string",
              title: "Clerk User ID",
              validation: (Rule) => Rule.required(),
              readOnly: true,
            },
            {
              name: "author",
              type: "object",
              title: "Author Info",
              fields: [
                {
                  name: "profileImage",
                  type: "url",
                  title: "Profile Image URL",
                },
                {
                  name: "username",
                  type: "string",
                  title: "Username",
                },
              ],
            },
            {
              name: "content",
              type: "text",
              title: "Content",
              validation: (Rule) => Rule.required().min(5).max(1000),
            },
            {
              name: "postedAt",
              type: "datetime",
              title: "Posted At",
              initialValue: () => new Date().toISOString(),
              readOnly: true,
            },
            {
              name: "isApproved",
              type: "boolean",
              title: "Approved",
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "category.name", // Now shows category name directly
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Category: ${selection.subtitle || "Uncategorized"}`,
        media: selection.media,
      };
    },
  },
});
