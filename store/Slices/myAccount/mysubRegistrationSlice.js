import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { header } from 'helpers/header'
const initialState = {
  subRegistration: null,
  loading:false,
  updating:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'subRegistration',
  initialState,
  reducers: {
    getSubRegistrationData : (state) => {
      state.loading = true
    },
    setSubRegistrationData: (state, { payload}) => {
        state.subRegistration = payload,
        state.loading = false
    },
    setUpdating: (state, { payload }) => {
      state.updating = payload
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    setAlert: (state, { payload }) => {
      state.alert = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getSubRegistrationData, setSubRegistrationData, setError, setAlert, setUpdating } = eventSlice.actions

export const subRegistrationSelector = state => state.subRegistration

export default eventSlice.reducer

export const fetchSubRegistrationData = (id,url) => {
    return async dispatch => {
      dispatch(getSubRegistrationData())
      try {
        const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/my-sub-registration`, { headers:header("GET", id)})
        const res = await response.json()
        dispatch(setSubRegistrationData(res.data))
      } catch (error) {
        dispatch(setError("Couldn't fetch Subregistration"));
      }
    }
  }
export const updateSubRegistrationData = (id, url, data) => {
    return async dispatch => {
      dispatch(setUpdating(true));
      try {
        const response = await axios.post(`${process.env.NEXT_APP_URL}/event/${url}/save-sub-registration`, { headers:header("POST", id)})
        dispatch(setAlert("Answers Successfully Updated"))
        dispatch(setUpdating(false));
      } catch (error) {
        dispatch(setUpdating(false));
        dispatch(setError("Couldn't Update Subregistration"));
      }
    }
  }