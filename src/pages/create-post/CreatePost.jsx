import React, { useEffect, useState } from "react";
import { RotatingSquare } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./createPost.css";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading, isPostCreated } = useSelector((state) => state.post);

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(()=>{
    dispatch(fetchAllCategories());
  },[])

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>{category.title}</option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-post-textarea"
          rows="5"
          placeholder="post description"
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingSquare
              visible={true}
              height="50"
              width="50"
              color="white"
              ariaLabel="rotating-square-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
