import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { eventSelector } from "store/Slices/EventSlice";
import { fetchProfileData, profileSelector } from 'store/Slices/myAccount/profileSlice';

const Language = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { event } = useSelector(eventSelector);
  const { attendee, settings } = useSelector(profileSelector);

  const handleClick = () => {
    setToggleMenu(prevState => !prevState);
  };

  useEffect(() => {
    if (event.id && event.url) {
      dispatch(fetchProfileData(event.id, event.url, 0));
    }
  }, [dispatch, event.id, event.url]);

  // Extract unique languages and event details from the switcher array
  const languages = event.switcher.map(switcherItem => switcherItem.language);
  const eventDetails = event.switcher.map(switcherItem => switcherItem.to_event_details);
  const from_event_detail = event.switcher.map(switcherItem => switcherItem.from_event_details);

  const handleLanguageClick = (url) => {
    console.log(url,'in event')
    router.push(url);
  };

  return (
    <React.Fragment>
      <div className="ebs-profile-top-area">
        <div onClick={handleClick} className="ebs-sideber-icon">
          <div className="d-flex align-items-center">
            <span className="d-block position-relative" style={{ width: 26, height: 26 }}>
              {settings?.profile_picture?.status === 1 && attendee?.image ? (
                <img className="ebs-image-solid" width="26" src={
                  `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/attendees/${attendee?.image}`
                } alt="" />
              ) : (
                <Image objectFit="contain" width="26" layout="fill" className="ebs-image-solid" src={
                  require("public/img/square.jpg")
                } alt="" />
              )}
            </span>
            <i style={{ fontSize: 16 }} className="material-icons ml-2">
              {toggleMenu ? "expand_less" : "expand_more"}
            </i>
          </div>
        </div>

        {toggleMenu && (
          <ul className={`dropdown-menu ${toggleMenu ? "show" : ""}`} aria-labelledby="languageDropdown">
            {languages.map((language, index) => (
              <li key={language.id}>
                {console.log(eventDetails[index][0],'innn')}
                <a 
                
                  className="dropdown-item p-2 ps-2" 
                  onClick={() => handleLanguageClick(eventDetails[index]?.url)}
                >
                   <img 
                  key={index} 
                  className="ebs-image-solid" 
                  width="26" 
                  src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_eventsite_assets/language_switcher/${language?.name.toLowerCase()}.jpg`} 
                  alt={language?.name} 
                />
                  {language.name}
                </a>
              </li>
            ))}
            <li >
              
                <a 
                  className="dropdown-item p-2" 
                  onClick={() => handleLanguageClick(from_event_detail?.[0]?.url)}
                >
                   <img 
                  className="ebs-image-solid" 
                  width="26" 
                  src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_eventsite_assets/language_switcher/${languages[0]?.name.toLowerCase()}.jpg`} 
                  alt={languages[0]?.name} 
                />
                  {event.language.name}
                </a>
              </li>
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

export default Language;
