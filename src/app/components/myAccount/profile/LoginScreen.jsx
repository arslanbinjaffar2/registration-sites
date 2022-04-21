import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LoginScreen extends React.Component {
  state = {
   step: 1
  }
  render() {
    const {step} = this.state;
    return (
      <div className="ebs-login-screen">
        <div className="ebs-login-wrapp">
          {step === 1 && <div className="ebs-login-wrapp-inner">
            <span onClick={() => this.props.onClick()} className="btn-inner-close">
              <img src={require('img/remove-icon-x2.png')} alt="" />
            </span>
            <h2 className="ebs-login-title">Login</h2>
            <p className="ebs-login-desc">enter to continue and explore within your grasp.</p>
            <div className="ebs-login-from">
              <label className="ebs-label-input">
                <span className="ebs-label-title">Email</span>
                <input className="ebs-input" type="email" autoComplete="false" placeholder="Youraddres@email.com" />
              </label>
              <label className="ebs-label-input">
                <span className="ebs-label-title">Password</span>
                <input className="ebs-input" type="password" autoComplete="false" placeholder="*********" />
                <span className="ebs-show-password">
                  <img src={require('img/ico-eye.svg')} alt="" />
                </span>
              </label>
              <div className="ebs-forgot-password"><span onClick={() => this.setState({step: 2})}>Forgot password</span></div>
              <div className="ebs-form-accept">
                <label className="ebs-label-accept">
                  <input type="checkbox"  /> <span className="ebs-accept-text">I accept term and conditions.</span>
                </label>
              </div>
              <div className="ebs-btn-wrapp">
                <button className="btn btn-default">Login</button>
              </div>
            </div>
            <div className="ebs-social-meida-login">
              <p>Or login with</p> 
              <div className="d-flex align-items-center justify-content-center">
                <div className="ebs-ico-social">
                  <img src={require('img/ico-facebook.svg')} alt="" />
                </div>
                <div className="ebs-ico-social">
                  <img src={require('img/ico-linkedin.svg')} alt="" />
                </div>
              </div>
            </div>
          </div>}
          {step === 2 &&
          <div className="ebs-login-wrapp-inner">
            <span onClick={() => this.props.onClick()} className="btn-inner-close">
              <img src={require('img/remove-icon-x2.png')} alt="" />
            </span>
            <h2 className="ebs-login-title">Reset password</h2>
            <p className="ebs-login-desc">Enter the email  you will receive a code to reset the password , if you don’t get and any code click on resend code again.</p>
            <div className="ebs-login-from">
              <label className="ebs-label-input">
                <span className="ebs-label-title">Email Address</span>
                <input className="ebs-input" type="email" autoComplete="false" placeholder="Youraddres@email.com" />
              </label>
              <div style={{paddingTop: 40,paddingBottom: 20}} className="ebs-btn-wrapp">
                <button onClick={() => this.setState({step: 3})} className="btn btn-default">Send</button>
              </div>
            </div>
          </div>}
          {step === 3 &&
          <div className="ebs-login-wrapp-inner">
            <span onClick={() => this.props.onClick()} className="btn-inner-close">
              <img src={require('img/remove-icon-x2.png')} alt="" />
            </span>
            <h2 className="ebs-login-title">Verification</h2>
            <p className="ebs-login-desc">Enter the code you will receive a code to reset the password , if you don’t get and any code click on resend code again.</p>
            <div className="ebs-login-from">
              <label className="ebs-label-input">
                <span className="ebs-label-title">Enter code</span>
                <div className="ebs-verfication-code">
                  <input className="ebs-input" type="text" autoComplete="false"  />
                  <input className="ebs-input" type="text" autoComplete="false"  />
                  <input className="ebs-input" type="text" autoComplete="false"  />
                  <input className="ebs-input" type="text" autoComplete="false"  />
                  <input className="ebs-input" type="text" autoComplete="false"  />
                  <input className="ebs-input" type="text" autoComplete="false"  />
                </div>
              </label>
              <div style={{padding: 5}} className="ebs-label-input">
                <span className="ebs-label-title">Code will expire after</span>
                <div className="ebs-verfication-timer">
                 <strong>O4 : 48</strong>
                </div>
              </div>
              <div style={{paddingTop: 10,paddingBottom: 20}} className="ebs-btn-wrapp">
                <div style={{paddingBottom: 10}} className="ebs-forgot-password"><span>Resend code again</span></div>
                <button onClick={() => this.setState({step: 4})} className="btn btn-default">Reset Password</button>
              </div>
            </div>
          </div>}
          {step === 4 &&
          <div className="ebs-login-wrapp-inner">
            <span onClick={() => this.props.onClick()} className="btn-inner-close">
              <img src={require('img/remove-icon-x2.png')} alt="" />
            </span>
            <h2 className="ebs-login-title">Reset password</h2>
            <p className="ebs-login-desc">Enter the email  you will receive a code to reset the password </p>
            <div className="ebs-login-from">
              <label style={{paddingTop: 10}} className="ebs-label-input">
                <span className="ebs-label-title">New Password</span>
                <input className="ebs-input" type="password" placeholder="*********" autoComplete="false"  />
              </label>
              <label style={{paddingTop: 10}} className="ebs-label-input">
                <span className="ebs-label-title">Reenter  Password</span>
                <input className="ebs-input" type="password" placeholder="*********" autoComplete="false"  />
              </label>
              <div style={{paddingTop: 40,paddingBottom: 30}} className="ebs-btn-wrapp">
                <button className="btn btn-default">Save</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { event } = state;
  return {
    event,
  };
}

export default connect(mapStateToProps)(withRouter(LoginScreen));
