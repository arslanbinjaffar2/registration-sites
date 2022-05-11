import React, {useRef, useState, useEffect} from 'react'
import SimpleReactValidator from "simple-react-validator";
import AlertMessage from './AlertMessage';
const RequestResetPassword = ({onCancel, setStep, onformSubmit, error}) => {
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
    const [email, setEmail] = useState('');
useEffect(() => {
    setValid(simpleValidator.current.allValid())  
    }, [email])

const onSubmit = () =>{
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{
        console.log(email);
      onformSubmit(email);
    }
  }
  return (
    <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
            <img src={require('img/remove-icon-x2.png')} alt="" />
          </span>
          <h2 className="ebs-login-title">Reset password</h2>
          <p className="ebs-login-desc">Enter the email  you will receive a code to reset the password , if you don’t get and any code click on resend code again.</p>
          {error && <AlertMessage message={error}/>}
          <div className="ebs-login-from">
            <label className="ebs-label-input">
              <span className="ebs-label-title">Email Address</span>
              <input className="ebs-input" type="email" value={email} autoComplete="false" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Youraddres@email.com" onBlur={()=>simpleValidator.current.showMessageFor('email')} />
              {simpleValidator.current.message('email', email, 'required|email')}
            </label>
            <div style={{paddingTop: 40,paddingBottom: 20}} className="ebs-btn-wrapp">
              <button disabled={valid ? false : true} onClick={() => { onSubmit()}} className="btn btn-default">Send</button>
            </div>
          </div>
        </div>
  )
}

export default RequestResetPassword