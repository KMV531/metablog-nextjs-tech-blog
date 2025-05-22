export interface BlogComment {
  clerkUserId: string;
  author: {
    profileImage: string;
    username: string;
  };
  content: string;
  postedAt: string;
  isApproved: boolean;
}
