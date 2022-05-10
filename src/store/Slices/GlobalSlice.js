import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: null,
  loading: false,
  error: null,
  loadCount: 0,
  loadedSections: 0,
  showLogin:false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    getBanner: (state) => {
      state.loading = true;
    },
    setBanner: (state, { payload }) => {
      state.banner = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLoadCount: (state, { payload }) => {
      state.loadCount = payload;
    },
    incrementLoadedSection: (state) => {
      state.loadedSections = state.loadedSections + 1;
    },
    incrementLoadCount: (state) => {
      state.loadCount = state.loadCount + 1;
    },
    incrementLoadCountBy: (state, { payload }) => {
      state.loadCount = state.loadCount + payload;
    },
    setLoadedSections: (state, { payload }) => {
      state.loadedSections = payload;
    },
    setLSandLC: (state, { payload }) => {
      state.loadedSections = payload.ls;
      state.loadCount = payload.lc;
    },
    setShowLogin:(state, {payload})=>{
      state.showLogin = payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  getBanner,
  setBanner,
  setError,
  setLoadCount,
  incrementLoadedSection,
  setLoadedSections,
  setLSandLC,
  incrementLoadCount,
  incrementLoadCountBy,
  setShowLogin
} = globalSlice.actions;

export const globalSelector = (state) => state.global;

export default globalSlice.reducer;

export const fetchBanner = (url) => {
  return async (dispatch) => {
    dispatch(getBanner());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/event/${url}/banner`
      );
      const res = await response.json();
      dispatch(setBanner(res.data));
      dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError());
    }
  };
};
