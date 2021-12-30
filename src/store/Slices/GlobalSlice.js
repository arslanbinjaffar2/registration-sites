import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banner: null,
  loading: false,
  error:null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
   getBanner : (state) => {
      state.loading = true
    },
   setBanner: (state, { payload}) => {
      state.banner = payload
      state.loading = false
    },
    setError: (state, { payload }) => {
      state.error = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getBanner, setBanner, setError } = globalSlice.actions

export const globalSelector = state => state.global

export default globalSlice.reducer

export const fetchBanner = (url) => {
    return async dispatch => {
      dispatch(getBanner())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/banner`)
        const res = await response.json()
  
        dispatch(setBanner(res.data))
      } catch (error) {
        dispatch(setError())
      }
    }
  }