import { createSlice } from "@reduxjs/toolkit";
import { incrementLoadedSection } from "./GlobalSlice";
const initialState = {
  exhibitorsByCategories: null,
  loading: false,
  error: null,
};

export const exhibitorSlice = createSlice({
  name: "exhibitor",
  initialState,
  reducers: {
    getExhibitors: (state, {payload}) => {
      state.loading = true;
    },
    setExhibitors: (state, { payload }) => {
      state.exhibitorsByCategories = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getExhibitors, setExhibitors, setError } = exhibitorSlice.actions;

export const exhibitorSelector = (state) => state.exhibitor;

export default exhibitorSlice.reducer;

export const fetchExhibitors = (url) => {
  return async (dispatch) => {
    dispatch(getExhibitors());    
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/exhibitors`);
      const res = await response.json();
      dispatch(setExhibitors(res.data.exhibitors));
        dispatch(incrementLoadedSection());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
