import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";
import { eventSelector } from "store/Slices/EventSlice";
import { logOut, userSelector, reset } from "store/Slices/myAccount/userSlice";
import Image from 'next/image'
import { useRouter } from 'next/router';

const MyProfileSidebar = (props) => {

  const [toggleMenu, setstatetoggleMenu] = useState(false);

  const [location, setLocation] = useState(false)

  const dispatch = useDispatch();

  const { event } = useSelector(eventSelector);

  const { loggedout } = useSelector(userSelector);

  const isAuthenticated = JSON.parse(localStorage.getItem(`event${event.id}User`));

  const frame = useRef()

  const router = useRouter();
  
useEffect(() => {
  window.addEventListener('scroll',handleScroll,false);

  return () => {
    window.removeEventListener('scroll',handleScroll,false);
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
    dispatch(logOut(event.id, event.url));
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

  return (
    <React.Fragment>
      {isAuthenticated && <div ref={frame} className="ebs-profile-top-area">
        <div onClick={handleClick} className={`${toggleMenu ? 'ebs-active-state' : ''} ebs-sideber-icon`}>
          {isAuthenticated.user.image && isAuthenticated.user.image !== "" ? (
            <img className="ebs-image-solid" src={
              process.env.NEXT_APP_EVENTCENTER_URL +
              "/assets/attendees/" +
              isAuthenticated.user.image
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
            {event.eventsiteSettings.attendee_my_billing === 1 && <li><ActiveLink href={`/${event.url}/profile/my-billing`} >My billing</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_billing_history === 1 && <li><ActiveLink href={`/${event.url}/profile`} >My billing history</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_reg_cancel === 1 && <li><ActiveLink href={`/${event.url}/profile/cancel-registration`}>Cancel registration</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_sub_registration === 1 && <li><ActiveLink className={location === `/${event.url}/profile/my-sub-registration` ? 'active' : ''} href={`/${event.url}/profile/my-sub-registration`}>My Sub registration</ActiveLink></li>}
            {event.eventsiteSettings.attendee_my_program === 1 && <li><ActiveLink className={location === `/${event.url}/profile/my-program` ? 'active' : ''} href={`/${event.url}/profile/my-program`}>My program</ActiveLink></li>}
            {event.eventsiteSettings.show_survey === 1 && <li><ActiveLink className={location === `/${event.url}/profile/surveys` ? 'active' : ''} href={`/${event.url}/profile/surveys`}>Surveys</ActiveLink></li>}
            {event.eventsiteSettings.network_interest === 1 && <li><ActiveLink className={location === `/${event.url}/profile/keyword-interest` ? 'active' : ''} href={`/${event.url}/profile/keyword-interest`}>Networking interests</ActiveLink></li>}
            {event.eventsiteSettings.show_subscriber === 1 && <li><ActiveLink className={location === `/${event.url}/profile/news-letter-subscription` ? 'active' : ''} href={`/${event.url}/profile/news-letter-subscription`}>Newsletter subscription</ActiveLink></li>}
            <li><a onClick={(e) => { 
              onLogout(); 
              router.push(`/${event.url}`);
            }} >Logout</a></li>
          </ul>
        </div>}
      </div>}
    </React.Fragment>
  )
}

export default MyProfileSidebar;