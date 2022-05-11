import React, { useState, useEffect } from "react";
import AlertMessage from "./AlertMessage";
const ChooseProvider = ({
  onCancel,
  getAttendee,
  verification,
  authenticationId,
  attendee,
  event,
  error
}) => {
  const [provider, setProvider] = useState("email");
  useEffect(() => {
    getAttendee(authenticationId);
  }, []);

  return (
    <div className="ebs-login-wrapp-inner">
      <span onClick={() => onCancel()} className="btn-inner-close">
        <img src={require("img/remove-icon-x2.png")} alt="" />
      </span>
      <h2 className="ebs-login-title">Choose Provider</h2>
      <p className="ebs-login-desc">Send the authentication code to</p>
      {error && <AlertMessage message={error}/>}
      {attendee && (
        <React.Fragment>
          <div className="ebs-form-accept">
            <label className="ebs-label-accept">
              <input
                type="checkbox"
                name="email"
                checked={provider === "email" ? true :false}
                onChange={(e) => {
                  setProvider(e.target.value);
                }}
              />
              <span className="ebs-accept-text">{attendee.email}</span>
            </label>
          </div>
          <div className="ebs-form-accept">
            <label className="ebs-label-accept">
              <input
                type="checkbox"
                name="phone"
                checked={provider === "phone" ? true: false}
                onChange={(e) => {
                  setProvider(e.target.value);
                }}
              />
              <span className="ebs-accept-text">{attendee.phone}</span>
            </label>
          </div>
        </React.Fragment>
      )}
      <div className="ebs-btn-wrapp">
        <button className="btn btn-default" type="submit" disabled={attendee ? false : true} onClick={()=>{verification(event.id, "choose-provider", provider, null, event.url, authenticationId)}}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChooseProvider;
