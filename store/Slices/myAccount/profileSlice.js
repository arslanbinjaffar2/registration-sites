import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { header } from 'helpers/header'
import { logOut, userSelector, reset, setEnableCancel } from "store/Slices/myAccount/userSlice";
const initialState = {
  attendee: null,
  countries: null,
  eventLanguageDetails: null,
  callingCodes: null,
  eventFoodDisclaimers: null,
  attendeeFeildSettings: null,
  customFields: null,
  languages: null,
  loading: false,
  error: null,
  alert: null,
  invoice: null,
  order_id: null,
}

export const eventSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileData: (state) => {
      state.loading = true
    },
    setProfileData: (state, { payload }) => {
      state.attendee = payload.attendee,
        state.countries = payload.countries,
        state.eventLanguageDetails = payload.eventLanguageDetails,
        state.callingCodes = payload.callingCodes,
        state.eventFoodDisclaimers = payload.eventFoodDisclaimers,
        state.attendeeFeildSettings = payload.attendeeFeildSettings,
        state.customFields = payload.customFields,
        state.languages = payload.languages,
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
    setInvoice: (state, { payload }) => {
      state.invoice = payload.invoice
      state.order_id = payload.order_id
    },
  },
})

// Action creators are generated for each case reducer function
export const { getProfileData, setProfileData, setError, clearError, setAlert, clearAlert, setLoading, setInvoice } = eventSlice.actions

export const profileSelector = state => state.profile

export default eventSlice.reducer

export const fetchProfileData = (id, url) => {
  return async dispatch => {
    dispatch(getProfileData())
    let userObj = JSON.parse(localStorage.getItem(`event${id}User`));
    try {
      const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/attendee/profile`, { headers: header("GET", id) })
      const res = await response.json()
      dispatch(clearError())
      dispatch(setProfileData(res.data))
      localStorage.setItem(`EI${url}EC`, res.data.enable_cancel == true ? true : false);
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

export const updateProfileData = (id, url, data) => {
  return async dispatch => {
    dispatch(getProfileData())
    try {
      const response = await axios.post(`${process.env.NEXT_APP_URL}/event/${url}/attendee/profile/update`, data, { headers: header("POST", id) })
      if (response.data.status === 1) {
        dispatch(setAlert(response.data.message))
        dispatch(setLoading())
        setTimeout(() => {
          dispatch(clearAlert())
        }, 1000)
      }
      else {
        dispatch(setError(response.data.message))
        dispatch(setLoading())
        setTimeout(() => {
          dispatch(clearError())
        }, 1000)
      }
    } catch (error) {
      dispatch(setError(error))
      dispatch(setLoading())
      setTimeout(() => {
        dispatch(clearAlert())
      }, 1000)
    }
  }
}

export const fetchInvoiceData = (id, url) => {
  return async dispatch => {
    dispatch(getProfileData())
    try {
      const response = await fetch(`${process.env.NEXT_APP_URL}/event/${url}/getInvoice`, { headers: header("GET", id) })
      const res = await response.json()
      dispatch(clearError())
      console.log(res.data);
      dispatch(setInvoice(res.data))
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

export const cancelRegistrationRequest = (id, url, data) => {
  return async dispatch => {
    dispatch(getProfileData())
    try {
      const response = await axios.post(`${process.env.NEXT_APP_URL}/event/${url}/cancel-registration`, data, { headers: header("POST", id) })
      if (response.data.success) {
        dispatch(clearError());
        dispatch(logOut(id, url));
      } else {
        dispatch(setError(res.message))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}