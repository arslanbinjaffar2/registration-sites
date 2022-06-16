import React, {useEffect, useState} from 'react'
import SubRegForm from './SubRegForm';
import {
    fetchSubRegistrationData,
    subRegistrationSelector,
    updateSubRegistrationData,
  } from "store/Slices/myAccount/subRegistrationSlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
const AfterLoginSubRegistration = ({history}) => {
    const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    const { subRegistration, skip } = useSelector(subRegistrationSelector);
    useEffect(() => {
      if(skip){
        history.push(`/${event.url}/profile`);
      }
      dispatch(fetchSubRegistrationData(event.id, event.url));
    }, [skip]);



    return (
        <div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner container">
          <div className="ebs-header">
            <h2>SubRegistration</h2>
          </div>
          <div className="wrapper-inner-content network-category-sec">
                {subRegistration && <SubRegForm subRegistration={subRegistration} event={event} afterLogin={true} />}
          </div>
        </div>
      </div>
  )
}

export default withRouter(AfterLoginSubRegistration)