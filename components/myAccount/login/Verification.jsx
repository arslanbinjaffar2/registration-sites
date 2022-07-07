import React, { useState } from "react";
import Countdown from "react-countdown";
import ReactCodeInput from 'react-verification-code-input';
import AlertMessage from "./AlertMessage";
import Image from 'next/image'

const Verification = ({ onCancel, setStep, ms, verification, event, authenticationId, provider, error, loading }) => {
  const [code, setCode] = useState()
  return (
    <div className="ebs-login-wrapp-inner">
      <span onClick={() => onCancel()} className="btn-inner-close">
        <Image objectFit='contain' layout="fill" src={require("public/img/remove-icon-x2.png")} alt="" />
      </span>
      <h2 className="ebs-login-title">Verification</h2>
      <p className="ebs-login-desc">
        Enter the code you will receive a code to reset the password , if you
        don’t get and any code click on resend code again.
      </p>
      {error && <AlertMessage message={error} />}
      <div className="ebs-login-from">
        <label className="ebs-label-input">
          <span className="ebs-label-title">Enter code</span>
          {/* <div className="ebs-verfication-code">
            <input className="ebs-input" type="text" autoComplete="false" />
            <input className="ebs-input" type="text" autoComplete="false" />
            <input className="ebs-input" type="text" autoComplete="false" />
            <input className="ebs-input" type="text" autoComplete="false" />
            <input className="ebs-input" type="text" autoComplete="false" />
            <input className="ebs-input" type="text" autoComplete="false" />
          </div> */}
          <ReactCodeInput className="ebs-verfication-code" type='number' fields={6} onChange={(code) => { setCode(code) }} fieldHeight={50} />
        </label>
        <div style={{ padding: 5 }} className="ebs-label-input">
          <span className="ebs-label-title">Code will expire after</span>
          <div className="ebs-verfication-timer">
            {ms && <Countdown
              date={Date.now() + Number(ms)}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <span>
                      Code Expired...
                    </span>
                  );
                } else {
                  return (
                    <strong>
                      {minutes} : {seconds}
                    </strong>
                  );
                }
              }}
            />}
          </div>
        </div>
        <div
          style={{ paddingTop: 10, paddingBottom: 20 }}
          className="ebs-btn-wrapp"
        >
          <div onClick={() => { verification(event.id, "choose-provider", provider, null, event.url, authenticationId) }} style={{ paddingBottom: 10 }} className="ebs-forgot-password">
            <span >Resend code again</span>
          </div>
          <button disabled={(code && code.length === 6 && !loading) ? false : true} onClick={() => verification(event.id, "verification", provider, code, event.url, authenticationId)} className="btn btn-default">
            {loading ? "Loading..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
