import { createSlice } from '@reduxjs/toolkit'
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
  },
})

// Action creators are generated for each case reducer function
export const { getProfileData, setProfileData, setError } = eventSlice.actions

export const profileSelector = state => state.profile

export default eventSlice.reducer

export const fetchProfileData = (url) => {
    return async dispatch => {
      dispatch(getProfileData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/attendee/45756/profile`)
        const res = await response.json()
        dispatch(setProfileData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }