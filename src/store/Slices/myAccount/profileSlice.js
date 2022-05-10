import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  attendee: null,
  countries: null,
  eventLanguageDetails: null,
  callingCodes: null,
  eventFoodDisclaimers: null,
  attendeeFeildSettings: null,
  customFields: null,
  languages: null,
  loading:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileData : (state) => {
      state.loading = true
    },
    setProfileData: (state, { payload}) => {
        state.attendee= payload.attendee,
        state.countries= payload.countries,
        state.eventLanguageDetails= payload.eventLanguageDetails,
        state.callingCodes= payload.callingCodes,
        state.eventFoodDisclaimers= payload.eventFoodDisclaimers,
        state.attendeeFeildSettings= payload.attendeeFeildSettings,
        state.customFields= payload.customFields,
        state.languages= payload.languages,
        state.loading = false
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
    clearError: (state) => {
      state.error = null
    },
    setAlert: (state, { payload }) => {
      state.alert = payload
    },
    clearAlert: (state) => {
      state.alert = null
    },
    setLoading: (state) => {
      state.loading = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { getProfileData, setProfileData, setError, clearError, setAlert, clearAlert, setLoading } = eventSlice.actions

export const profileSelector = state => state.profile

export default eventSlice.reducer

export const fetchProfileData = (url) => {
    return async dispatch => {
      dispatch(getProfileData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/attendee/45756/profile`)
        const res = await response.json()
        dispatch(clearError())
        dispatch(setProfileData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateProfileData = (url, data) => {
    return async dispatch => {
      console.log(data)
      dispatch(getProfileData())
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/event/${url}/attendee/45756/profile/update`, data)
        if(response.data.status === 1){
          dispatch(setAlert(response.data.message))
          dispatch(setLoading())
            setTimeout(()=>{
              dispatch(clearAlert())
            }, 1000)
        }
        else{
          dispatch(setError(response.data.message))
          dispatch(setLoading())
            setTimeout(()=>{
              dispatch(clearError())
            }, 1000)
        }
      } catch (error) {
        dispatch(setError(error))
        dispatch(setLoading())
        setTimeout(()=>{
          dispatch(clearAlert())
        }, 1000)
      }
    }
  }