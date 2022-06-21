import React from 'react';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import DateTime from 'components/forms/DateTime';
import DropDown from 'components/forms/DropDown';

const options = [
  { id: 1, name: 'Chocolate' },
  { id: 2, name: 'Strawberry' },
  { id: 3, name: 'Vanilla' }
]
const MyBilling = () =>  {
  return (
    <div  className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header">
          <h2>My Billing</h2>
        </div>
        <div style={{background: 'transparent'}} className="ebs-my-account-container">
          <div className="ebs-edit-profile-section">
            <h3 className="ebs-title">Basic Information:</h3> 
              <Input label="Full name"  />
              <Input label="Email"  />
              <Input label="Confirm email"  />
              <div className='form-phone-field'>
                <DropDown
                  listitems={options}
                  required={false}
                />
                <Input label="Phone"  />
              </div>
              <div className='inline radio-check-field style-radio'>
                <h5>Gender</h5>
                <label className={'checked'}><span>Male</span></label>
                <label><span>Female</span></label>
              </div>
              <DateTime
                label={'Birth date'}
                required={true}
                showdate={'YYYY-MM-DD'}
              />
              <DateTime
                label={'Birth date'}
                required={true}
                showdate={'YYYY-MM-DD'}
              />
              <DateTime
                label={'Birth date'}
                required={true}
                showdate={'YYYY-MM-DD'}
              />
              <Input label="Initial" value="Mr" />
              <Input label="First name"  />
              <DropDown label="Please Select" listitems={options} required={false} />
              <Input label="Last Name" value="Mr" />
              <TextArea label="About"  />
              <div className="ebs-profile-image">
                <label>
                  <img src="https://via.placeholder.com/155.png" alt="" />
                  <span>Uplaod Photo</span>
                  <input type="file"  />
                </label>
              </div>
              <h3 className="ebs-title">Professional Information:</h3> 
              <Input label="Company name"  />
              <Input label="Title"  />
              <Input label="Organization"  />
              <DateTime
                label={'Employment date'}
                required={true}
                showdate={'YYYY-MM-DD'}
              />
              <Input label="Department"  />
              <DateTime
                label={'Select country'}
                required={true}
                showdate={'YYYY-MM-DD'}
              />
              <Input label="Industry"  />
              <Input label="Job tasks "  />
              <Input label="Interests"  />
              <Input label="Network group"  />
              <Input label="Delegate number"  />
              <Input label="Delegate number"  />
              <h3 style={{marginTop: 40}} className="ebs-title">Address:</h3> 
              <Input label="Street number"  />
              <Input label="House number"  />
              <Input label="Postal code"  />
              <Input label="City"  />
              <Input label="Country"  />
              <div className="ebs-contact-info">
                <h3 className='ebs-title'>Contact information:</h3>
              <div className="ebs-contact-row d-flex align-items-center">
                <img src={require('public/img/ico-phone.svg')} alt="" />
                <div className='form-phone-field'>
                    <DropDown
                      listitems={options}
                      required={false}
                    />
                  <Input label="Phone"  />
                  </div>
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('public/img/ico-envelope.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('public/img/ico-web.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('public/img/ico-facebook.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('public/img/ico-twitter.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('public/img/ico-linkedin.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
              </div>
              <div className='radio-check-field ebs-radio-lg field-terms-services'>
                <label><span>I agree to the <mark>GDPR Terms of Service</mark></span></label>
              </div>
              <div className="bottom-button text-center">
                
                  <a className="btn btn-cancel">Skip <i className="material-icons">keyboard_arrow_right</i></a>
                <button
                  type="submit"
                  className="btn btn-save-next btn-loader">
                   Save &amp; next  <i className="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  MyBilling;