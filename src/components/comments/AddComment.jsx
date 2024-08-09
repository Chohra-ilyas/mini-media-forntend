import { useState } from "react";
import "./addComment.css";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({postId}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  //Form submit Handler
  const formsubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("please write something");
    dispatch(createComment({text,postId}))
    setText("");
  };
  return (
    <form onSubmit={formsubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="add a comment"
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        comment
      </button>
    </form>
  );
};

export default AddComment;
