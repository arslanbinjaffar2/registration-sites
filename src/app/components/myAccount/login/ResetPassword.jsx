import React, {useState, useEffect, useRef} from 'react'
import SimpleReactValidator from "simple-react-validator";
import AlertMessage from './AlertMessage';
const ResetPassword = ({onCancel, onformSubmit, email, error,loading}) => {
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
    const [pWordMatch, setPWordMatch] = useState(true);
    const [formData, setFormData] = useState({
        password_confirmation:'',
        password:'',
    });
useEffect(() => {
    setValid(simpleValidator.current.allValid()) 
    setPWordMatch(true); 
    }, [formData])

const onChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
}

const onSubmit = () =>{
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{
        if(formData.password !== formData.password_confirmation){
            setPWordMatch(false);
        }else{
            onformSubmit({...formData, email:email});
        }
    }
  }
  return (
    <div className="ebs-login-wrapp-inner">
          <span onClick={() => onCancel()} className="btn-inner-close">
            <img src={require('img/remove-icon-x2.png')} alt="" />
          </span>
          <h2 className="ebs-login-title">Reset password</h2>
          <p className="ebs-login-desc">Enter the email  you will receive a code to reset the password </p>
          {error && <AlertMessage message={error}/>}
          <div className="ebs-login-from">
            <label style={{paddingTop: 10}} className="ebs-label-input">
              <span className="ebs-label-title">New Password</span>
              <input className="ebs-input" name="password" type="password" placeholder="*********" autoComplete="false" value={formData.password} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('password')} />
              {simpleValidator.current.message('password', formData.password, 'required|min:6')}
            </label>
            <label style={{paddingTop: 10}} className="ebs-label-input">
              <span className="ebs-label-title">Reenter  Password</span>
              <input className="ebs-input" name='password_confirmation' type="password" placeholder="*********" autoComplete="false" value={formData.password_confirmation} onChange={(e)=>{onChange(e)}} onBlur={()=>simpleValidator.current.showMessageFor('password_confirmation')} />
              {simpleValidator.current.message('password_confirmation', formData.password_confirmation, 'required|min:6')}
            </label>
            {(valid && !pWordMatch) && <div className='error-message'>
                    Passwords don't match..
            </div>}
            <div style={{paddingTop: 40,paddingBottom: 30}}  className="ebs-btn-wrapp">
              <button onClick={()=>{onSubmit()}} disabled={(valid && !loading) ? false : true} className="btn btn-default">{loading ? "Loading...":"Save"}</button>
            </div>
          </div>
        </div>
  )
}

export default ResetPassword