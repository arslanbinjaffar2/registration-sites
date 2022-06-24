import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";
import { eventSelector } from "store/Slices/EventSlice";
import { logOut, userSelector, reset } from "store/Slices/myAccount/userSlice";
import Image from 'next/image'

const MyProfileSidebar = ({ history }) => {
  const [toggleMenu, setstatetoggleMenu] = useState(false);
  const [location, setLocation] = useState(false)
  const dispatch = useDispatch();
  const { event } = useSelector(eventSelector);
  const { loggedout } = useSelector(userSelector);
  const isAuthenticated = JSON.parse(localStorage.getItem(`event${event.id}User`));
  const frame = useRef()

  useEffect(() => {
    if (loggedout) {
      dispatch(reset());
      history.push(`/${event.url}`);
    }
  }, [loggedout])
  const handleClick = () => {
    setstatetoggleMenu(!toggleMenu);
  }
  const onLogout = () => {
    dispatch(logOut(event.id, event.url));
  }
  useEffect(() => {
    history.listen((location) => {
      setLocation(location.pathname);
      setstatetoggleMenu(false);
    });
    window.addEventListener("scroll", scollEffect);
    return () => {
      window.removeEventListener("scroll", scollEffect);
    }
  }, [])
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
              process.env.REACT_APP_EVENTCENTER_URL +
              "/assets/attendees/" +
              isAuthenticated.user.image
            } alt="" />
          ) : (
            <Image className="ebs-image-solid" src={
              require("public/img/square.jpg")
            } alt="" />
          )}
        </div>
        {toggleMenu && <div className="ebs-sidebar-account">
          <ul>
            <li><ActiveLink className={location === `/${event.url}/profile` ? 'active' : ''} href={`/${event.url}/profile`} >My profile</ActiveLink></li>
            <li><ActiveLink href={`/${event.url}/profile`} >My billing</ActiveLink></li>
            <li><ActiveLink href={`/${event.url}/profile`} >My billing history</ActiveLink></li>
            <li><ActiveLink href={`/${event.url}/profile`}>Cancel registration</ActiveLink></li>
            <li><ActiveLink className={location === `/${event.url}/my-sub-registration` ? 'active' : ''} href={`/${event.url}/my-sub-registration`}>My Sub registration</ActiveLink></li>
            <li><ActiveLink className={location === `/${event.url}/my-program` ? 'active' : ''} href={`/${event.url}/my-program`}>My program</ActiveLink></li>
            <li><ActiveLink className={location === `/${event.url}/surveys` ? 'active' : ''} href={`/${event.url}/surveys`}>Surveys</ActiveLink></li>
            <li><ActiveLink className={location === `/${event.url}/keyword-interest` ? 'active' : ''} href={`/${event.url}/keyword-interest`}>Networking interests</ActiveLink></li>
            <li><ActiveLink className={location === `/${event.url}/news-letter-subscription` ? 'active' : ''} href={`/${event.url}/news-letter-subscription`}>Newsletter subscription</ActiveLink></li>
            <li><a onClick={(e) => { onLogout(); }} >Logout</a></li>
          </ul>
        </div>}
      </div>}
    </React.Fragment>
  )
}

export default MyProfileSidebar;