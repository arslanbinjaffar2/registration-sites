import React, {useState, useEffect, useRef} from 'react'
import SimpleReactValidator from "simple-react-validator";
import AlertMessage from './AlertMessage';

const Login = ({setStep, onCancel, onformSubmit, event, error, loading}) => {
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
    const [valid, setValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email:'',
      password:'',
      acceptTermsConditions:false,
    });
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

const onSubmit = (e) =>{
    e.preventDefault();
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{
      onformSubmit(formData);
    }
  }
  return (
    <form id="loginForm" onSubmit={(e)=>{onSubmit(e)}}>
        <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
            <img src={require('public/img/remove-icon-x2.png')} alt="" />
          </span>
          <h2 className="ebs-login-title">Login</h2>
          <p className="ebs-login-desc">Enter to continue and explore within your grasp.</p>
          {error && <AlertMessage message={error}/>}
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
                <img src={showPassword ? require('public/img/icon-eye-close.svg'): require('public/img/icon-eye.svg')} onClick ={()=>{setShowPassword(!showPassword)}} alt="" />
              </span>
              {simpleValidator.current.message('password', formData.password, 'required|min:6')}
            </label>}
          {Number(event.attendee_settings.hide_password) === 0 && Number(event.attendee_settings.forgot_link) === 0 && Number(event.attendee_settings.authentication) === 0 && <div className="ebs-forgot-password"><span onClick={() => setStep("requestResetPassword") }>Forgot password</span></div>}
            <div className="ebs-form-accept">
              <label className="ebs-label-accept">
                <input type="checkbox" name="acceptTermsConditions" value={formData.acceptTermsConditions} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('acceptTermsConditions')} /> <span className="ebs-accept-text">I accept term and conditions.</span>
                  {simpleValidator.current.message('acceptTermsConditions', formData.acceptTermsConditions, 'accepted')}
              </label>
            </div>
            <div className="ebs-btn-wrapp">
              <button className="btn btn-default" type="submit" disabled={(!valid || loading) ? true : false}>{loading ? 'Loading...': "Login"}</button>
            </div>
          </div>}
          {(Number(event.attendee_settings.linkedin_registration) === 1 || Number(event.attendee_settings.facebook_enable) === 1) && <div className="ebs-social-meida-login">
            <p>Or login with</p> 
            <div className="d-flex align-items-center justify-content-center">
              {Number(event.attendee_settings.facebook_enable) === 1 && <div className="ebs-ico-social">
                <img src={require('public/img/ico-facebook.svg')} alt="" />
              </div>}
              {Number(event.attendee_settings.linkedin_registration) === 1 && <div className="ebs-ico-social">
                <img src={require('public/img/ico-linkedin.svg')} alt="" />
              </div>}
            </div>
          </div>}
        </div>
        </form>
  )
}

export default Login