import { createSlice } from "@reduxjs/toolkit";
import { incrementFetchLoadCount } from "./GlobalSlice";
const initialState = {
  floorPlans: null,
  categories: [],
  sponsorCount: 0,
  exhibitorCount: 0, 
  labels: null,
  loading: false,
  error: null,
};

export const floorPlanListingSlice = createSlice({
  name: "floorPlanListing",
  initialState,
  reducers: {
    getFloorPlans: (state, {payload}) => {
      state.loading = true;
    },
    setFloorPans: (state, { payload }) => {
      state.floorPlans = payload.data.floorPlans;
      state.categories = payload.data.filters;
      state.sponsorCount = payload.data.sponsorCount;
      state.exhibitorCount = payload.data.exhibitorCount;
      state.labels = payload.labels;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearAll:(state, {payload})=>{
      state.floorPlans = null;
      state.categories = [];
      state.sponsorCount = 0;
      state.exhibitorCount = 0;
      state.labels = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getFloorPlans, setFloorPans, setError, clearAll } = floorPlanListingSlice.actions;

export const floorPlanListingSelector = (state) => state.floorPlanListing;

export default floorPlanListingSlice.reducer;

export const fetchFloorPlans = (url) => {
  return async (dispatch) => {
    dispatch(getFloorPlans());    
    try {
      const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/floor-plans`);
      const res = await response.json();
      dispatch(setFloorPans(res));
      setTimeout(()=>{
        dispatch(incrementFetchLoadCount());
      }, 50)
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const clearState = () => {
  return async (dispatch) => {
    dispatch(clearAll());    
  };
};

