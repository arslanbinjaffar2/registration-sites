import React, { useMemo } from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import { getWithExpiry } from "helpers/helper";
const EventDescription = ({event}) => {
    const regisrationUrl = useMemo(()=>{
        let url = '';
        if(parseFloat(event.registration_form_id) === 1){
            url = (event.paymentSettings && parseInt(event.paymentSettings.evensite_additional_attendee) === 1) ? `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee` : `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee/manage-attendee`;
        }else{
          url = `${process.env.NEXT_APP_EVENTCENTER_URL}/event/${event.url}/detail/${event.eventsiteSettings.payment_type === 0 ? 'free/' : ''}registration`;
        }
        let autoregister = getWithExpiry(`autoregister_${event.url}`);
        if(autoregister !== null){
            url = `${process.env.NEXT_APP_REGISTRATION_FLOW_URL}/${event.url}/attendee/autoregister/${autoregister}`;
        }
        return url;
      },[event]);
  return  event.description?.info.description && 
    <div className="ebs-default-padding module-section" >
        {event.description !== undefined && event.description.info !== undefined && event.description.info.ed_title !== undefined && event.description.info.ed_title !== "" && <HeadingElement dark={false} label={event.description.info.ed_title}  align={'left'} />}
        <div className="container" dangerouslySetInnerHTML={{__html: event.description.info.description}} />
        {(event.description && event.description.info.ed_show_register_now == 1) &&  <a style={{border: '2px solid #363636', color: '#363636'}} href={regisrationUrl} rel="noopener" className="edgtf-btn edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">{event.labels.EVENTSITE_REGISTER_NOW ? event.labels.EVENTSITE_REGISTER_NOW : 'Register Now'} </a>  }
    </div>
  ;
};

export default EventDescription;