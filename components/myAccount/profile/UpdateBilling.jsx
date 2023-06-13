import React, { useRef, useState } from 'react';
import { profileSelector, fetchInvoiceData } from 'store/Slices/myAccount/profileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";

const UpdateBilling = (props) => {

    const { event } = useSelector(eventSelector);

    const [height, setHeight] = useState(0);

    const iframe = useRef();

    return (
        <div className="edgtf-container ebs-my-profile-area pb-5">
            <div className="edgtf-container-inner container" id="registration-site">
                {props.id && (
                    <>
                        <iframe
                            ref={iframe}
                            onLoad={() => {
                                setHeight(iframe.current.contentWindow.window.top.document.body.scrollHeight - window.innerHeight > 400 ? iframe.current.contentWindow.window.top.document.body.scrollHeight : window.innerHeight);
                            }}
                            width="100%"
                            height={height > 0 ? height : 400}
                            title="test"
                            itemProp="description"
                            className="edgtf-post-excerpt"
                            src={`${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/admin/order-summary/${props.id}`}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default UpdateBilling;