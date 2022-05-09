import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  surveyDetail: null,
  surveyResult: null,
  loading:false,
  error:null,
  alert:null,
}

export const eventSlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    getSurveyData : (state) => {
      state.loading = true
    },
    setSurveyData: (state, { payload}) => {
        state.surveyDetail = payload.survey_details,
        state.surveyResult = payload.survey_result,
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
export const { getSurveyData, setSurveyData, setError, setAlert } = eventSlice.actions

export const surveySelector = state => state.survey

export default eventSlice.reducer

export const fetchSurveyData = (url,survey_id) => {
    return async dispatch => {
      dispatch(getSurveyData())
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/event/${url}/survey-detail/${survey_id}/45756`)
        const res = await response.json()
        dispatch(setSurveyData(res.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }
export const updateSurveyData = (url, survey_id, data) => {
    return async dispatch => {
      dispatch(getSurveyData())
      try {
        const response =  await axios.post(`${process.env.REACT_APP_URL}/event/${url}/save-survey/${survey_id}/45756`, data)
        dispatch(setAlert(response.data))
      } catch (error) {
        dispatch(setError(error))
      }
    }
  }