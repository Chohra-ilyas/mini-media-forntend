import { useState } from "react";
import "./updateComment.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModel = ({ setUpdateComment,commentForUpdate }) => {
  const [text, setText] = useState(commentForUpdate.text);
  const dispatch = useDispatch();


  //form Update handler
  const formUpdateHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("text is required");

    dispatch(updateComment(commentForUpdate?._id,{text}))
    setUpdateComment(false)
  };

  return (
    <div className="update-comment">
      <form onSubmit={formUpdateHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Update Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
        />
        <button type="submit" className="update-comment-btn">
          Update Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModel;

