"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CommentForm({ blogId }: { blogId: string }) {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Controls visibility

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      blogId,
      content,
      author: {
        username: user.username || "",
        profileImage: user.imageUrl || "",
      },
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setContent("");
        setSubmitted(true);
        toast.success("Thanks! Your comment is awaiting approval.");
      } else {
        const { error } = await res.json();
        toast.error(`Failed to submit comment: ${error || "Unknown error"}`);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-6"
      style={{ display: submitted ? "none" : "block" }} // 👈 Hide form after submit
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-3 border border-gray-300 rounded-md"
        required
        minLength={5}
        maxLength={1000}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}
