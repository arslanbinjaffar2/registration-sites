import { createSlice } from "@reduxjs/toolkit";
import { incrementFetchLoadCount } from "./GlobalSlice";
const initialState = {
  documents: null,
  labels: null,
  loading: false,
  error: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    getDocuments: (state, {payload}) => {
      state.loading = true;
    },
    setDocuments: (state, { payload }) => {
      state.documents = payload.data.documents;
      state.labels = payload.labels;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDocuments, setDocuments, setError } = documentsSlice.actions;

export const documentsSelector = (state) => state.documents;

export default documentsSlice.reducer;

export const fetchDocuments = (url) => {
  return async (dispatch) => {
    dispatch(getDocuments());    
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/documents`);
      const res = await response.json();
      dispatch(setDocuments(res));
      dispatch(incrementFetchLoadCount());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
