import React, { useEffect } from 'react';
import ActiveLink from "components/atoms/ActiveLink";
import { fetchProfileData, profileSelector } from 'store/Slices/myAccount/profileSlice';
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from 'components/ui-components/PageLoader';
import moment from 'moment';
import Image from 'next/image'

const MyProfile = () => {

  const { event } = useSelector(eventSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData(event.id, event.url));
  }, [])

  const { attendee, labels, settings } = useSelector(profileSelector);

  return (
    attendee ? (
      <div className="edgtf-container ebs-my-profile-area pb-5">
        <div className="edgtf-container-inner container">
          <div className="ebs-header">
            <h2>My profile</h2>
            <ActiveLink className='btn-link' href={`/${event.url}/profile/edit`}>Edit profile</ActiveLink>
          </div>
          <div className="ebs-my-account-container">
            <div className="ebs-my-profile-section">
              <div className="row d-flex">
                <div className="col-lg-3">
                  <div className="ebs-my-profile-left">
                    <div className="ebs-my-profile-image">
                      {settings?.profile_picture?.status === 1 && attendee.image && attendee.image !== "" ? (
                        <div className="ebs-image-wrapper-profile">
                          <img className="ebs-image-solid" src={
                            process.env.NEXT_APP_EVENTCENTER_URL +
                            "/assets/attendees/" +
                            attendee.image
                          } alt="" />
                        </div>
                      ) : (
                        <div className="ebs-image-wrapper-profile">
                          <Image objectFit='contain' layout="fill" className="ebs-image-solid" src={
                            require("public/img/square.jpg")
                          } alt="" />
                        </div>
                      )}
                      <div className="ebs-my-profile-detail">
                        <div className="ebs-profile-name">
                          {(attendee.info && attendee.info.initial) && attendee.info.initial}
                          {attendee.first_name && attendee.first_name}
                          {attendee.last_name && attendee.last_name}
                        </div>
                        {(attendee.info && attendee.info.registration_type) && <div className="ebs-profile-status">{attendee.info.registration_type}</div>}
                        {(attendee.info && attendee.info.about) && <div className="ebs-profile-message">
                          {attendee.info.about}
                        </div>}
                      </div>
                    </div>
                    <div className="ebs-profile-social-media">
                      <div className="ebs-profile-media-icons">
                        {(attendee.info && attendee.info.facebook) && <a href={`${attendee.info.facebook_protocol}${attendee.info.facebook}`}><Image src={require('public/img/ico-facebook.svg')} alt="" /></a>}
                        {(attendee.info && attendee.info.twitter) && <a href={`${attendee.info.twitter_protocol}${attendee.info.twitter}`}><Image src={require('public/img/ico-twitter.svg')} alt="" /></a>}
                        {(attendee.info && attendee.info.linkedin) && <a href={`${attendee.info.linkedin_protocol}${attendee.info.linkedin}`}><Image src={require('public/img/ico-linkedin.svg')} alt="" /></a>}
                      </div>
                      <div className="ebs-profile-social-links">
                        {attendee.phone && <div className="ebs-profile-social-links-row">
                          <strong>{labels?.phone}:</strong>
                          <span>{attendee.phone}</span>
                        </div>
                        }
                        {attendee.email && <div className="ebs-profile-social-links-row">
                          <strong>{labels?.email}:</strong>
                          <span>{attendee.email}</span>
                        </div>}
                        {(attendee.info && attendee.info.website) && <div className="ebs-profile-social-links-row">
                          <strong>Website:</strong>
                          <span><a target='_blank' rel="noreferrer" href={`${attendee.info.website_protocol}${attendee.info.website}`}>{`${attendee.info.website_protocol}${attendee.info.website}`}</a></span>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="ebs-my-profile-right">
                    <h3 className="ebs-title">Basic Information:</h3>
                    <div className="row d-flex">
                      <div className="col-sm-6">
                        <div className="ebs-profile-information">
                          {(attendee.info && attendee.info.age) && <div className="ebs-info-row">
                            <strong>{labels?.age}:</strong>
                            <span>{attendee.info.age} years</span>
                          </div>}
                          {(attendee.info && attendee.info.gender) && <div className="ebs-info-row">
                            <strong>{labels?.gender}:</strong>
                            <span>{attendee.info.gender}</span>
                          </div>}
                          {attendee.FIRST_NAME_PASSPORT && <div className="ebs-info-row">
                            <strong>{labels?.FIRST_NAME_PASSPORT}:</strong>
                            <span>{attendee.FIRST_NAME_PASSPORT}</span>
                          </div>}
                          {(attendee.info && attendee.info.date_of_issue_passport) && <div className="ebs-info-row">
                            <strong>{labels?.date_of_issue_passport}:</strong>
                            <span>{moment(attendee.info.date_of_issue_passport).format('D MMMM YYYY')}</span>
                          </div>}
                          {(attendee.info && attendee.info.passport_no) && <div className="ebs-info-row">
                            <strong>{labels?.passport_no}:</strong>
                            <span>{attendee.info.passport_no}</span>
                          </div>}
                          {(attendee.info && attendee.info.company_name) && <div className="ebs-info-row">
                            <strong>{labels?.company_name}:</strong>
                            <span>{attendee.info.company_name}</span>
                          </div>}
                          {(attendee.info && attendee.info.title) && <div className="ebs-info-row">
                            <strong>{labels?.title}:</strong>
                            <span>{attendee.info.title}</span>
                          </div>}
                          {attendee.EMPLOYMENT_DATE && attendee.EMPLOYMENT_DATE !== "0000-00-00" && <div className="ebs-info-row">
                            <strong>{labels?.EMPLOYMENT_DATE}:</strong>
                            <span>{moment(attendee.EMPLOYMENT_DATE).format('D MMMM YYYY')}</span>
                          </div>}
                          {attendee.countryName && <div className="ebs-info-row">
                            <strong>{labels?.countryName}:</strong>
                            <span>{attendee.countryName}</span>
                          </div>}
                          {(attendee.info && attendee.info.interests) && <div className="ebs-info-row">
                            <strong>{labels?.interests}:</strong>
                            <span>{attendee.info.interests}</span>
                          </div>}
                          {(attendee.info && attendee.info.delegate_number) && <div className="ebs-info-row">
                            <strong>{labels?.delegate}:</strong>
                            <span>{attendee.info.delegate_number}</span>
                          </div>}
                          {(attendee.info && attendee.info.private_street) && <div className="ebs-info-row">
                            <strong>{labels?.private_street}:</strong>
                            <span>{attendee.info.private_street}</span>
                          </div>}
                          {(attendee.info && attendee.info.private_house_number) && <div className="ebs-info-row">
                            <strong>{labels?.private_house_number}:</strong>
                            <span>{attendee.info.private_house_number}</span>
                          </div>}
                          {(attendee.info && attendee.info.private_post_code) && <div className="ebs-info-row">
                            <strong>{labels?.private_post_code}:</strong>
                            <span>{attendee.info.private_post_code}</span>
                          </div>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="ebs-profile-information">
                          {attendee.BIRTHDAY_YEAR && attendee.BIRTHDAY_YEAR !== '0000-00-00 00:00:00' && <div className="ebs-info-row">
                            <strong>{labels?.BIRTHDAY_YEAR}:</strong>
                            <span>{moment(attendee.BIRTHDAY_YEAR).format('D MMMM YYYY')}</span>
                          </div>}
                          {(attendee.info && attendee.info.place_of_birth) && <div className="ebs-info-row">
                            <strong>{labels?.place_of_birth}:</strong>
                            <span>{attendee.info.place_of_birth}</span>
                          </div>}
                          {attendee.LAST_NAME_PASSPORT && <div className="ebs-info-row">
                            <strong>{labels?.LAST_NAME_PASSPORT}:</strong>
                            <span>{attendee.LAST_NAME_PASSPORT}</span>
                          </div>}
                          {(attendee.info && attendee.info.date_of_expiry_passport) && <div className="ebs-info-row">
                            <strong>{labels?.date_of_expiry_passport}:</strong>
                            <span>{moment(attendee.info.date_of_expiry_passport).format('D MMMM YYYY')}</span>
                          </div>}
                          {attendee.SPOKEN_LANGUAGE && <div className="ebs-info-row">
                            <strong>{labels?.SPOKEN_LANGUAGE} :</strong>
                            <span>{attendee.SPOKEN_LANGUAGE}</span>
                          </div>}
                          {(attendee.info && attendee.info.organization) && <div className="ebs-info-row">
                            <strong>{labels?.organization}:</strong>
                            <span>{attendee.info.organization}</span>
                          </div>}
                          {(attendee.info && attendee.info.department) && <div className="ebs-info-row">
                            <strong>{labels?.department}:</strong>
                            <span>{attendee.info.department}</span>
                          </div>}
                          {(attendee.info && attendee.info.industry) && <div className="ebs-info-row">
                            <strong>{labels?.industry}:</strong>
                            <span>{attendee.info.industry}</span>
                          </div>}
                          {(attendee.info && attendee.info.jobs) && <div className="ebs-info-row">
                            <strong>{labels?.jobs}:</strong>
                            <span>{attendee.info.jobs}</span>
                          </div>}
                          {(attendee.info && attendee.info.network_group) && <div className="ebs-info-row">
                            <strong>{labels?.network_group}:</strong>
                            <span>{attendee.info.network_group}</span>
                          </div>}
                          {(attendee.info && attendee.info.table_number) && <div className="ebs-info-row">
                            <strong>{labels?.table_number}:</strong>
                            <span>{attendee.info.table_number}</span>
                          </div>}
                          {(attendee.info && attendee.info.private_city) && <div className="ebs-info-row">
                            <strong>{labels?.private_city}:</strong>
                            <span>{attendee.info.private_city}</span>
                          </div>}
                          {(attendee.info && attendee.info.private_country) && <div className="ebs-info-row">
                            <strong>{labels?.private_country}:</strong>
                            <span>{attendee.info.private_country}</span>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
      : <PageLoader />


  )
}

export default MyProfile;