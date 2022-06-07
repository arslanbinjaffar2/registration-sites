import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  exhibitor: null,
  documents:null,
  labels: null,
  loading: false,
  error: null,
};

export const exhibitorDetailSlice = createSlice({
  name: "exhibitorDetail",
  initialState,
  reducers: {
    getExhibitor: (state, {payload}) => {
      state.loading = true;
    },
    setExhibitor: (state, { payload }) => {
      state.exhibitor = payload.data.exhibitor;
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
export const { getExhibitor, setExhibitor, setError } = exhibitorDetailSlice.actions;

export const exhibitorDetailSelector = (state) => state.exhibitorDetail;

export default exhibitorDetailSlice.reducer;

export const fetchExhibitor = (url, exhibitor_id) => {
  return async (dispatch) => {
    dispatch(getExhibitor());    
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/exhibitor-detail/${exhibitor_id}`);
      const res = await response.json();
      dispatch(setExhibitor(res));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
