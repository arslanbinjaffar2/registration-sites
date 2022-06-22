import * as React from 'react';
const CorporateLogin = () => {
    return (
      <div className="ebs-corporate-login">
        <div className="ebs-corporate-fields">
          <div className="ebs-event-logo">
            <img src="https://dev.eventbuizz.com/assets/event/branding/114603_image_1671841641642074350.png" alt="" />
          </div>
          <div className="ebs-event-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </div>
          <div className="ebs-input-field">
            <input type="text" placeholder=' '   />
            <label className="title">Email <em>*</em></label>
          </div>
          <div className="ebs-input-field">
            <input type="text" placeholder=' '  />
            <label className="title">Enter registration code</label>
          </div>
          <button className="btn btn-default">Access Site</button>
        </div>
      </div>
    );
  }


export default CorporateLogin;
