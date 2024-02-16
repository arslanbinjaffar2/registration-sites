import { createSlice } from "@reduxjs/toolkit";
import { incrementFetchLoadCount } from "./GlobalSlice";
const initialState = {
  floorPlanDetails: [], 
  labels: null,
  loading: false,
  error: null,
};

export const floorPlanDetailSlice = createSlice({
  name: "floorPlanDetail",
  initialState,
  reducers: {
    getFloorPlanDetails: (state, {payload}) => {
      state.loading = true;
    },
    setFloorPlanDetail: (state, { payload }) => {
      state.floorPlanDetails = payload.data.details;
      state.labels = payload.labels;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearAll:(state, {payload})=>{
      state.floorPlanDetails = [];
      state.labels = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getFloorPlanDetails, setFloorPlanDetail, setError, clearAll } = floorPlanDetailSlice.actions;

export const floorPlanDetailSelector = (state) => state.floorPlanDetail;

export default floorPlanDetailSlice.reducer;

export const fetchFloorPlanDetails = (url,id) => {
  return async (dispatch) => {
    dispatch(getFloorPlanDetails());    
    try {
      const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/floor-plans/${id}`);
      const res = await response.json();
      dispatch(setFloorPlanDetail(res));
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

