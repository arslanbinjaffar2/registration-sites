import React, { useEffect , useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { eventSelector } from "store/Slices/EventSlice";
import { logOut, userSelector, reset } from "store/Slices/myAccount/userSlice";

const MyProfileSidebar = ({history}) =>  {
  const [toggleMenu, setstatetoggleMenu] = useState(false);
  const [location, setLocation] = useState(false)
  const dispatch = useDispatch();
  const { event } = useSelector(eventSelector);
  const { loggedout } = useSelector(userSelector);
  const isAuthenticated = JSON.parse(localStorage.getItem(`event${event.id}User`));
  const frame = useRef()

  useEffect(() => {
    if(loggedout){
      dispatch(reset());
      history.push(`/${event.url}`);
    }
}, [loggedout])
const handleClick = () => {
  setstatetoggleMenu(!toggleMenu);
}
const onLogout = () =>{
  dispatch(logOut(event.id, event.url));
}
useEffect(() => {
    history.listen((location) => {
      setLocation(location.pathname);
      setstatetoggleMenu(false);
  });
  window.addEventListener("scroll",scollEffect);
  return () => {
    window.removeEventListener("scroll",scollEffect);
  }
}, [])
  function scollEffect () {
    if (window.scrollY > 250) {
      setstatetoggleMenu(false);
    }
  }
  return (
    <React.Fragment>
    {isAuthenticated && <div ref={frame} className="ebs-profile-top-area">
     <div onClick={handleClick} className={`${toggleMenu ? 'ebs-active-state' : ''} ebs-sideber-icon`}>
      <img className="ebs-image-solid" src={
          isAuthenticated.user.image && isAuthenticated.user.image !== ""
            ? process.env.REACT_APP_EVENTCENTER_URL +
              "/assets/attendees/" +
              isAuthenticated.user.image
            : require("img/square.jpg")
        } alt="" />
     </div>
     {toggleMenu && <div className="ebs-sidebar-account">
       <ul>
         <li><Link className={location === `/${event.url}/profile` ? 'active' : ''} to={`/${event.url}/profile`} >My profile</Link></li>
         <li><Link to={`/${event.url}/profile`} >My billing</Link></li>
         <li><Link to={`/${event.url}/profile`} >My billing history</Link></li>
         <li><Link to={`/${event.url}/profile`}>Cancel registration</Link></li>
         <li><Link className={location === `/${event.url}/my-sub-registration` ? 'active' : ''} to={`/${event.url}/sub-registration-after-login` }>My Sub registration</Link></li>
         <li><Link className={location === `/${event.url}/my-program` ? 'active' : ''} to={`/${event.url}/my-program`}>My program</Link></li>
         <li><Link className={location === `/${event.url}/surveys` ? 'active' : ''} to={`/${event.url}/surveys`}>Surveys</Link></li>
         <li><Link className={location === `/${event.url}/keyword-interest` ? 'active' : ''} to={`/${event.url}/keyword-interest`}>Networking interests</Link></li>
         <li><Link className={location === `/${event.url}/news-letter-subscription` ? 'active' : ''} to={`/${event.url}/news-letter-subscription`}>Newsletter subscription</Link></li>
         <li><a onClick={(e)=>{onLogout();}} >Logout</a></li>
       </ul>
     </div>}
    </div>}
    </React.Fragment>
  )
}

export default  withRouter(MyProfileSidebar);