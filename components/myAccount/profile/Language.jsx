import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { eventSelector } from "store/Slices/EventSlice";
import { fetchProfileData, profileSelector } from 'store/Slices/myAccount/profileSlice';

const Language = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
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

  const languages = event.switcher.map(switcherItem => switcherItem.language);
  const eventDetails = event.switcher.map(switcherItem => switcherItem.to_event_details);
  const selectedLanguageIndex = event.switcher.findIndex(switcherItem => event.id === switcherItem.to_event);
  const currentSelectedLanguage = selectedLanguage || languages[selectedLanguageIndex];

  const filteredLanguages = languages.filter(language => language.id !== currentSelectedLanguage?.id);
  const handleLanguageClick = (language, url) => {
    setSelectedLanguage(language);
    if (url) {
      router.push(url).then(() => {
      window.location.reload();
    });
    }
  };

  return (
    <React.Fragment>
      {languages.length > 1 && (
      <div className="ebs-profile-top-area">
        <div onClick={handleClick} className="ebs-sideber-icond">
          <div style={{ cursor: 'pointer' }} className="d-flex align-items-center border rounded-1 py-1 px-2">
            <span className="d-block position-relative d-flex align-items-center">
              <img
                className="ebs-image-solid"
                width="16"
                src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_eventsite_assets/language_switcher/${currentSelectedLanguage?.name.toLowerCase()}.jpg`}
                alt={currentSelectedLanguage?.name}
              />
              <span className="ms-2 me-3" style={{ fontSize: 12 }}>
                {currentSelectedLanguage?.name}
              </span>
            </span>
            <i style={{ fontSize: 16 }} className="material-icons ml-2">
              {toggleMenu ? "expand_less" : "expand_more"}
            </i>
          </div>
        </div>

        {toggleMenu && (
          <ul style={{ minWidth: 180 }} className={`dropdown-menu mt-2 end-0 start-auto ${toggleMenu ? "show" : ""}`} aria-labelledby="languageDropdown">
            {filteredLanguages.map((language, index) => (
              <li key={language.id}>
                <a
                  className={`dropdown-item py-1 lh-base px-3 ${currentSelectedLanguage?.id === language.id ? "selected" : ""}`}
                  onClick={() => handleLanguageClick(language, eventDetails[index]?.url)}
                >
                  <img
                    className="ebs-image-solid"
                    width="21"
                    src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_eventsite_assets/language_switcher/${language?.name.toLowerCase()}.jpg`}
                    alt={language?.name}
                  />
                  <span className="ms-2" style={{ fontSize: 12 }}>{language?.name}</span>
                </a>
              </li>
            ))}
           
          </ul>
        )}
      </div>
         )}
    </React.Fragment>
  );
};

export default Language;
