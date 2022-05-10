import  React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import {
  setShowLogin
} from "store/Slices/GlobalSlice";
import {
  eventSelector
} from "store/Slices/EventSlice";
import {
  logUserIn, 
  userSelector
} from "store/Slices/myAccount/userSlice";
const LoginScreen = ({history}) => {
  const dispatch = useDispatch();
  const {event} = useSelector(eventSelector);
  const {userData, loading} = useSelector(userSelector);
  const [, forceUpdate] = useState(0);
  const simpleValidator = useRef(new SimpleReactValidator({
    element: (message) => <p className="error-message">{message}</p>,
    messages: {
      required: "This field is required!",
      email:"Enter a valid email address",
      min:'Minimum 6 characters are required'
    },
    autoForceUpdate: { forceUpdate: () => forceUpdate(1) }
  }))
  const [step, setStep] = useState(1);
  const [valid, setValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    acceptTermsConditions:false,
  });
   
  useEffect(() => {
    if(userData !== null){
      history.push(`/${event.url}/profile`);
      onCancel();
    }
  }, [userData])

  useEffect(() => {
    setValid(simpleValidator.current.allValid())  
  }, [formData])
  
  const onChange=(e)=>{
    if(e.target.name !== "acceptTermsConditions"){
      setFormData({...formData, [e.target.name]:e.target.value});
    }else{
      setFormData({...formData, [e.target.name]:e.target.checked});
    }
  }
  const onCancel = () =>{
    dispatch(setShowLogin(false));
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{
      dispatch(logUserIn(event.id, event.url, formData));
    }
  }
  return (
    <div className="ebs-login-screen">
      <div className="ebs-login-wrapp">
        <form id="loginForm" onSubmit={(e)=>{onSubmit(e)}}>
        {step === 1 && <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
            <img src={require('img/remove-icon-x2.png')} alt="" />
          </span>
          <h2 className="ebs-login-title">Login</h2>
          <p className="ebs-login-desc">Enter to continue and explore within your grasp.</p>
          {Number(event.attendee_settings.email_enable) === 1 && <div className="ebs-login-from">
            <label className="ebs-label-input">
              <span className="ebs-label-title">Email</span>
              <input className="ebs-input" name="email" type="email" autoComplete="false" placeholder="Youraddres@email.com" value={formData.email} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('email')}/>
              {simpleValidator.current.message('email', formData.email, 'required|email')}
            </label>
          {Number(event.attendee_settings.hide_password) === 0 && Number(event.attendee_settings.registration_password) === 0 && Number(event.attendee_settings.authentication) === 0 && <label className="ebs-label-input" >
              <span className="ebs-label-title">Password</span>
              <input className="ebs-input" name="password" type={showPassword ? "text" : "password"} autoComplete="false" placeholder="*********" value={formData.password} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('password')} />
              <span className="ebs-show-password">
                <img src={showPassword ? require('img/icon-eye-close.svg'): require('img/icon-eye.svg')} onClick ={()=>{setShowPassword(!showPassword)}} alt="" />
              </span>
              {simpleValidator.current.message('password', formData.password, 'required|min:6')}
            </label>}
          {Number(event.attendee_settings.hide_password) === 0 && Number(event.attendee_settings.forgot_link) === 0 && Number(event.attendee_settings.authentication) === 0 && <div className="ebs-forgot-password"><span onClick={() => setStep(2) }>Forgot password</span></div>}
            <div className="ebs-form-accept">
              <label className="ebs-label-accept">
                <input type="checkbox" name="acceptTermsConditions" value={formData.acceptTermsConditions} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('acceptTermsConditions')} /> <span className="ebs-accept-text">I accept term and conditions.</span>
                  {simpleValidator.current.message('acceptTermsConditions', formData.acceptTermsConditions, 'accepted')}
              </label>
            </div>
            <div className="ebs-btn-wrapp">
              <button className="btn btn-default" type="submit" disabled={!valid ? true : false}>Login</button>
            </div>
          </div>}
          {(Number(event.attendee_settings.linkedin_registration) === 1 || Number(event.attendee_settings.facebook_enable) === 1) && <div className="ebs-social-meida-login">
            <p>Or login with</p> 
            <div className="d-flex align-items-center justify-content-center">
              {Number(event.attendee_settings.facebook_enable) === 1 && <div className="ebs-ico-social">
                <img src={require('img/ico-facebook.svg')} alt="" />
              </div>}
              {Number(event.attendee_settings.linkedin_registration) === 1 && <div className="ebs-ico-social">
                <img src={require('img/ico-linkedin.svg')} alt="" />
              </div>}
            </div>
          </div>}
        </div>}
        </form>
        {step === 2 &&
        <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
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
              <button onClick={() => setStep(3)} className="btn btn-default">Send</button>
            </div>
          </div>
        </div>}
        {step === 3 &&
        <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
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
              <button onClick={() => setStep(4)} className="btn btn-default">Reset Password</button>
            </div>
          </div>
        </div>}
        {step === 4 &&
        <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
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

export default withRouter(LoginScreen)
