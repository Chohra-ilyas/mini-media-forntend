import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./adminTable.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";
import { useEffect } from "react";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(()=>{
    dispatch(fetchAllComments())
  },[])

  // delete Comment handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId))
        swal("Poof! Your Comment has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Comment is safe!");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment,index) => (
              <tr key={comment._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      className="table-user-image"
                      src={comment.user.profilePhoto.url}
                      alt=""
                    />
                    <span className="table-username">{comment.user.username}</span>
                  </div>
                </td>
                <td>{comment.text}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={()=>{deleteCommentHandler(comment._id)}}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
