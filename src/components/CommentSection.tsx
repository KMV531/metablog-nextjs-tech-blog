"use client";

import { useUser } from "@clerk/nextjs";
import CommentForm from "@/components/CommentForm";

type Comment = {
  clerkUserId: string;
  content: string;
  postedAt: string;
  author: {
    username: string;
    profileImage: string;
  };
};

export default function CommentSection({
  blogId,
  comments,
}: {
  blogId: string;
  comments: Comment[];
}) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const hasCommented =
    comments?.some((c) => c.clerkUserId === user?.id) ?? false;

  if (!user) {
    return (
      <p className="text-[20px] text-[#181A2A] font-bold dark:text-white bg-[#F6F6F7] dark:bg-[#242535] border border-yellow-300 p-4 rounded-md mt-8">
        <span className="font-medium">Login to comment:</span> You must be
        signed in to leave a comment.
      </p>
    );
  }

  return hasCommented ? null : <CommentForm blogId={blogId} />;
}

/* 
"use client";

import { useUser } from "@clerk/nextjs";
import CommentForm from "@/components/CommentForm";

export default function CommentSection({ blogId }: { blogId: string }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return user ? (
    <CommentForm blogId={blogId} />
  ) : (
    <p className="text-[20px] text-[#181A2A] font-bold dark:text-white bg-[#F6F6F7] dark:bg-[#242535] border border-yellow-300 p-4 rounded-md mt-8">
      <span className="font-medium">Login to comment:</span> You must be signed
      in to leave a comment.
    </p>
  );
}

*/
