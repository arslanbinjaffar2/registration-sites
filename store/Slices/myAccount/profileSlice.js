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
  settings: null,
  labels: null,
  languages: null,
  loading: false,
  error: null,
  redirect: null,
  alert: null,
  invoice: null,
  order_id: null,
  is_invoice_update: null,
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
        state.settings = payload.settings,
        state.labels = payload.labels,
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
    setRedirect: (state, { payload }) => {
      state.redirect = payload
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
      state.is_invoice_update = payload.is_invoice_update
    },
  },
})

// Action creators are generated for each case reducer function
export const { getProfileData, setProfileData, setError, clearError, setAlert, clearAlert, setLoading, setInvoice, setRedirect } = eventSlice.actions

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
      const formData = new FormData();
      formData.append('attendeeObj', JSON.stringify(data.attendeeObj));
      formData.append('infoObj', JSON.stringify(data.infoObj));
      formData.append('settings', JSON.stringify(data.settings));
      formData.append('file', data.attendeeObj.file);
      const response = await axios.post(`${process.env.NEXT_APP_URL}/event/${url}/attendee/profile/update`, formData, { headers: header("UPLOAD", id) })
      if (response?.data?.data?.status) {
        dispatch(setAlert(response.data.message))
        dispatch(setLoading())
        setTimeout(() => {
          dispatch(clearAlert())
          dispatch(setRedirect(`/${url}/profile`))
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

export const cleanRedirect = (url) => {
  return async dispatch => {
    dispatch(setRedirect(url))
  }
}