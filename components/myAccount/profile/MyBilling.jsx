import React, { useEffect } from 'react';
import ActiveLink from "components/atoms/ActiveLink";
import { fetchProfileData, profileSelector, fetchInvoiceData } from 'store/Slices/myAccount/profileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from 'components/ui-components/PageLoader';
import moment from 'moment';
import Image from 'next/image'


const MyBilling = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoiceData(event.id, event.url));
  }, []);

  const { invoice } = useSelector(profileSelector);

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header text-center">
          <h2>My registration invoice</h2>
        </div>
        {invoice && <div dangerouslySetInnerHTML={{__html: invoice}}>
        </div>}
      </div>
    </div>
  )
}

export default MyBilling;