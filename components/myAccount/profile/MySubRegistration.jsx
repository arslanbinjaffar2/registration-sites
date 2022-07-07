import React, {useEffect, useState} from 'react'
import SubRegForm from './SubRegForm';
import {
    fetchSubRegistrationData,
    subRegistrationSelector,
    updateSubRegistrationData,
  } from "store/Slices/myAccount/mysubRegistrationSlice";
  import { eventSelector } from "store/Slices/EventSlice";
  import { useSelector, useDispatch } from "react-redux";
import PageLoader from 'components/ui-components/PageLoader';
const MySubRegistration = () => {
    const { event } = useSelector(eventSelector);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchSubRegistrationData(event.id, event.url));
    }, []);
    const { subRegistration, loading, updating, alert, error, } = useSelector(subRegistrationSelector);

    return (
      subRegistration !== null && !loading ?(<div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner container">
          <div className="ebs-header">
            <h2>My subregistration</h2>
          </div>
          <div className="wrapper-inner-content network-category-sec">
                <SubRegForm subRegistration={subRegistration} event={event} updating={updating} alert={alert} error={error} />
          </div>
        </div>
      </div>) : <PageLoader/>
  )
}

export default MySubRegistration