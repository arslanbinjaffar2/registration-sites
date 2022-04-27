import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  subRegistration: null,
  loading:false,
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
    setError: (state, { payload }) => {
      state.error = payload
    },
    setAlert: (state, { payload }) => {
      state.alert = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getSubRegistrationData, setSubRegistrationData, setError, setAlert } = eventSlice.actions

export const subRegistrationSelector = state => state.subRegistration

export default eventSlice.reducer

export const fetchSubRegistrationData = (url) => {
    return async dispatch => {
      dispatch(getNewsletterData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/sub-registration/45756`)
        const res = await response.json()
        dispatch(setNewsletterData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateSubRegistrationData = ({url, data}) => {
    return async dispatch => {
      dispatch(getNewsletterData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/update-sub-registration/45756`, data)
        const res = await response.json()
        dispatch(setAlert(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }