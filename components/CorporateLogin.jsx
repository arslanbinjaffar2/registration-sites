import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postCorporateLogin
} from "store/Slices/GlobalSlice";
import {
  eventSelector
} from "store/Slices/EventSlice";
import { useRouter } from 'next/router';
import ActiveLink from "./atoms/ActiveLink";

const CorporateLogin = () => {
    const dispatch = useDispatch();
    const {event} = useSelector(eventSelector);
    const [email, setEmail] = useState('');
    const [registrationCode, setRegistrationCode] = useState('');
    const router = useRouter();
    const handleSubmit = (e) =>{
      if(registrationCode === event.eventsiteSettings.registration_code){
        dispatch(postCorporateLogin());
        localStorage.setItem(`event${event.id}UserCorporateLogin`, JSON.stringify(true));
        router.push(`/${event.url}`);
      }
    }
    return (
      <div className="ebs-corporate-login">
        <div className="ebs-corporate-fields">
          <div className="ebs-event-logo">
              <ActiveLink target={event.eventsiteSettings?.third_party_redirect === 0 ? `_self` : '_blank'} href={event.eventsiteSettings?.third_party_redirect === 0 ? `/${event.url}` : event.eventsiteSettings.third_party_redirect_url}>
                  {event.settings.header_logo ? (
                      <img
                          src={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`}
                          alt=""
                      />
                  ) : (
                      <img
                          src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`}
                          alt=""
                      />
                  )}

              </ActiveLink>
          </div>
          {/*<div className="ebs-event-description">*/}
          {/*    {event?.description?.info?.description}*/}
          {/*</div>*/}
          <form onSubmit={(e)=>{ e.preventDefault(); handleSubmit();}}>
          <div className="ebs-input-field">
            <input type="email" placeholder=' ' value={email} required onChange={(e)=>{setEmail(e.currentTarget.value)}} />
            <label className="title">Email <em>*</em></label>
          </div>
          <div className="ebs-input-field">
            <input type="text" placeholder=' ' value={registrationCode} required onChange={(e)=>{setRegistrationCode(e.currentTarget.value)}} />
            <label className="title">Enter registration code</label>
          </div>
          <button className="btn btn-default">{event?.labels?.EVENTSITE_REGISTRATION_SUBMIT}</button>
          </form>
        </div>
      </div>
    );
  }


export default CorporateLogin;
