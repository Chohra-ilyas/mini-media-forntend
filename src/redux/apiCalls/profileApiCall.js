import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";

const { profileActions } = require("../slices/profileSlice");

// Get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Updaod profile Photo
export function uplaodProfilePhoto(userId, newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-update/${userId}`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      //modify the user photo in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.other.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// Updaod profile
export function updateProfile(userId, newprofile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        newprofile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.updateUsername(data.username));
      toast.success("profile updated");

      //modify the user photo in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.other.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete Acount
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setIsProfileDeleted(data.userId));
      toast.success(data.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000); //2s
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get user count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setUsersCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// Get All Users (for admin dashboard)
export function getAllUsers() {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setprofiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
