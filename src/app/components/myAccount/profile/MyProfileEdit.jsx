import React, {useEffect, useState} from 'react';
import Input from '@/forms/Input';
import TextArea from '@/forms/TextArea';
import DateTime from '@/forms/DateTime';
import DropDown from '@/forms/DropDown';
import { fetchProfileData, editProfileSelector, updateAttendee} from 'store/Slices/myAccount/editProfileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";

const MyProfileEdit = () =>  {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileData(event.url));
  }, [])
  const { attendee, languages, callingCodes } = useSelector(editProfileSelector);
  
  return (
    attendee && (
      <ProfileEditForm attendee={attendee} languages={languages} callingCodes={callingCodes} />
    )
  )
}

export default  MyProfileEdit;


const ProfileEditForm = ({ attendee, languages, callingCodes }) => {
  const [attendeeData, setAttendeeData] = useState(attendee);
  const updateAttendeeFeild = (e) => {
      const { name, value } = e.currentTarget;
      console.log(value);
      setAttendeeData({
        ...attendeeData,
        [name]: value
    })
  }
  const updateAttendeeInfoFeild = (e) => {
      const { name, value } = e.currentTarget;
      console.log(value);
      setAttendeeData({
        ...attendeeData,
        info: {
          ...attendeeData.info,
          [name]:value
        }
    })
  }
  const updateDate = (obj) => {
    setAttendeeData({
      ...attendeeData,
      [obj.name]: obj.item.format("YYYY-MM-DD")
  })
  }
  const updateInfoDate = (obj) => {
      setAttendeeData({
        ...attendeeData,
        info: {
          ...attendeeData.info,
          [obj.name]:obj.item.format("YYYY-MM-DD")
        }
    })
  }
  const updateSelect = (obj) => {
      setAttendeeData({
        ...attendeeData,
          [obj.name]:obj.item
    })
  }
  const updateInfoSelect = (obj) => {
      setAttendeeData({
        ...attendeeData,
        info: {
          ...attendeeData.info,
          [obj.name]:obj.item
        }
    })
  }
  
  return (
    <div  className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner">
        <div className="ebs-header">
          <h2>Edit profile</h2>
        </div>
        <div style={{background: 'transparent'}} className="ebs-my-account-container">
          <div className="ebs-edit-profile-section">
            <h3 className="ebs-title">Basic Information:</h3> 
              <Input label="Initial" name="initial" onChange={(e)=>{ updateAttendeeInfoFeild(e) }}  value={(attendeeData.info && attendeeData.info.initial) && attendeeData.info.initial} />
              <Input label="First name" placeholder="First name" name="first_name" onChange={(e)=>{ updateAttendeeFeild(e) }} value={attendeeData.first_name && attendeeData.first_name}  />
              <Input label="Last Name" name="last_name" onChange={(e)=>{ updateAttendeeFeild(e) }}  placeholder="Last name" value={attendeeData.last_name  && attendeeData.last_name}  />
              <TextArea label="About" name="about" onChange={(e)=>{ updateAttendeeInfoFeild(e) }}  placeholder="about" value={attendeeData.info  && attendeeData.info.about}  />
              <Input label="Age" name="age" onChange={(e)=>{ updateAttendeeInfoFeild(e) }}  value={(attendeeData.info && attendeeData.info.age) && attendeeData.info.age} />
              <div className='inline radio-check-field style-radio radio-feild'>
                <h5>Gender</h5>
                <label>
                  <input type="radio" name="gender" value="male" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} checked={attendeeData.info.gender === "male"} />
                  Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" onChange={(e)=>{ updateAttendeeInfoFeild(e)  }}  checked={attendeeData.info.gender === "female"}/>
                  Female
                </label>
              </div>
              <DateTime
                label={'Birth date'}
                required={true}
                onChange={(item)=>{ updateDate({item, name:"BIRTHDAY_YEAR"}) }}
                value={attendeeData.BIRTHDAY_YEAR && attendeeData.BIRTHDAY_YEAR}
                showdate={'YYYY-MM-DD'}
              />
              <Input label="First name (Passport)" name="FIRST_NAME_PASSPORT" onChange={(e)=>{ updateAttendeeFeild(e) }}  value={attendeeData.FIRST_NAME_PASSPORT  && attendeeData.FIRST_NAME_PASSPORT} />
              <Input label="Last name (Passport)" name="LAST_NAME_PASSPORT" onChange={(e)=>{ updateAttendeeFeild(e) }} value={attendeeData.LAST_NAME_PASSPORT  && attendeeData.LAST_NAME_PASSPORT} />
              <Input label="Place of birth (Passport)" name="place_of_birth" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.place_of_birth) && attendeeData.info.place_of_birth} />
              <Input label="Passport no" name="passport_no" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.passport_no) && attendeeData.info.passport_no} />
              <DateTime
                label={'Date of issue (Passport)'}
                required={true}
                onChange={(item)=>{ updateInfoDate({item, name:"date_of_issue_passport"}) }}
                value={(attendeeData.info && attendeeData.info.date_of_issue_passport) && attendeeData.info.date_of_issue_passport}
                showdate={'YYYY-MM-DD'}
              />
              <DateTime
                label={'Date of expiry (Passport)'}
                required={true}
                onChange={(item)=>{ updateInfoDate({item, name:"date_of_expiry_passport"}) }}
                value={(attendeeData.info && attendeeData.info.date_of_expiry_passport) && attendeeData.info.date_of_expiry_passport}
                showdate={'YYYY-MM-DD'}
              />
              
              <DropDown label="Spoken languages" listitems={languages} required={false} isMulti={true} 
              selected={languages.filter((item)=> attendeeData.SPOKEN_LANGUAGE.split(",").indexOf(item.name) != -1 ).map((item,index)=>({label: item.name,value: item.id,key: index}))} name="SPOKEN_LANGUAGE" onChange={(item)=>{ updateSelect({item,name:"SPOKEN_LANGUAGE"})}} />
              <div className="ebs-profile-image">
                <label>
                  <img src="https://via.placeholder.com/155.png" alt="" />
                  <span>Uplaod Photo</span>
                  <input type="file"  />
                </label>
              </div>
              <h3 className="ebs-title">Professional Information:</h3> 
              <Input label="Company name" name="company_name" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.company_name) && attendeeData.info.company_name}  />
              <Input label="Title" name="title" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.title) && attendeeData.info.title} />
              <Input label="Organization" name="organization" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.organization) && attendeeData.info.organization} />
              <DateTime
                label={'Employment date'}
                required={true}
                onChange={(item)=>{ updateDate({item, name:"EMPLOYMENT_DATE"}) }}
                value={attendeeData.EMPLOYMENT_DATE   && attendeeData.EMPLOYMENT_DATE}
                showdate={'YYYY-MM-DD'}
              />
              <Input label="Department" name="department" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.organization) && attendeeData.info.organization}  />
              <DropDown label="Select Country" listitems={languages} />
              <Input label="Industry" name="industry" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.industry) && attendeeData.info.industry} />
              <Input label="Job tasks" name="jobs" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.jobs) && attendeeData.info.jobs} />
              <Input label="Interests" name="interests" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.interests) && attendeeData.info.interests} />
              <Input label="Network group" name="network_group" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.network_group) && attendeeData.info.network_group}  />
              <Input label="Delegate number" name="delegate_number" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.delegate_number) && attendeeData.info.delegate_number}  />
              <Input label="Delegate number"name="table_number" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.table_number) && attendeeData.info.table_number} />
              <h3 style={{marginTop: 40}} className="ebs-title">Address:</h3> 
              <Input label="Street number" name="private_street" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.private_street) && attendeeData.info.private_street}  />
              <Input label="House number" name="private_house_number" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.private_house_number) && attendeeData.info.private_house_number} />
              <Input label="Postal code" name="private_post_code" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.private_post_code) && attendeeData.info.private_post_code} />
              <Input label="City" name="private_city" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.private_city) && attendeeData.info.private_city} />
              <Input label="Country"  name="private_country" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.private_country) && attendeeData.info.private_country} />
              <div className="ebs-contact-info">
                <h3 className='ebs-title'>Contact information:</h3>
              <div className="ebs-contact-row d-flex align-items-center">
                <img src={require('img/ico-phone.svg')} alt="" />
                <div className='form-phone-field'>
                    <DropDown
                      listitems={callingCodes}
                      required={false}
                      name="calling_code"
                      isMulti={false}
                      onChange={(item)=>{ console.log(item)}}
                    />
                  <Input label="Phone" onChange={(e)=>{ updateAttendeeFeild(e) }} value={attendeeData.phone  && attendeeData.phone} />
                  </div>
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-envelope.svg')} alt="" />
                  <Input label="E-mail" required name="email" onChange={(e)=>{ updateAttendeeFeild(e) }} value={attendeeData.email && attendeeData.email} />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-web.svg')} alt="" />
                  <Input label="E-mail" required name="website" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.website) && attendeeData.info.website} />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-facebook.svg')} alt="" />
                  <Input label="E-mail" required name="facebook" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.facebook) && attendeeData.info.facebook} />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-twitter.svg')} alt="" />
                  <Input label="E-mail" required  name="twitter" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.twitter) && attendeeData.info.twitter} />
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require('img/ico-linkedin.svg')} alt="" />
                  <Input label="E-mail" required name="linkedin" onChange={(e)=>{ updateAttendeeInfoFeild(e) }} value={(attendeeData.info  && attendeeData.info.linkedin) && attendeeData.info.linkedin} />
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

