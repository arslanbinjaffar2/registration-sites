import Head from 'next/head'
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { eventSelector } from "store/Slices/EventSlice";
import MasterLayoutRoute from "components/layout/MasterLayoutRoute";
import { metaInfo } from 'helpers/helper';
import MetaInfo from "components/layout/MetaInfo";
import PageLoader from "components/ui-components/PageLoader";
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import axios from "axios";
import Spinner from 'components/ui-components/Spinner';

const Index = (props) => {
    const { event } = useSelector(eventSelector);
    const router = useRouter();
    const { id, event_id, email, confirm, already_done } = router.query;
    const [confirming, setConfirming] = useState(false);

    const onConfirm = async () => {
        setConfirming(true);
        const response = await axios.post(
          `${process.env.NEXT_APP_URL}/event/${event.url}/unsubscribe-attendee`,
          { id, event_id, email, confirm: 1 }
        );
        console.log(response);
        if(response.data.success){
            router.push(
              `/${event.url}`
            );
        
        }
    }

    const onCancel = () => {
        router.push(`/${event.url}`);
    }
    
  return (
        <>
            <MetaInfo metaInfo={props.metaInfo} cookie={props.cookie} />
            {event ? (
                <MasterLayoutRoute event={event}>
                    <div style={{height:"90vh"}}>
                        <div className="not-attending-popup">
                            {(confirm === undefined) && <div className="ebs-not-attending-fields">
                                <div className="ebs-not-attending-heading">
                                    {event.labels.EVENTSITE_BILLING_CONFIRMATION !== undefined ? event.labels.EVENTSITE_BILLING_CONFIRMATION : "Confirmation" }
                                </div>
                                <div className="ebs-event-description">
                                    {event.labels.EVENTSITE_ATTENDEE_NOT_ATTENDING_CONFIRMATION_MSG !== undefined ? event.labels.EVENTSITE_ATTENDEE_NOT_ATTENDING_CONFIRMATION_MSG : "Are you sure you want cancel coming to the event." }
                                </div>
                                <div className='btn-container' >
                                    <button disabled={confirming} className="spinner-btn btn btn-default" onClick={(e)=> {onConfirm();}}>
                                        {event.labels.EVENTSITE_NOT_ATTENDING_CONFIRM_BTN !== undefined ? event.labels.EVENTSITE_NOT_ATTENDING_CONFIRM_BTN : "Confirm" }
                                        {confirming && <Spinner/>}
                                    </button>
                                    <button className="btn btn-default" onClick={(e)=> {onCancel();}}>
                                        {event.labels.GENERAL_CANCEL !== undefined ? event.labels.GENERAL_CANCEL : "Cancel" }
                                    </button>
                                </div>
                            </div>}
                            {
                                (confirm !== undefined && confirm == 1) && <div className="alert alert-success text-center" style={{minWidth:"500px"}}>
                                   {(already_done !== undefined && already_done == 1) ? <div className=" success-message">
                                        {event.labels.EVENTSITE_UNSUBSCRIBE_THANK_AGAIN !== undefined ? event.labels.EVENTSITE_UNSUBSCRIBE_THANK_AGAIN : "You have already given you feedback" }
                                    </div> :  <div className=" success-message">
                                        {event.labels.EVENTSITE_UNSUBSCRIBE_THANK !== undefined ? event.labels.EVENTSITE_UNSUBSCRIBE_THANK : "Are you sure you want cancel coming to the event." }
                                    </div> 
                                    }
                            </div>
                            }
                        </div>
                    </div>
                </MasterLayoutRoute>
            ) : (
                <PageLoader />
            )}
        </>
  )
}

export async function getServerSideProps(context) {
    const {req, res} = context;
    const eventData = await metaInfo(`${process.env.NEXT_APP_URL}/event/${context.query.event}/meta-info`, '');
    const serverCookie = getCookie(`cookie__${context.query.event}`, { req, res });
    if(serverCookie === null || serverCookie === undefined){
        setCookie(`cookie__${context.query.event}`, 'necessary', { req, res, maxAge: 30*24*60*60 })
    }
    
    return {
        props: {
            metaInfo: eventData,
            cookie : (serverCookie !== null && serverCookie !== undefined) ? serverCookie : 'necessary',
            url: context.resolvedUrl
        },
    }
}

export default Index