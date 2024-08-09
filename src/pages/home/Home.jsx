import React, { useEffect } from "react";
import PostsList from "../../components/posts/PostsList";
import "./home.css";
import {useDispatch, useSelector} from "react-redux"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from "react-router-dom";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  useEffect(()=>{
    dispatch(fetchPosts(1));
  },[])
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">welcome to blog</h1>
        </div>
      </div>
      <div className="home-latest-post">latest posts</div>
      <div className="home-container">
        <PostsList posts={posts} />
        <Sidebar/>
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
