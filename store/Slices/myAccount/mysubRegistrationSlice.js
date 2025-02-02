import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { header } from 'helpers/header'
const initialState = {
  subRegistration: null,
  loading:false,
  updating:false,
  error:null,
  alert:null,
  limitErrors:[],
}

export const eventSlice = createSlice({
  name: 'mySubRegistration',
  initialState,
  reducers: {
    getSubRegistrationData : (state) => {
      state.loading = true,
      state.subRegistration = null
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
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setLimitErrors: (state, { payload }) => {
      if(payload == undefined || payload == null){
        state.limitErrors = []
      }else{
        state.limitErrors = payload
      }
      console.log('limitErrors: ',state.limitErrors);
    },
  },
})

// Action creators are generated for each case reducer function
export const { getSubRegistrationData, setSubRegistrationData, setError, setAlert, setUpdating, setLoading,setLimitErrors } = eventSlice.actions

export const mySubRegistrationSelector = state => state.mySubRegistration

export default eventSlice.reducer

export const fetchSubRegistrationData = (id,url) => {
    return async dispatch => {
      dispatch(getSubRegistrationData())
      try {
        const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/my-sub-registration`, { headers:header("GET", id)})
        const res = await response.json()
        if(res.data !== 'null' && res.data.questions !== "" && (res.data.answered !== 0 || res.data.settings.answer === 1)){
          dispatch(setSubRegistrationData(res.data))
        }
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError("Couldn't fetch Subregistration"));
      }
    }
  }
  
export const updateSubRegistrationData = (id, url, data) => {
    return async dispatch => {
      dispatch(setUpdating(true));
      dispatch(setAlert(null));
      dispatch(setError(null));
      dispatch(setLimitErrors(null));
      try {
        const response = await axios.post(`${process.env.NEXT_APP_URL}/event/${url}/save-sub-registration`, data,{ headers:header("POST", id)})
        console.log(response);
        if(response.data.data.status){
          dispatch(setAlert(response.data.data.message))
        }else{
          if(response.data.data.limit_errors){
            dispatch(setLimitErrors(response.data.data.limit_errors));
            dispatch(setError("Couldn't Update Subregistration"));
          }else{
            dispatch(setError(response.data.data.message));
          }
        }
        dispatch(setUpdating(false));
      } catch (error) {
        dispatch(setUpdating(false));
        dispatch(setError("Couldn't Update Subregistration"));
      }
    }
  }