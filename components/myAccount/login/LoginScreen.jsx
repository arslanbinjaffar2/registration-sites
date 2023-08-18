import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLogin
} from "store/Slices/GlobalSlice";
import {
  eventSelector
} from "store/Slices/EventSlice";
import {
  logUserIn,
  resetPasswordRequest,
  resetPassword,
  getAttendeeData,
  verify,
  reset,
  userSelector
} from "store/Slices/myAccount/userSlice";
import RequestResetPassword from "./RequestResetPassword";
import Verification from "./Verification";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import ChooseProvider from "./ChooseProvider";
import { useRouter } from 'next/router';

const LoginScreen = (props) => {

  const dispatch = useDispatch();

  const { event } = useSelector(eventSelector);

  const { userData, loading, authenticationId, redirect, attendee, ms, email, provider, error } = useSelector(userSelector);

  const [step, setStep] = useState("login");

  const router = useRouter();

  useEffect(() => {
    if (authenticationId !== null && redirect === "choose-provider") {
      setStep("chooseProvider");
    }
    else if (userData !== null && redirect === "dashboard") {
      if(event.eventsiteSettings.attendee_my_profile === 1){
        router.push(`/${event.url}/profile`);
      } 
      else if(event.eventsiteSettings.attendee_my_billing_history === 1){
        router.push(`/${event.url}/profile/my-billing`);
      }
      else if(event.eventsiteSettings.attendee_my_sub_registration === 1){
        router.push(`/${event.url}/profile/my-sub-registration`);
      }
      else if(event.eventsiteSettings.attendee_my_program === 1) {
        router.push(`/${event.url}/profile/my-program`);
      }
      else if(event.eventsiteSettings.show_survey === 1){
        router.push(`/${event.url}/profile/surveys`);
      }
      else if(event.eventsiteSettings.network_interest === 1){
        router.push(`/${event.url}/profile/keyword-interest`);
      }
      else if (event.eventsiteSettings.show_subscriber === 1){
        router.push(`/${event.url}/profile/news-letter-subscription`);
      }
      else {
        router.push(`/${event.url}`);
      }
      onCancel();
    }
    else if (authenticationId !== null && redirect === "verification") {
      setStep("verification");
    }
    else if (authenticationId !== null && redirect === "login") {
      setStep("login");
    }
    else if (authenticationId !== null && redirect === "reset-password") {
      setStep("resetPassord");
    }
  }, [redirect])

  const onCancel = () => {
    dispatch(setShowLogin(false));
    dispatch(reset());
  }
  const onSubmit = (formData) => {
    dispatch(logUserIn(event.id, event.url, formData));
  }
  const submitResetPasswordRequest = (formData) => {
    dispatch(resetPasswordRequest(event.id, event.url, formData));
  }

  const getAttendee = (formData) => {
    dispatch(getAttendeeData(event.id, event.url, formData));
  }
  const verification = (eventId, screen, provider, code, url, authentication_id) => {
    dispatch(verify(eventId, screen, provider, code, url, authentication_id));
  }
  const resetPword = (formData) => {
    dispatch(resetPassword(event.id, event.url, formData));
  }

  return (
    <div className="ebs-login-screen">
      <div className="ebs-login-wrapp">
        {step === "login" && <Login setStep={setStep} onCancel={onCancel} onformSubmit={onSubmit} event={event} error={error} loading={loading} />}
        {step === "requestResetPassword" &&
          <RequestResetPassword setStep={setStep} onCancel={onCancel} onformSubmit={submitResetPasswordRequest} error={error} loading={loading} />}
        {step === "chooseProvider" &&
          <ChooseProvider onCancel={onCancel} provider={provider} authenticationId={authenticationId} getAttendee={getAttendee} attendee={attendee} verification={verification} event={event} error={error} loading={loading} />}
        {step === "verification" &&
          <Verification setStep={setStep} onCancel={onCancel} ms={ms} verification={verification} authenticationId={authenticationId} provider={provider} event={event} error={error} loading={loading} />}
        {step === "resetPassord" &&
          <ResetPassword onCancel={onCancel} email={email} onformSubmit={resetPword} loading={loading} />}
      </div>
    </div>
  )
}

export default LoginScreen
