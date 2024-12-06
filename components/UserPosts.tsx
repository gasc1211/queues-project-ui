"use client";

import { getPosts } from "@/app/api/handler";
import { Post } from "@/utils/types";
import { useEffect, useState } from "react";

export const UserPosts = ({ userId, token }: { userId: number, token: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(userId, token);
      setPosts(response);
    }
    fetchPosts();

  }, [userId, token])

  return (
    <div>
      {posts && posts.map((post) => (
        <p key={post.post_id}>{post.content}</p>
      ))}
    </div>
  );
}