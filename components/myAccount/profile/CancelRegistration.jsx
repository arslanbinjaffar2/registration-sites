import React, { useEffect, useMemo, useState } from 'react';
import ActiveLink from "components/atoms/ActiveLink";
import { fetchProfileData, profileSelector, fetchInvoiceData, cancelRegistrationRequest } from 'store/Slices/myAccount/profileSlice';
import { userSelector } from 'store/Slices/myAccount/userSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from 'components/ui-components/PageLoader';
import moment from 'moment';
import Image from 'next/image'
import { useRouter } from 'next/router';


const CancelRegistration = () => {
  const { event } = useSelector(eventSelector);
  const { loggedout } = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const cancellationDatePassed = useMemo(()=>{
    if(event.eventsiteSettings.cancellation_date === "0000-00-00 00:00:00"){
      return 0;
    }
    let dateToday = moment();
    let cancelationEndDate = moment(`${moment(event.eventsiteSettings.cancellation_date).format("YYYY-MM-DD")} ${event.eventsiteSettings.cancellation_end_time}`);
    let passed = cancelationEndDate.diff(dateToday);
    return passed > 0 ? 0 : 1;
  },[event]);

  if(cancellationDatePassed !== 0){
    router.push(`/${event.url}`);
  }

  const cancel = async () => {
    setCancelling(true);
   dispatch(cancelRegistrationRequest(event.id, event.url, {comment:comment})) 
  }

  if(loggedout){
     router.push(`/${event.url}`);
   }

  return (
    <React.Fragment>
     {(cancellationDatePassed !== undefined && cancellationDatePassed === 0) ? <div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner container">
          <div className="ebs-header text-center">
            <h2>Are you sure you want to cancel</h2>
          </div>
            <div className="generic-form">
              <p>Your comment:</p>
              <textarea
                placeholder="Your comment"
                cols={30}
                rows={5}
                value={comment}
                onChange={(e)=> setComment(e.currentTarget.value)}
              ></textarea>
            </div>
          <button className="btn btn-save-next btn-loader btn-danger" onClick={()=>{ cancel() }} > {cancelling ? "Cancelling..." : "Confirm cancelling registration"} </button>

        </div>
      </div> : <PageLoader/>}
    </React.Fragment>
  )
}

export default CancelRegistration;