import Advertisement from "@/components/Advertisement";
import FeaturedPost from "@/components/FeaturedPost";
import OtherPosts from "@/components/OtherPosts";
import React from "react";

const HomePage = () => {
  return (
    <>
      <FeaturedPost />
      <Advertisement />
      <OtherPosts />
    </>
  );
};

export default HomePage;
