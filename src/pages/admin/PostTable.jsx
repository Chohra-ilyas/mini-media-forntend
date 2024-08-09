import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./adminTable.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";
import { useEffect } from "react";
const PostTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(()=>{
    dispatch(getAllPosts())
  },[])
  
  // delete Post handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId))
        swal("Poof! Your Post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Post is safe!");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      className="table-user-image"
                      src={item.user.profilePhoto.url}
                      alt=""
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
                    <button onClick={()=>{deletePostHandler(item._id)}}>Delete Post</button>
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

export default PostTable;
