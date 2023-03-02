import React, { useEffect } from 'react';
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

  const cancel = async () => {
   dispatch(cancelRegistrationRequest(event.id, event.url)) 
  }

  if(loggedout){
     router.push(`/${event.url}`);
   }

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
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
              
            ></textarea>
          </div>
        <button className="btn btn-save-next btn-loader btn-danger" onClick={()=>{ cancel() }} > Confirm cancelling registration </button>

      </div>
    </div>
  )
}

export default CancelRegistration;