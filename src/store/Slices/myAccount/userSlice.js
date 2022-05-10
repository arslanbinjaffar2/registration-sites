import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userData: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setLoginData: (state, { payload }) => {
      state.userData = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setLoginData, setError } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;

export const logUserIn = (id, url, data) => {
    return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}event/${url}/auth/login`, data);
      console.log(response);
      dispatch(setLoginData(response.data.data));
      localStorage.setItem(`event${id}User`, JSON.stringify(response.data.data));
    } catch (error) {
      dispatch(setError());
    }
  };
};
