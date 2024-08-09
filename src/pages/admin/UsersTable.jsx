import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import "./adminTable.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getAllUsers,
} from "../../redux/apiCalls/profileApiCall";
import { useEffect } from "react";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // delete User handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
        swal("Poof! Your User has been deleted!", {
          icon: "success",
        });
      } else {
        swal("User is safe!");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => (
              <tr key={profile._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      className="table-user-image"
                      src={profile.profilePhoto.url}
                      alt=""
                    />
                    <span className="table-username">{profile.username}</span>
                  </div>
                </td>
                <td>{profile.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${profile._id}`}>View Profile</Link>
                    </button>
                    <button
                      onClick={() => {
                        deleteUserHandler(profile._id);
                      }}
                    >
                      Delete User
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

export default UsersTable;
