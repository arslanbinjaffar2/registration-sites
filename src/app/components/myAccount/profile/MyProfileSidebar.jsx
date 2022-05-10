import React, { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { eventSelector } from "store/Slices/EventSlice";

const MyProfileSidebar = () =>  {
  const [toggleMenu, setstatetoggleMenu] = useState(false)
  const { event } = useSelector(eventSelector);
  useEffect(() => {
    console.log('mounted');
    return () => {
      console.log('un mounted');
    }
}, [])
const handleClick = () => {
  setstatetoggleMenu(!toggleMenu);
}
  return (
    <React.Fragment>
     {!toggleMenu && <div onClick={handleClick} className="ebs-sideber-icon">
       <img src={require('img/ico-menu.svg')} alt="" />
     </div>}
     {toggleMenu && <div className="ebs-sidebar-account">
      <div onClick={handleClick} className="ebs-sideber-icon-inner">
        <img src={require('img/ico-menu.svg')} alt="" />
        My Account
      </div>
       <ul>
         <li><Link to={`/${event.url}/profile`} >My profile</Link></li>
         <li><Link to={`/${event.url}/profile`} >My billing</Link></li>
         <li><Link to={`/${event.url}/profile`} >My billing history</Link></li>
         <li><Link to={`/${event.url}/profile`}>Cancel registration</Link></li>
         <li><Link to={`/${event.url}/my-sub-registration`}>My Sub registration</Link></li>
         <li><Link to={`/${event.url}/my-program`}>My program</Link></li>
         <li><Link to={`/${event.url}/surveys`}>Surveys</Link></li>
         <li><Link to={`/${event.url}/keyword-interest`}>Networking interests</Link></li>
         <li><Link to={`/${event.url}/news-letter-subscription`}>Newsletter subscription</Link></li>
         <li><Link to={`/${event.url}/profile`}>Logout</Link></li>
       </ul>
     </div>}
    </React.Fragment>
  )
}

export default  MyProfileSidebar;