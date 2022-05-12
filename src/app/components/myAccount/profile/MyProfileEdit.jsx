import React, { useEffect, useState } from "react";
import Input from "@/forms/Input";
import TextArea from "@/forms/TextArea";
import DateTime from "@/forms/DateTime";
import DropDown from "@/forms/DropDown";
import {
  fetchProfileData,
  profileSelector,
  updateProfileData
} from "store/Slices/myAccount/profileSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";

const MyProfileEdit = () => {
  const { event } = useSelector(eventSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileData(event.id, event.url));
  }, []);
  const { attendee, languages, callingCodes, countries, loading, alert, error } =
    useSelector(profileSelector);

  return (
    attendee && (
      <ProfileEditForm
        attendee={attendee}
        languages={languages}
        callingCodes={callingCodes}
        countries={countries}
        event={event}
        loading={loading}
        alert={alert}
        error={error}
      />
    )
  );
};

export default MyProfileEdit;

const ProfileEditForm = ({ attendee, languages, callingCodes, countries, event, loading, alert, error }) => {
  const dispatch = useDispatch();
  const [attendeeData, setAttendeeData] = useState(attendee);
  useEffect(() => {
    setAttendeeData({
      ...attendeeData,
      SPOKEN_LANGUAGE: languages
        .filter(
          (item) =>
            attendeeData.SPOKEN_LANGUAGE.split(",").indexOf(item.name) !== -1
        )
        .map((item, index) => ({
          label: item.name,
          value: item.id,
          key: index,
        })),
      calling_code: {
        label: attendeeData.phone.split("-")[0],
        value: attendeeData.phone.split("-")[0],
      },
      phone: attendeeData.phone.split("-")[1],
      gdpr: attendeeData.current_event_attendee.gdpr,
      country: countries.find((item) => item.id === attendeeData.info.country),
    });
  }, []);
  const updateAttendeeFeild = (e) => {
    const { name, value } = e.currentTarget;
    console.log(value);
    setAttendeeData({
      ...attendeeData,
      [name]: value,
    });
  };
  const updateAttendeeInfoFeild = (e) => {
    const { name, value } = e.currentTarget;
    console.log(value);
    setAttendeeData({
      ...attendeeData,
      info: {
        ...attendeeData.info,
        [name]: value,
      },
    });
  };
  const updateDate = (obj) => {
    setAttendeeData({
      ...attendeeData,
      [obj.name]: obj.item.format("YYYY-MM-DD"),
    });
  };
  const updateInfoDate = (obj) => {
    setAttendeeData({
      ...attendeeData,
      info: {
        ...attendeeData.info,
        [obj.name]: obj.item.format("YYYY-MM-DD"),
      },
    });
  };
  const updateSelect = (obj) => {
    setAttendeeData({
      ...attendeeData,
      [obj.name]: obj.item,
    });
  };
  const updateInfoSelect = (obj) => {
    setAttendeeData({
      ...attendeeData,
      info: {
        ...attendeeData.info,
        [obj.name]: obj.item,
      },
    });
  };

  const updateAttendee = (e) => {
    e.preventDefault();

    let attendeeObj = {
      phone : `${attendeeData.calling_code.value}-${attendeeData.phone}`,
    };

    let infoObj = {
        ...attendeeData.info,
        country: attendeeData.country ? attendeeData.country.value : attendeeData.info.country,
    }

    let settings ={
      gdpr : attendeeData.gdpr
    }

  
    if(attendeeData.email)attendeeObj.email=attendeeData.email;
    if(attendeeData.first_name)attendeeObj.first_name=attendeeData.first_name;
    if(attendeeData.last_name)attendeeObj.last_name=attendeeData.last_name;
    if(attendeeData.FIRST_NAME_PASSPORT)attendeeObj.FIRST_NAME_PASSPORT=attendeeData.FIRST_NAME_PASSPORT;
    if(attendeeData.LAST_NAME_PASSPORT)attendeeObj.LAST_NAME_PASSPORT=attendeeData.LAST_NAME_PASSPORT;
    if(attendeeData.BIRTHDAY_YEAR)attendeeObj.BIRTHDAY_YEAR=attendeeData.BIRTHDAY_YEAR;
    if(attendeeData.EMPLOYMENT_DATE)attendeeObj.EMPLOYMENT_DATE=attendeeData.EMPLOYMENT_DATE;
    if(attendeeData.image)attendeeObj.image=attendeeData.image;
    if(attendeeData.SPOKEN_LANGUAGE)attendeeObj.SPOKEN_LANGUAGE=attendeeData.SPOKEN_LANGUAGE.reduce((ack, item, index) => {
      if(index !== attendeeData.SPOKEN_LANGUAGE.length -1){
        return ack+=`${item.label},`
      }  
      return ack+=`${item.label}`
    }, "");
    
    const data = {
      attendeeObj,
      settings,
      infoObj
    };
    dispatch(updateProfileData(event.id,event.url, data));
  };

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner">
        <div className="ebs-header">
          <h2>Edit profile</h2>
          <span className='btn-link'>Save Changes</span>
        </div>
        <form onSubmit={(e)=> updateAttendee(e)}>
          <div
            style={{ background: "transparent" }}
            className="ebs-my-account-container"
          >
            <div className="ebs-edit-profile-section">
              <h3 className="ebs-title">Basic Information:</h3>
              {attendeeData.info && attendeeData.info.initial && (
                <Input
                  label="Initial"
                  name="initial"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.initial}
                />
              )}
              {attendeeData.first_name && (
                <Input
                  label="First name"
                  placeholder="First name"
                  name="first_name"
                  required={true}
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  value={attendeeData.first_name}
                />
              )}
              {attendeeData.last_name && (
                <Input
                  label="Last Name"
                  name="last_name"
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  placeholder="Last name"
                  value={attendeeData.last_name}
                />
              )}
              {attendeeData.info && (
                <TextArea
                  label="About"
                  name="about"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  placeholder="about"
                  value={attendeeData.info.about}
                />
              )}
              {attendeeData.info && attendeeData.info.age && (
                <Input
                  label="Age"
                  name="age"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.age}
                />
              )}
              {attendeeData.info.gender && (
                <div className="inline radio-check-field style-radio radio-feild">
                  <h5>Gender</h5>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      checked={attendeeData.info.gender === "male"}
                    />
                    <span>Male</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      checked={attendeeData.info.gender === "female"}
                    />
                    <span>Female</span>
                  </label>
                </div>
              )}
              {attendeeData.BIRTHDAY_YEAR && (
                <DateTime
                  label={"Birth date"}
                  required={true}
                  onChange={(item) => {
                    updateDate({ item, name: "BIRTHDAY_YEAR" });
                  }}
                  value={attendeeData.BIRTHDAY_YEAR}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {attendeeData.FIRST_NAME_PASSPORT && (
                <Input
                  label="First name (Passport)"
                  name="FIRST_NAME_PASSPORT"
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  value={attendeeData.FIRST_NAME_PASSPORT}
                />
              )}
              {attendeeData.LAST_NAME_PASSPORT && (
                <Input
                  label="Last name (Passport)"
                  name="LAST_NAME_PASSPORT"
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  value={attendeeData.LAST_NAME_PASSPORT}
                />
              )}
              {attendeeData.info && attendeeData.info.place_of_birth && (
                <Input
                  label="Place of birth (Passport)"
                  name="place_of_birth"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.place_of_birth}
                />
              )}
              {attendeeData.info && attendeeData.info.passport_no && (
                <Input
                  label="Passport no"
                  name="passport_no"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.passport_no}
                />
              )}
              {attendeeData.info && attendeeData.info.date_of_issue_passport && (
                <DateTime
                  label={"Date of issue (Passport)"}
                  required={true}
                  onChange={(item) => {
                    updateInfoDate({ item, name: "date_of_issue_passport" });
                  }}
                  value={attendeeData.info.date_of_issue_passport}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {attendeeData.info && attendeeData.info.date_of_expiry_passport && (
                <DateTime
                  label={"Date of expiry (Passport)"}
                  required={true}
                  onChange={(item) => {
                    updateInfoDate({ item, name: "date_of_expiry_passport" });
                  }}
                  value={
                    attendeeData.info &&
                    attendeeData.info.date_of_expiry_passport &&
                    attendeeData.info.date_of_expiry_passport
                  }
                  showdate={"YYYY-MM-DD"}
                />
              )}

              {attendeeData.SPOKEN_LANGUAGE && (
                <DropDown
                  label="Spoken languages"
                  listitems={languages}
                  required={false}
                  isMulti={true}
                  selected={
                    attendeeData.SPOKEN_LANGUAGE &&
                    typeof attendeeData.SPOKEN_LANGUAGE !== String
                      ? attendeeData.SPOKEN_LANGUAGE
                      : null
                  }
                  name="SPOKEN_LANGUAGE"
                  onChange={(item) => {
                    updateSelect({ item, name: "SPOKEN_LANGUAGE" });
                  }}
                />
              )}
              <div className="ebs-profile-image">
                <label>
                  <img src="https://via.placeholder.com/155.png" alt="" />
                  <span>Uplaod Photo</span>
                  <input type="file" />
                </label>
              </div>
              <h3 className="ebs-title">Professional Information:</h3>
              {attendeeData.info && attendeeData.info.company_name && (
                <Input
                  label="Company name"
                  name="company_name"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.company_name}
                />
              )}
              {attendeeData.info && attendeeData.info.title && (
                <Input
                  label="Title"
                  name="title"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={
                    attendeeData.info &&
                    attendeeData.info.title &&
                    attendeeData.info.title
                  }
                />
              )}
              {attendeeData.info && attendeeData.info.organization && (
                <Input
                  label="Organization"
                  name="organization"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.organization}
                />
              )}
              {attendeeData.EMPLOYMENT_DATE && (
                <DateTime
                  label={"Employment date"}
                  required={true}
                  onChange={(item) => {
                    updateDate({ item, name: "EMPLOYMENT_DATE" });
                  }}
                  value={attendeeData.EMPLOYMENT_DATE}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {attendeeData.info && attendeeData.info.organization && (
                <Input
                  label="Department"
                  name="department"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.organization}
                />
              )}
              {attendeeData.info && attendeeData.info.country && (
                <DropDown
                  label="Select Country"
                  listitems={countries}
                  onChange={(item) => {
                    updateSelect({ item, name: "country" });
                  }}
                />
              )}
              {attendeeData.info && attendeeData.info.industry && (
                <Input
                  label="Industry"
                  name="industry"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.industry}
                />
              )}
              {attendeeData.info && attendeeData.info.jobs && (
                <Input
                  label="Job tasks"
                  name="jobs"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.jobs}
                />
              )}
              {attendeeData.info && attendeeData.info.interests && (
                <Input
                  label="Interests"
                  name="interests"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.interests}
                />
              )}
              {attendeeData.info && attendeeData.info.network_group && (
                <Input
                  label="Network group"
                  name="network_group"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.network_group}
                />
              )}
              {attendeeData.info && attendeeData.info.delegate_number && (
                <Input
                  label="Delegate number"
                  name="delegate_number"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.delegate_number}
                />
              )}
              {attendeeData.info && attendeeData.info.table_number && (
                <Input
                  label="Delegate number"
                  name="table_number"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.table_number}
                />
              )}
              <h3 style={{ marginTop: 40 }} className="ebs-title">
                Address:
              </h3>
              {attendeeData.info && attendeeData.info.private_street && (
                <Input
                  label="Street number"
                  name="private_street"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_street}
                />
              )}
              {attendeeData.info && attendeeData.info.private_house_number && (
                <Input
                  label="House number"
                  name="private_house_number"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_house_number}
                />
              )}
              {attendeeData.info && attendeeData.info.private_post_code && (
                <Input
                  label="Postal code"
                  name="private_post_code"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_post_code}
                />
              )}
              {attendeeData.info && attendeeData.info.private_city && (
                <Input
                  label="City"
                  name="private_city"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_city}
                />
              )}
              {attendeeData.info && attendeeData.info.private_country && (
                <Input
                  label="Country"
                  name="private_country"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_country}
                />
              )}
              <div className="ebs-contact-info">
                <h3 className="ebs-title">Contact information:</h3>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-phone.svg")} alt="" />
                  <div className="form-phone-field">
                    {attendeeData.calling_code && (
                      <React.Fragment>
                        <DropDown
                          listitems={callingCodes}
                          name="calling_code"
                          required={false}
                          selectedlabel={attendeeData.calling_code.value}
                          selected={attendeeData.calling_code.value}
                          onChange={(item) => {
                            updateSelect({ item, name: "calling_code" });
                          }}
                        />
                        <Input
                          label="Phone"
                          onChange={(e) => {
                            updateAttendeeFeild(e);
                          }}
                          value={attendeeData.phone && attendeeData.phone.split("-")[1]}
                        />
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-envelope.svg")} alt="" />
                  {attendeeData.email && (
                    <Input
                      label="E-mail"
                      required
                      name="email"
                      onChange={(e) => {
                        updateAttendeeFeild(e);
                      }}
                      value={attendeeData.email}
                    />
                  )}
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-web.svg")} alt="" />
                  {attendeeData.info && attendeeData.info.website && (
                    <Input
                      label="E-mail"
                      required
                      name="website"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      value={attendeeData.info.website}
                    />
                  )}
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-facebook.svg")} alt="" />
                  {attendeeData.info && attendeeData.info.facebook && (
                    <Input
                      label="E-mail"
                      required
                      name="facebook"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      value={attendeeData.info.facebook}
                    />
                  )}
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-twitter.svg")} alt="" />
                  {attendeeData.info && attendeeData.info.twitter && (
                    <Input
                      label="E-mail"
                      required
                      name="twitter"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      value={attendeeData.info.twitter}
                    />
                  )}
                </div>
                <div className="ebs-contact-row d-flex align-items-center">
                  <img src={require("img/ico-linkedin.svg")} alt="" />
                  {attendeeData.info && attendeeData.info.linkedin && (
                    <Input
                      label="E-mail"
                      required
                      name="linkedin"
                      onChange={(e) => {
                        updateAttendeeInfoFeild(e);
                      }}
                      value={attendeeData.info.linkedin}
                    />
                  )}
                </div>
              </div>
              {attendeeData.gdpr !== undefined && (
                <div className="radio-check-field ebs-radio-lg field-terms-services">
                  <label>
                    <input
                      type="checkbox"
                      name="gdpr"
                      value={attendeeData.gdpr}
                      onChange={(e) =>
                        updateSelect({ name: "gdpr", item: !attendeeData.gdpr })
                      }
                      checked={attendeeData.gdpr}
                    />
                    <span>
                      I agree to the <mark>GDPR Terms of Service</mark>
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-button">
          <input className="btn btn-save-next btn-loader" type="submit" value="Update" />
          {
            loading && attendee !== null && "updating..."
          }

          </div>
        </form>
      </div>
    </div>
  );
};
