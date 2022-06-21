import React, {useEffect} from 'react'
import {
    fetchSurveyData,
    surveySelector
  } from "store/Slices/myAccount/surveySlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
import SurveyForm from './SurveyForm';
import PageLoader from '@/ui-components/PageLoader';
const surveyDetail = ({match}) => {
  console.log(match.params.survey_id);
  const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchSurveyData(event.id, event.url, match.params.survey_id));
    }, []);
    const { surveyDetail, surveyResult } = useSelector(surveySelector);
    return (
      surveyDetail ? <div className="edgtf-container ebs-my-profile-area pb-5">
    <div className="edgtf-container-inner container">
      <div className="ebs-header">
        <h2>Surveys</h2>
      </div>
      <div className="wrapper-inner-content network-category-sec">
      <SurveyForm surveyDetail={surveyDetail} event={event} surveyResults={surveyResult} survey_id={match.params.survey_id} />
      </div>
    </div>
  </div> : <PageLoader/>
  )
}

export default surveyDetail