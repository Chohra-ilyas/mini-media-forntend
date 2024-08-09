import { useState } from "react";
import "./commentList.css";
import swal from "sweetalert";
import Moment from "react-moment";
import UpdateCommentModel from "./UpdateCommentModel";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
const CommentList = ({ comments }) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setUpdateCommentForUpdate] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Update Comment Handler
  const UpdateCommentHandler = (comment) => {
    setUpdateCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // delete post handler
  const deleteCommentHandler = (comment) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(comment?._id));
        swal("Poof! Your comment has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your comment is safe!");
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length}</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment.username}</div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          <div className="comment-item-icon-wrapper">
            {user?.other._id === comment.user && (
              <>
                <i
                  onClick={() => UpdateCommentHandler(comment)}
                  className="bi bi-pencil-square"
                ></i>
                <i
                  onClick={() => deleteCommentHandler(comment)}
                  className="bi bi-trash-fill"
                ></i>
              </>
            )}
          </div>
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModel
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
