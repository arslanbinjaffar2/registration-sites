import React, { useEffect } from 'react';
import { profileSelector, fetchInvoiceData } from 'store/Slices/myAccount/profileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";

const MyBilling = () => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoiceData(event.id, event.url));
  }, []);

  const { invoice, order_id } = useSelector(profileSelector);

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header text-center">
          <h2>My registration invoice</h2>
        </div>
        {invoice && (
          <>
            <div className="bottom-button">
              <ActiveLink href={`/${event.url}/profile/update-billing/${order_id}`}>
                <button
                  className="btn btn-save-next btn-loader"
                >
                  {event.labels.EVENTSITE_BILLING_EDIT_LABEL !== undefined ? event.labels.EVENTSITE_BILLING_EDIT_LABEL : 'Edit'}
                </button>
              </ActiveLink>
            </div>
            <div dangerouslySetInnerHTML={{ __html: invoice }}>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyBilling;