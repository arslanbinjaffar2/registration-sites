import React, {useEffect} from 'react'
import {
    fetchSurveyData,
    surveySelector
  } from "store/Slices/myAccount/surveySlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
import SurveyForm from './SurveyForm';
const surveyDetail = ({match}) => {
  console.log(match.params.survey_id);
  const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchSurveyData(event.url, match.params.survey_id));
    }, []);
    const { surveyDetail, surveyResult } = useSelector(surveySelector);
    return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
    <div className="edgtf-container-inner">
      <div className="ebs-header">
        <h2>Surveys</h2>
      </div>
      <div className="wrapper-inner-content network-category-sec">
      {surveyDetail && <SurveyForm surveyDetail={surveyDetail} eventUrl={event.url} surveyResults={surveyResult} survey_id={match.params.survey_id} />}
      </div>
    </div>
  </div>
  )
}

export default surveyDetail