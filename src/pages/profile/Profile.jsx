import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModel from "./UpdateProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { RotatingSquare } from "react-loader-spinner";
import {
  deleteProfile,
  getUserProfile,
  uplaodProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
const Profile = () => {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  //Form Sumbit Handler
  const formSumbitHandler = async (e) => {
    e.preventDefault();

    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    toast.dark("wait for update your profile photo");
    await dispatch(uplaodProfilePhoto(id, formData));
    setFile(null);
  };

  // delete post handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?.other._id));
        dispatch(logoutUser());
        swal("Poof! Your Account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Account is safe!");
      }
    });
  };

  if (loading) {
    return (
      <div className="profile-loader">
        <RotatingSquare
          visible={true}
          height="200"
          width="200"
          color="#000"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          {id === user?.other._id && (
            <form onSubmit={formSumbitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                Upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined : </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {id == user?.other._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            userId={profile?._id}
            username={profile?.username}
          />
        ))}
      </div>
      {id === user?.other._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModel
          profile={profile}
          userId={id}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
