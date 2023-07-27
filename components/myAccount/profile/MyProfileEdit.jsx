import React, { useEffect, useState } from "react";
import Input from "components/forms/Input";
import TextArea from "components/forms/TextArea";
import DateTime from "components/forms/DateTime";
import DropDown from "components/forms/DropDown";
import Select from "react-select";
import Image from 'next/image'
import {
  fetchProfileData,
  profileSelector,
  updateProfileData
} from "store/Slices/myAccount/profileSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import PageLoader from "components/ui-components/PageLoader";

const Selectstyles = {
  control: base => ({
    ...base,
    height: 38,
    minHeight: 38,
    backgroundColor: 'transparent',
    border: 'none',
    width: '90%',
    maxWidth: '90%',
    marginTop: 6,
    marginLeft: 3,
    "&:focus": {
      borderColor: "red"
    }
  })
};
const Selectstyles2 = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
    width: '100%',
    maxWidth: '100%',
    marginBottom: 10,

  })
};

const MyProfileEdit = () => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData(event.id, event.url));
  }, []);

  const { attendee, languages, callingCodes, countries, loading, alert, error, settings } =
    useSelector(profileSelector);

  return (
    attendee ? (
      <ProfileEditForm
        attendee={attendee}
        languages={languages}
        callingCodes={callingCodes}
        countries={countries}
        event={event}
        loading={loading}
        alert={alert}
        error={error}
        settings={settings}
      />) : <PageLoader />

  );
};

export default MyProfileEdit;

const ProfileEditForm = ({ attendee, languages, callingCodes, countries, event, loading, alert, error, settings }) => {

  const dispatch = useDispatch();

  const [attendeeData, setAttendeeData] = useState(attendee);

  useEffect(() => {
    setAttendeeData({
      ...attendeeData,
      SPOKEN_LANGUAGE: languages
        .filter(
          (item) =>
            attendeeData.SPOKEN_LANGUAGE && attendeeData.SPOKEN_LANGUAGE.length > 0 && attendeeData.SPOKEN_LANGUAGE.split(",").indexOf(item.name) !== -1
        )
        .map((item, index) => ({
          label: item.name,
          value: item.id,
          key: index,
        })),
      calling_code: {
        label: attendeeData.phone && attendeeData.phone.split("-")[0],
        value: attendeeData.phone && attendeeData.phone.split("-")[0],
      },
      phone: attendeeData.phone && attendeeData.phone.split("-")[1],
      gdpr: attendeeData.phone && attendeeData.current_event_attendee.gdpr,
      country: countries.reduce((ack, item) => { if (item.id == attendeeData.info.country) { return { label: item.name, value: item.id } } return ack; }, {}),
    });
  }, []);

  const updateAttendeeFeild = (e) => {
    const { name, value } = e.currentTarget;
    setAttendeeData({
      ...attendeeData,
      [name]: value,
    });
  };

  const updateAttendeeInfoFeild = (e) => {
    const { name, value } = e.currentTarget;
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
      [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format("YYYY-MM-DD") : obj.item,
    });

  };

  const updateInfoDate = (obj) => {
    setAttendeeData({
      ...attendeeData,
      info: {
        ...attendeeData.info,
        [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format("YYYY-MM-DD") : obj.item,
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
      phone: `${attendeeData.calling_code.value}-${attendeeData.phone}`,
    };

    let infoObj = {
      ...attendeeData.info,
      country: attendeeData.country ? attendeeData.country.value : attendeeData.info.country,
    }

    let settings = {
      gdpr: attendeeData.gdpr
    }


    if (attendeeData.email) attendeeObj.email = attendeeData.email;
    if (attendeeData.first_name) attendeeObj.first_name = attendeeData.first_name;
    if (attendeeData.last_name) attendeeObj.last_name = attendeeData.last_name;
    if (attendeeData.FIRST_NAME_PASSPORT) attendeeObj.FIRST_NAME_PASSPORT = attendeeData.FIRST_NAME_PASSPORT;
    if (attendeeData.LAST_NAME_PASSPORT) attendeeObj.LAST_NAME_PASSPORT = attendeeData.LAST_NAME_PASSPORT;
    if (attendeeData.BIRTHDAY_YEAR) attendeeObj.BIRTHDAY_YEAR = attendeeData.BIRTHDAY_YEAR;
    if (attendeeData.EMPLOYMENT_DATE) attendeeObj.EMPLOYMENT_DATE = attendeeData.EMPLOYMENT_DATE;
    if (attendeeData.image) attendeeObj.image = attendeeData.image;
    if (attendeeData.SPOKEN_LANGUAGE) attendeeObj.SPOKEN_LANGUAGE = attendeeData.SPOKEN_LANGUAGE.reduce((ack, item, index) => {
      if (index !== attendeeData.SPOKEN_LANGUAGE.length - 1) {
        return ack += `${item.label},`
      }
      return ack += `${item.label}`
    }, "");

    const data = {
      attendeeObj,
      settings,
      infoObj
    };
    dispatch(updateProfileData(event.id, event.url, data));
  };

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header">
          <h2>Edit profile</h2>
          <span className='btn-link'>Save Changes</span>
        </div>
        <form onSubmit={(e) => updateAttendee(e)}>
          <div
            style={{ background: "transparent" }}
            className="ebs-my-account-container"
          >
            <div className="ebs-edit-profile-section">
              <h3 className="ebs-title">Basic Information:</h3>
              {settings?.initial?.status === 1 && (
                <Input
                  label="Initial"
                  name="initial"
                  readOnly={settings?.initial?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.initial}
                />
              )}
              <Input
                label="First name"
                placeholder="First name"
                name="first_name"
                required={true}
                readOnly={settings?.first_name?.is_editable === 1 ? false : true}
                onChange={(e) => {
                  updateAttendeeFeild(e);
                }}
                value={attendeeData.first_name}
              />
              <Input
                label="Last Name"
                name="last_name"
                readOnly={settings?.last_name?.is_editable === 1 ? false : true}
                onChange={(e) => {
                  updateAttendeeFeild(e);
                }}
                placeholder="Last name"
                value={attendeeData.last_name}
              />
              {settings?.bio_info?.status === 1 && (
                <TextArea
                  label="About"
                  name="about"
                  readOnly={settings?.bio_info?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  placeholder="about"
                  value={attendeeData.info.about}
                />
              )}
              {settings?.age?.status === 1 && (
                <Input
                  label="Age"
                  name="age"
                  readOnly={settings?.age?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.age}
                />
              )}
              {settings?.gender?.status === 1 && (
                <div className="inline radio-check-field style-radio radio-feild">
                  <h5>Gender</h5>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        if (settings?.gender?.is_editable === 1) {
                          updateAttendeeInfoFeild(e);
                        }
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
                        if (settings?.gender?.is_editable === 1) {
                          updateAttendeeInfoFeild(e);
                        }
                      }}
                      checked={attendeeData.info.gender === "female"}
                    />
                    <span>Female</span>
                  </label>
                </div>
              )}
              {settings?.birth_date?.status === 1 && (
                <DateTime
                  label={"Birth date"}
                  required={true}
                  readOnly={settings?.birth_date?.is_editable === 1 ? false : true}
                  onChange={(item) => {
                    updateDate({ item, name: "BIRTHDAY_YEAR" });
                  }}
                  value={moment(attendeeData.BIRTHDAY_YEAR).format('YYYY-MM-DD')}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {settings?.first_name_passport?.status === 1 && (
                <Input
                  label="First name (Passport)"
                  name="FIRST_NAME_PASSPORT"
                  readOnly={settings?.first_name_passport?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  value={attendeeData.FIRST_NAME_PASSPORT}
                />
              )}
              {settings?.last_name_passport?.status === 1 && (
                <Input
                  label="Last name (Passport)"
                  name="LAST_NAME_PASSPORT"
                  readOnly={settings?.last_name_passport?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeFeild(e);
                  }}
                  value={attendeeData.LAST_NAME_PASSPORT}
                />
              )}
              {settings?.place_of_birth?.status === 1 && (
                <Input
                  label="Place of birth (Passport)"
                  readOnly={settings?.place_of_birth?.is_editable === 1 ? false : true}
                  name="place_of_birth"
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.place_of_birth}
                />
              )}
              {settings?.passport_no?.status === 1 && (
                <Input
                  label="Passport no"
                  name="passport_no"
                  readOnly={settings?.passport_no?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.passport_no}
                />
              )}
              {settings?.date_of_issue_passport?.status === 1 && (
                <DateTime
                  label={"Date of issue (Passport)"}
                  readOnly={settings?.date_of_issue_passport?.is_editable === 1 ? false : true}
                  required={true}
                  onChange={(item) => {
                    updateInfoDate({ item, name: "date_of_issue_passport" });
                  }}
                  value={moment(attendeeData.info.date_of_issue_passport).format('YYYY-MM-DD')}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {settings?.date_of_expiry_passport?.status === 1 && (
                <DateTime
                  label={"Date of expiry (Passport)"}
                  readOnly={settings?.date_of_expiry_passport?.is_editable === 1 ? false : true}
                  required={true}
                  onChange={(item) => {
                    updateInfoDate({ item, name: "date_of_expiry_passport" });
                  }}
                  value={
                    moment(attendeeData.info.date_of_expiry_passport).format('YYYY-MM-DD')
                  }
                  showdate={"YYYY-MM-DD"}
                />
              )}

              {settings?.spoken_languages?.status === 1 && (
                <DropDown
                  label="Spoken languages"
                  listitems={languages}
                  required={false}
                  isDisabled={settings?.date_of_expiry_passport?.is_editable === 1 ? false : true}
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
              {settings?.profile_picture?.status === 1 && (
                <div className="ebs-profile-image">
                  <label>
                    <img src="https://via.placeholder.com/155.png" alt="" />
                    {settings?.profile_picture?.is_editable === 1 && (
                      <>
                        <span>Uplaod Photo</span>
                        <input type="file" />
                      </>
                    )}
                  </label>
                </div>
              )}
              <h3 className="ebs-title">Professional Information:</h3>
              {settings?.company_name?.status === 1 && (
                <Input
                  label="Company name"
                  name="company_name"
                  readOnly={settings?.company_name?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.company_name}
                />
              )}
              {settings?.title?.status === 1 && (
                <Input
                  label="Title"
                  name="title"
                  readOnly={settings?.title?.is_editable === 1 ? false : true}
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
              {settings?.organization?.status === 1 && (
                <Input
                  label="Organization"
                  name="organization"
                  readOnly={settings?.organization?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.organization}
                />
              )}
              {settings?.employment_date?.status === 1 && (
                <DateTime
                  label={"Employment date"}
                  readOnly={settings?.employment_date?.is_editable === 1 ? false : true}
                  required={true}
                  onChange={(item) => {
                    updateDate({ item, name: "EMPLOYMENT_DATE" });
                  }}
                  value={moment(attendeeData.EMPLOYMENT_DATE).format('YYYY-MM-DD')}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {settings?.department?.status === 1 && (
                <Input
                  label="Department"
                  name="department"
                  readOnly={settings?.department?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.department}
                />
              )}
              {settings?.country?.status === 1 && (
                <Select
                  styles={Selectstyles2}
                  isDisabled={settings?.country?.is_editable === 1 ? false : true}
                  placeholder="Select Country"
                  components={{ IndicatorSeparator: null }}
                  options={countries.map((item, index) => {
                    return {
                      label: item.name,
                      value: item.id,
                      key: index,
                    };
                  })}
                  value={attendeeData.country}
                  onChange={(item) => {
                    updateSelect({ item, name: "country" });
                  }}
                />
              )}
              {settings?.show_industry?.status === 1 && (
                <Input
                  label="Industry"
                  name="industry"
                  readOnly={settings?.show_industry?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.industry}
                />
              )}
              {settings?.show_job_tasks?.status === 1 && (
                <Input
                  label="Job tasks"
                  name="jobs"
                  readOnly={settings?.show_job_tasks?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.jobs}
                />
              )}
              {settings?.interest?.status === 1 && (
                <Input
                  label="Interests"
                  name="interests"
                  readOnly={settings?.interest?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.interests}
                />
              )}
              {settings?.network_group?.status === 1 && (
                <Input
                  label="Network group"
                  name="network_group"
                  readOnly={settings?.network_group?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.network_group}
                />
              )}
              {settings?.delegate_number?.status === 1 && (
                <Input
                  label="Delegate number"
                  name="delegate_number"
                  readOnly={settings?.delegate_number?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.delegate_number}
                />
              )}
              {settings?.table_number?.status === 1 && (
                <Input
                  label="Table number"
                  name="table_number"
                  readOnly={settings?.table_number?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.table_number}
                />
              )}
              {settings?.private_street?.status === 1 && (
                <>
                  <h3 style={{ marginTop: 40 }} className="ebs-title">
                    Address:
                  </h3>
                  <Input
                    label="Street number"
                    name="private_street"
                    readOnly={settings?.private_street?.is_editable === 1 ? false : true}
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.private_street}
                  />
                </>
              )}
              {settings?.private_house_number?.status === 1 && (
                <Input
                  label="House number"
                  name="private_house_number"
                  readOnly={settings?.private_house_number?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_house_number}
                />
              )}
              {settings?.private_post_code?.status === 1 && (
                <Input
                  label="Postal code"
                  name="private_post_code"
                  readOnly={settings?.private_post_code?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_post_code}
                />
              )}
              {settings?.private_city?.status === 1 && (
                <Input
                  label="City"
                  name="private_city"
                  readOnly={settings?.private_city?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_city}
                />
              )}
              {settings?.private_country?.status === 1 && (
                <Input
                  label="Country"
                  name="private_country"
                  readOnly={settings?.private_country?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_country}
                />
              )}
              <div className="ebs-contact-info">
                <h3 className="ebs-title">Contact information:</h3>
                {settings?.phone?.status === 1 &&
                  <div className="ebs-contact-row d-flex">
                    <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}>
                      <Image objectFit='contain' layout="fill" src={require("public/img/ico-phone.svg")} alt="" /></div>
                    <div className="form-phone-field">
                      {attendee.calling_code && (
                        <React.Fragment>
                          <div style={{ minWidth: "108px" }}>
                            <Select
                              styles={Selectstyles}
                              className="w-full h-full"
                              placeholder=".."
                              components={{ IndicatorSeparator: null }}
                              options={callingCodes.map((item, index) => {
                                return {
                                  label: item.name,
                                  value: item.id,
                                  key: index,
                                };
                              })}
                              value={
                                attendeeData.calling_code !== undefined && {
                                  label: attendeeData.calling_code.label,
                                  value: attendeeData.calling_code.value,
                                }
                              }
                              onChange={(item) => {
                                updateSelect({ item, name: "calling_code" });
                              }}
                            />
                          </div>
                        </React.Fragment>
                      )}
                      <div style={{ width: "75%" }}>
                        <Input
                          label="Phone"
                          readOnly={settings?.phone?.is_editable === 1 ? false : true}
                          onChange={(e) => {
                            updateAttendeeFeild(e);
                          }}
                          value={attendeeData.phone}
                        />
                      </div>
                    </div>
                  </div>}
                {settings?.email?.status === 1 && (
                  <div className="ebs-contact-row d-flex">
                    <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}><Image objectFit='contain' layout="fill" src={require("public/img/ico-envelope.svg")} alt="" /></div>
                    <Input
                      label="E-mail"
                      required
                      name="email"
                      onChange={(e) => {
                        updateAttendeeFeild(e);
                      }}
                      value={attendeeData.email}
                    />
                  </div>
                )}
                <div className="ebs-contact-row d-flex">
                  <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}><Image objectFit='contain' layout="fill" src={require("public/img/ico-web.svg")} alt="" /></div>
                  <Input
                    label="Website"
                    required
                    name="website"
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.website}
                  />
                </div>
                <div className="ebs-contact-row d-flex">
                  <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}><Image objectFit='contain' layout="fill" src={require("public/img/ico-facebook.svg")} alt="" /></div>
                  <Input
                    label="E-mail"
                    required
                    name="facebook"
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.facebook}
                  />
                </div>
                <div className="ebs-contact-row d-flex">
                  <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}><Image objectFit='contain' layout="fill" src={require("public/img/ico-twitter.svg")} alt="" /></div>
                  <Input
                    label="E-mail"
                    required
                    name="twitter"
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.twitter}
                  />
                </div>
                <div className="ebs-contact-row d-flex">
                  <div style={{ width: 55, height: 55, position: 'relative', marginRight: 5 }}><Image objectFit='contain' layout="fill" src={require("public/img/ico-linkedin.svg")} alt="" /></div>
                  <Input
                    label="E-mail"
                    required
                    name="linkedin"
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.linkedin}
                  />
                </div>
              </div>
              {attendee.gdpr !== undefined && (
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
