import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    profiles: [],
    usersCount: null,
  },
  reducers: {
    setProfile(state, actions) {
      state.profile = actions.payload;
    },
    setProfilePhoto(state, actions) {
      state.profile.profilePhoto = actions.payload;
    },
    updateProfile(state, actions) {
      state.profile = actions.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProfileDeleted(state,action) {
      state.isProfileDeleted = true;
      state.profiles = state.profiles.filter((p) => p._id !== action.payload);
      state.loading = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    setUsersCount(state, action) {
      state.usersCount = action.payload;
    },
    setprofiles(state, action) {
      state.profiles = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };
