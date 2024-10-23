import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);
  if(posts.length > 0){
    return <div>Login to read posts</div>;
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
};

export default Home;
