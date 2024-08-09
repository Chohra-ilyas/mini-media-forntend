import { Link, useNavigate, useParams } from "react-router-dom";
import "./postDetails.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModel from "./UpdatePostModel";
import {
  deletePost,
  getPostById,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";
import Moment from "react-moment";
const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostById(id));
  }, [id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    toast.dark("wait for update your profile photo");
    dispatch(updatePostImage(formData, post?._id));
  };

  // delete post handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?.other._id}`);
      } else {
        swal("Your post is safe!");
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?.other._id === post?.user?._id && (
          <form
            className="update-post-image-form"
            onSubmit={updateImageSubmitHandler}
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select New Image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user.username}
            </Link>
          </strong>
          <Moment fromNow ago>
            {post?.createdAt}
          </Moment>{" "}
          ago
        </div>
      </div>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?.other._id)
                  ? "bi bi-hand-thumbs-up-fill like-fill"
                  : "bi bi-hand-thumbs-up like-fill"
              }
            ></i>
          )}
          <small> {post?.likes.length} likes</small>
        </div>
        {user?.other._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">to write a comment you should login first</p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
