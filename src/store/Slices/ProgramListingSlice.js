import { createSlice } from "@reduxjs/toolkit";
import { objectToArray } from "../../app/helpers/helper";
import { incrementFetchLoadCount } from "./GlobalSlice";
const initialState = {
  programs: null,
  labels:null,
  loading: false,
  error: null,
  total: null,
  totalPages: null,
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    getPrograms: (state, {payload}) => {
      state.loading = true;
      state.programs = null;
    },
    setPrograms: (state, { payload }) => {
      state.programs = payload.data;
      state.labels = state.labels;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPrograms, setPrograms, setError } = programSlice.actions;

export const programSelector = (state) => state.program;

export default programSlice.reducer;

export const fetchPrograms = (url,  limit, search, mount) => {
  return async (dispatch) => {
    dispatch(getPrograms({ mount}));
    let endPoint = `/event/${url}/programs`;
    if (search !== "") {
      endPoint = `/event/${url}/programs?query=${search}`;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}${endPoint}`);
      const res = await response.json();
      dispatch(setPrograms({data:objectToArray(res.data), labels:res.labels}));
      if (mount) {
        dispatch(incrementFetchLoadCount());
      }
    } catch (error) {
      dispatch(setError());
    }
  };
};
