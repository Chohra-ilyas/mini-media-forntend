import React, { useEffect, useState } from "react";
import PostsList from "../../components/posts/PostsList";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./postPage.css";
import Pagination from "../../components/pagination/Pagination";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
const POST_PER_PAGE = 3;
const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {postsCount ,posts } = useSelector((state) => state.post);
  const pages = Math.ceil(postsCount / POST_PER_PAGE)
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPosts(currentPage));
  }, [currentPage]);
  
  useEffect(() => {
    dispatch(getPostsCount())
  }, []);
  

  return (
    <>
      <section className="posts-page">
        <PostsList posts={posts} />
        <Sidebar />
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default PostsPage;
