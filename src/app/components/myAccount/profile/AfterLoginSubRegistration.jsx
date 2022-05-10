import React, {useEffect, useState} from 'react'
import SubRegForm from './SubRegForm';
import {
    fetchSubRegistrationData,
    subRegistrationSelector,
    updateSubRegistrationData,
  } from "store/Slices/myAccount/subRegistrationSlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
const AfterLoginSubRegistration = () => {
    const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchSubRegistrationData(event.id, event.url));
    }, []);
    const { subRegistration } = useSelector(subRegistrationSelector);
    return (
        <div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner">
          <div className="ebs-header">
            <h2>My Subscriptions</h2>
          </div>
          <div className="wrapper-inner-content network-category-sec">
                {subRegistration && <SubRegForm subRegistration={subRegistration} event={event} afterLogin={true} />}
          </div>
        </div>
      </div>
  )
}

export default AfterLoginSubRegistration