import React, {useEffect} from 'react';
import Input from '@/forms/Input';
import TextArea from '@/forms/TextArea';
import DateTime from '@/forms/DateTime';
import DropDown from '@/forms/DropDown';
import { fetchProfileData, profileSelector } from 'store/Slices/myAccount/profileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
const options = [
  { id: 1, name: 'Chocolate' },
  { id: 2, name: 'Strawberry' },
  { id: 3, name: 'Vanilla' }
]
const MyProfileEdit = () =>  {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileData(event.url));
  }, [])
  const { attendee } = useSelector(profileSelector);
  return (
    <div  className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner">
        <div className="ebs-header">
          <h2>Edit profile</h2>
        </div>
        <div style={{background: 'transparent'}} className="ebs-my-account-container">
          <div className="ebs-edit-profile-section">
            <h3 className="ebs-title">Basic Information:</h3> 
              <Input label="Initial" value="Mr" />
              <Input label="First name"  />
              <Input label="Last Name" value="Mr" />
              <TextArea label="About"  />
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
                <img src={require('img/ico-phone.svg')} alt="" />
                <div className='form-phone-field'>
                    <DropDown
                      listitems={options}
                      required={false}
                    />
                  <Input label="Phone"  />
                  </div>
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-envelope.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-web.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-facebook.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-twitter.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-linkedin.svg')} alt="" />
                  <Input label="E-mail" required  />
                </div>
              </div>
              <div className='radio-check-field ebs-radio-lg field-terms-services'>
                <label><span>I agree to the <mark>GDPR Terms of Service</mark></span></label>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  MyProfileEdit;