import { useState, useEffect } from "react";
import "./updatePost.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModel = ({ post, setUpdatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  //form Update handler
  const formUpdateHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  return (
    <div className="update-post">
      <form onSubmit={formUpdateHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-post-input"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="update-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows="5"
          className="update-post-textarea"
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModel;
