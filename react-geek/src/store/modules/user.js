// user related status

import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    // has previous login token or not
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //localstorage copy
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

//
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm); // response from server
    dispatch(setToken(res.data.token)); // set token to redux state
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI(); // response from server
    dispatch(setUserInfo(res.data)); // set uesr info to redux state
  };
};

export { fetchLogin, setToken, setUserInfo, fetchUserInfo, clearUserInfo };
export default userReducer;
