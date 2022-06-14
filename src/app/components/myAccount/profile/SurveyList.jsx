import React, { useEffect } from "react";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSurveyListData,
  surveyListSelector,
} from "store/Slices/myAccount/surveyListSlice";
const SurveyList = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSurveyListData(event.id, event.url));
  }, []);
  const { surveyList } = useSelector(surveyListSelector);

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header">
          <h2>Surveys</h2>
        </div>
        <div className="wrapper-inner-content network-category-sec">
          <div className="ebs-survey-heading d-flex">
            <h4>Available Surveys</h4>
            <a className="btn-view-result" href="#!">View results</a>
          </div>
          {surveyList && (
            <div className="ebs-survey-list">
              <ul>
                {surveyList.map((survey) => (
                  <li key={survey.id}> <Link to={`/${event.url}/survey/${survey.id}`} >{survey.info[0].value}</Link> </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
