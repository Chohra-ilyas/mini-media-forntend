import { useState } from "react";
import "./updateprofile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModel = ({ userId, profile, setUpdateProfile }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(profile?.username);
  const [bio, setBio] = useState(profile?.bio);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //form Update handler
  const formUpdateHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(userId, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formUpdateHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Your profile</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          className="update-profile-input"
          placeholder="userName"
        />
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="bio"
        />
        <div className="password">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="update-profile-input passord-input"
            placeholder="password"
          />
          {!showPassword && (
            <i
              onClick={() => setShowPassword(true)}
              className="bi bi-eye password-eye"
            ></i>
          )}
          {showPassword && (
            <i
              onClick={() => setShowPassword(false)}
              className="bi bi-eye-slash password-eye"
            ></i>
          )}
        </div>
        <button type="submit" className="update-profile-btn">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModel;
