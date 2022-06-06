import { createSlice } from "@reduxjs/toolkit";
import { incrementLoadedSection } from "./GlobalSlice";
const initialState = {
  news: null,
  loading: false,
  labels:null,
  error: null,
};

export const newsDetailSlice = createSlice({
  name: "newsDetail",
  initialState,
  reducers: {
    getNews: (state, {payload}) => {
      state.loading = true;
      state.news = null;
    },
    setNews: (state, { payload }) => {
      state.news = payload.data;
      state.labels = payload.labels;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getNews, setNews, setError } = newsDetailSlice.actions;

export const newsDetailSelector = (state) => state.newsDetail;

export default newsDetailSlice.reducer;

export const fetchNewsDetail = (url,  id) => {
    return async (dispatch) => {
    dispatch(getNews());
    let endPoint = `/event/${url}/news/${id}/detail`; 
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}${endPoint}`);
      const res = await response.json();
      dispatch(setNews(res));
      dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError());
    }
  };
};
