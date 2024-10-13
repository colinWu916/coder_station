import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    clearUserInfo: (state, { payload }) => {
      state.userInfo = {};
    }
  }
})

export const { initUserInfo, changeLoginStatus, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;