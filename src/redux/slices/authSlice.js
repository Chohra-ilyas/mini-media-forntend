import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerMessage: null,
    isEmailVerified: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setUserPhoto(state, action) {
      state.user.other.profilePhoto = action.payload;
    },
    updateUsername(state, action) {
      state.user.other.username = action.payload;
    },
    setIsEmailVerified(state){
      state.isEmailVerified=true
      state.registerMessage=null
    }
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
