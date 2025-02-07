import React, { useState, useEffect } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts"); // Replace with your endpoint
        const data = await response.json();
        console.log(data); // Debugging
        setPosts(data); // Ensure data is an array
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []); // Run only once on component mount

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => <li key={index}>{post.title}</li>) // Adjust property as needed
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default PostsPage;
