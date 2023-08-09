import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";
import { eventSelector } from "store/Slices/EventSlice";
import { logOut, userSelector, reset } from "store/Slices/myAccount/userSlice";
import Image from 'next/image'
import { useRouter } from 'next/router';
import moment from "moment";
import { fetchProfileData, profileSelector } from 'store/Slices/myAccount/profileSlice';

const MyProfileSidebar = (props) => {

  const [toggleMenu, setstatetoggleMenu] = useState(false);

  const [location, setLocation] = useState(false)

  const dispatch = useDispatch();

  const { event } = useSelector(eventSelector);

  const { loggedout } = useSelector(userSelector);

  const isAuthenticated = JSON.parse(localStorage.getItem(`event${event.id}User`));

  const enable_cancel = isAuthenticated ? JSON.parse(localStorage.getItem(`EI${event.url}EC`)) : false;

  const frame = useRef()

  const router = useRouter();

  const { attendee, settings } = useSelector(profileSelector);

  const cancellationDatePassed = useMemo(() => {
    if (event.eventsiteSettings.cancellation_date === "0000-00-00 00:00:00") {
      return 0;
    }
    let dateToday = moment();
    let cancelationEndDate = moment(`${moment(event.eventsiteSettings.cancellation_date).format("YYYY-MM-DD")} ${event.eventsiteSettings.cancellation_end_time}`);
    let passed = cancelationEndDate.diff(dateToday);
    return passed > 0 ? 0 : 1;
  }, [event]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    }
  }, [])

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 250) {
        setstatetoggleMenu(false);
      }
    }
  }

  const handleClick = () => {
    setstatetoggleMenu(!toggleMenu);
  }

  const onLogout = () => {
    dispatch(logOut(event.id, event.url, ()=>{
      router.reload();
    }));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const handleRouteChange = (url) => {
        setLocation(url);
        setstatetoggleMenu(false);
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }

    window.addEventListener("scroll", scollEffect);
    return () => {
      window.removeEventListener("scroll", scollEffect);
    }

  }, []);

  function scollEffect() {
    if (window.scrollY > 250) {
      setstatetoggleMenu(false);
    }
  }

  useEffect(() => {
    dispatch(fetchProfileData(event.id, event.url, 0));
  }, [])

  return (
    <React.Fragment>
      {<div ref={frame} className="ebs-profile-top-area">
        <div onClick={handleClick} className={`${toggleMenu ? 'ebs-active-state' : ''} ebs-sideber-icon`}>
          {settings?.profile_picture?.status ===1 && attendee?.image && attendee?.image !== "" ? (
            <img className="ebs-image-solid" src={
              process.env.NEXT_APP_EVENTCENTER_URL +
              "/assets/attendees/" +
              attendee?.image
            } alt="" />
          ) : (
            <Image objectFit='contain' layout="fill" className="ebs-image-solid" src={
              require("public/img/square.jpg")
            } alt="" />
          )}
        </div>
        {toggleMenu && <div className="ebs-sidebar-account">
          <ul>
            {event.eventsiteSettings.attendee_my_profile === 1 && <li><ActiveLink className={location === `/${event.url}/profile` ? 'active' : ''} href={`/${event.url}/profile`} >My profile</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_billing_history === 1 && <li><ActiveLink href={`/${event.url}/profile/my-billing`} >My billing history</ActiveLink></li>}
            {(event.eventsiteSettings.attendee_my_reg_cancel === 1 && cancellationDatePassed === 0 && (enable_cancel == true)) && <li><ActiveLink href={`/${event.url}/profile/cancel-registration`}>Cancel registration</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_sub_registration === 1 && <li><ActiveLink className={location === `/${event.url}/profile/my-sub-registration` ? 'active' : ''} href={`/${event.url}/profile/my-sub-registration`}>My Sub registration</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_program === 1 && <li><ActiveLink className={location === `/${event.url}/profile/my-program` ? 'active' : ''} href={`/${event.url}/profile/my-program`}>My program</ActiveLink></li>}
            {event.eventsiteSettings.show_survey === 1 && <li><ActiveLink className={location === `/${event.url}/profile/surveys` ? 'active' : ''} href={`/${event.url}/profile/surveys`}>Surveys</ActiveLink></li>}
            {event.eventsiteSettings.network_interest === 1 && <li><ActiveLink className={location === `/${event.url}/profile/keyword-interest` ? 'active' : ''} href={`/${event.url}/profile/keyword-interest`}>Networking interests</ActiveLink></li>}
            {event.eventsiteSettings.show_subscriber === 1 && <li><ActiveLink className={location === `/${event.url}/profile/news-letter-subscription` ? 'active' : ''} href={`/${event.url}/profile/news-letter-subscription`}>Newsletter subscription</ActiveLink></li>}
            <li><a onClick={(e) => { 
                onLogout();
            }} >Logout</a></li>
          </ul>
        </div>}
      </div>}
    </React.Fragment>
  )
}

export default MyProfileSidebar;