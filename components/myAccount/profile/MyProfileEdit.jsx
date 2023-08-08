import React, { useEffect, useState, useRef } from "react";
import Input from "components/forms/Input";
import TextArea from "components/forms/TextArea";
import DateTime from "components/forms/DateTime";
import DropDown from "components/forms/DropDown";
import Select from "react-select";
import Image from 'next/image'
import {
  fetchProfileData,
  profileSelector,
  updateProfileData,
  cleanRedirect
} from "store/Slices/myAccount/profileSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import PageLoader from "components/ui-components/PageLoader";
import { useRouter } from 'next/router';

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
    dispatch(fetchProfileData(event.id, event.url, 1));
  }, []);

  const { attendee, languages, callingCodes, countries, loading, alert, error, settings, labels, redirect, customFields } =
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
        labels={labels}
        redirect={redirect}
        customFields={customFields}
      />) : <PageLoader />

  );
};

export default MyProfileEdit;

const ProfileEditForm = ({ attendee, languages, callingCodes, countries, event, loading, alert, error, settings, labels, redirect, customFields }) => {

  const dispatch = useDispatch();

  const [attendeeData, setAttendeeData] = useState(attendee);

  const [customFieldData, setCustomFieldData] = useState(customFields.reduce((ack1, question, i)=>{
       let answers = attendee.info[`custom_field_id${question.event_id}`].split(',').reduce((ack2, id, i)=>{ 
          let is_answer = question.children_recursive.find((answer)=>(answer.id == id));
          if(is_answer !== undefined){
            ack2.push({
              label: is_answer.name,
              value: is_answer.id,
            });
          }
          return ack2;
        }, []);
        ack1[`custom_field_id_q${i}`] = question.allow_multiple === 1 ? answers : answers[0];
        return ack1;
    }, {}));

  const userInfo = localStorage.getItem(`event${event.id}User`);

  const isAuthenticated = userInfo !== undefined && userInfo !== null ? JSON.parse(userInfo) : {};

  const router = useRouter();

  const mounted = useRef(false);

  const inputFileRef = React.useRef();

  const inputresumeFileRef = React.useRef();

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

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
      info: {
        ...attendeeData.info,
        private_country: countries.reduce((ack, item) => { if (item.id == attendeeData.info.private_country) { return { label: item.name, value: item.id } } return ack; }, {}),
      },
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
  
  const updateCustomFieldSelect = (obj) => {
    setCustomFieldData({
      ...customFieldData,
      [obj.name]: obj.item,
    });
  };

  const updateAttendee = (e) => {
    e.preventDefault();

    let attendeeObj = {
      phone: `${attendeeData?.calling_code?.value}-${attendeeData?.phone}`,
    };

    let custom_field_id = customFields.reduce((ack, question, i)=>{
      if(customFieldData[`custom_field_id_q${i}`] !== undefined){
         let ids =question.allow_multiple === 1 ? customFieldData[`custom_field_id_q${i}`].map((ans)=>(ans.value)).join(',') + "," : customFieldData[`custom_field_id_q${i}`].value +',';
          ack += ids;
      }
      return ack;
    }, '');

    let infoObj = {
      ...attendeeData.info,
      country: attendeeData?.country ? attendeeData?.country?.value : attendeeData?.info?.country,
      private_country: attendeeData?.info?.private_country?.value,
      
    }

    infoObj[`custom_field_id${event.id}`] = custom_field_id;

    console.log(infoObj)

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
    if (attendeeData.file) attendeeObj.file = attendeeData.file;
    if (attendeeData.attendee_cv) attendeeObj.att_cv = attendeeData.attendee_cv;
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

  useEffect(() => {
    dispatch(cleanRedirect(''))
    if (redirect !== '' && redirect !== null && mounted.current) {
      setTimeout(() => {
        router.push(`/${event.url}/profile`);
      }, 1000)
    }
  }, [redirect])

  return (
    <div className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner container">
        <div className="ebs-header">
          <h2>Edit profile</h2>
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
                  label={labels?.initial}
                  name="initial"
                  readOnly={settings?.initial?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.initial}
                />
              )}
              <Input
                label={labels?.first_name}
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
                label={labels?.last_name}
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
                  label={labels?.about}
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
                  label={labels?.age}
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
                  <h5>{labels?.gender}</h5>
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
                  label={labels?.BIRTHDAY_YEAR}
                  required={true}
                  readOnly={settings?.birth_date?.is_editable === 1 ? false : true}
                  onChange={(item) => {
                    updateDate({ item, name: "BIRTHDAY_YEAR" });
                  }}
                  value={moment(attendeeData.BIRTHDAY_YEAR).format('YYYY-MM-DD')}
                  showdate={"YYYY-MM-DD"}
                />
              )}
              {settings?.FIRST_NAME_PASSPORT?.status === 1 && (
                <Input
                  label={labels?.initial}
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
                  label={labels?.LAST_NAME_PASSPORT}
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
                  label={labels?.place_of_birth}
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
                  label={labels?.passport_no}
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
                  label={labels?.date_of_issue_passport}
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
                  label={labels?.date_of_expiry_passport}
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
                  label={labels?.SPOKEN_LANGUAGE}
                  listitems={languages}
                  required={false}
                  isDisabled={settings?.spoken_languages?.is_editable === 1 ? false : true}
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
                <div className="ebs-profile-image" onClick={() => {
                  inputFileRef.current.click();
                }}>
                  <label>
                    {((attendeeData && attendeeData?.image && attendeeData?.image !== "") || attendeeData?.blob_image !== undefined) ? (
                      <img src={`${attendeeData?.blob_image !== undefined ? attendeeData?.blob_image : process.env.NEXT_APP_EVENTCENTER_URL +
                        "/assets/attendees/" +
                        attendeeData?.image}`} alt="" />
                    ) : (
                      <img src="https://via.placeholder.com/155.png" alt="" />
                    )}
                    {settings?.profile_picture?.is_editable === 1 && (
                      <>
                        <span>Uplaod Photo</span>
                      </>
                    )}
                  </label>
                  {settings?.profile_picture?.is_editable === 1 && (
                    <input type="file" style={{ display: 'none' }} ref={inputFileRef} onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setAttendeeData({
                          ...attendeeData,
                          file: e.target.files[0],
                          blob_image: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }} />
                  )}
                </div>
              )}
              {settings?.resume?.status === 1 && (
                <div className="ebs-profile-image" >
                  <label>
                    {((attendeeData && attendeeData?.attendee_cv && attendeeData?.attendee_cv !== "")) ? (
                      <>
                        {(typeof attendeeData.attendee_cv === 'string')  ? <a class="attendee_cv_link" href={process.env.NEXT_APP_EVENTCENTER_URL + '/event/' + event.url +'/settings/downloadResume/' + attendeeData?.attendee_cv}>
                          <img style={{borderRadius:0}} src={`${process.env.NEXT_APP_EVENTCENTER_URL +
                            '/_admin_assets/images/pdf512.png'}`} alt="" />
                        </a> : <img style={{borderRadius:0}} src={`${process.env.NEXT_APP_EVENTCENTER_URL +
                            '/_admin_assets/images/pdf512.png'}`} alt="" />
                        }
                      </>
                    ) : (
                      <img src="https://via.placeholder.com/155.png" alt="" />
                    )}
                    {settings?.resume?.is_editable === 1 && (
                      <>
                        <span onClick={() => {
                          inputresumeFileRef.current.click();
                        }}>
                          Uplaod Resume
                        </span>
                      </>
                    )}
                  </label>
                  {settings?.resume?.is_editable === 1 && (
                    <input type="file" style={{ display: 'none' }} ref={inputresumeFileRef} onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setAttendeeData({
                          ...attendeeData,
                          attendee_cv: e.target.files[0],
                        });
                      }
                    }} />
                  )}
                </div>
              )}
              <h3 className="ebs-title">Professional Information:</h3>
              {settings?.company_name?.status === 1 && (
                <Input
                  label={labels?.company_name}
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
                  label={labels?.title}
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
                  label={labels?.organization}
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
                  label={labels?.EMPLOYMENT_DATE}
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
                  label={labels?.department}
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
                  placeholder={labels?.country}
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
                  label={labels?.industry}
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
                  label={labels?.jobs}
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
                  label={labels?.interests}
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
                  label={labels?.network_group}
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
                  label={labels?.delegate}
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
                  label={labels?.table_number}
                  name="table_number"
                  readOnly={settings?.table_number?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.table_number}
                />
              )}
              {(settings?.pa_street?.status === 1 || settings?.pa_house_no?.status === 1 || settings?.pa_post_code?.status === 1 || settings?.pa_post_code?.status === 1 || settings?.pa_city?.status === 1) && (
                <h3 style={{ marginTop: 40 }} className="ebs-title">
                  Address:
                </h3>
              )}
              {settings?.pa_street?.status === 1 && (
                <>
                  <Input
                    label={labels?.private_street}
                    name="private_street"
                    readOnly={settings?.pa_street?.is_editable === 1 ? false : true}
                    onChange={(e) => {
                      updateAttendeeInfoFeild(e);
                    }}
                    value={attendeeData.info.private_street}
                  />
                </>
              )}
              {settings?.pa_house_no?.status === 1 && (
                <Input
                  label={labels?.private_house_number}
                  name="private_house_number"
                  readOnly={settings?.pa_house_no?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_house_number}
                />
              )}
              {settings?.pa_post_code?.status === 1 && (
                <Input
                  label={labels?.private_post_code}
                  name="private_post_code"
                  readOnly={settings?.pa_post_code?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_post_code}
                />
              )}
              {settings?.pa_city?.status === 1 && (
                <Input
                  label={labels?.private_city}
                  name="private_city"
                  readOnly={settings?.pa_city?.is_editable === 1 ? false : true}
                  onChange={(e) => {
                    updateAttendeeInfoFeild(e);
                  }}
                  value={attendeeData.info.private_city}
                />
              )}
              {settings?.pa_country?.status === 1 && (
                <Select
                  styles={Selectstyles2}
                  isDisabled={settings?.pa_country?.is_editable === 1 ? false : true}
                  placeholder={labels?.private_country}
                  components={{ IndicatorSeparator: null }}
                  options={countries.map((item, index) => {
                    return {
                      label: item.name,
                      value: item.id,
                      key: index,
                    };
                  })}
                  value={attendeeData?.info?.private_country}
                  onChange={(item) => {
                    updateInfoSelect({ item, name: "private_country" });
                  }}
                />
              )}
              {settings?.show_custom_field?.status === 1 && (
                  customFields.map((question, i)=>(
                    <>
                    <Select
                      styles={Selectstyles2}
                      isDisabled={settings?.show_custom_field?.is_editable === 1 ? false : true}
                      placeholder={question.name}
                      components={{ IndicatorSeparator: null }}
                      options={question.children_recursive.map((item, index) => {
                        return {
                          label: item.name,
                          value: item.id,
                          key: index,
                        };
                      })}
                      value={customFieldData[`custom_field_id_q${i}`] !== undefined ? customFieldData[`custom_field_id_q${i}`] : null}
                      isMulti={question.allow_multiple === 1 ? true : 0}
                      onChange={(item) => {
                        console.log(item);
                        updateCustomFieldSelect({ item, name: `custom_field_id_q${i}` });
                      }}
                    />
                    </>
                  ))
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
                          label={labels?.phone}
                          name="phone"
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
                      label={labels?.email}
                      required
                      name="email"
                      readOnly={true}
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
                    label="Facebook"
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
                    label="Twitter"
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
                    label="Linkedin"
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
