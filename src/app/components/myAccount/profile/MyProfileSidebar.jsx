import React, { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { eventSelector } from "store/Slices/EventSlice";
import { logOut, userSelector, reset } from "store/Slices/myAccount/userSlice";

const MyProfileSidebar = ({history}) =>  {
  const [toggleMenu, setstatetoggleMenu] = useState(false);
  const dispatch = useDispatch();
  const { event } = useSelector(eventSelector);
  const { loggedout } = useSelector(userSelector);
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
         <li><Link to={`/${event.url}/sub-registration-after-login` }>My Sub registration</Link></li>
         <li><Link to={`/${event.url}/my-program`}>My program</Link></li>
         <li><Link to={`/${event.url}/surveys`}>Surveys</Link></li>
         <li><Link to={`/${event.url}/keyword-interest`}>Networking interests</Link></li>
         <li><Link to={`/${event.url}/news-letter-subscription`}>Newsletter subscription</Link></li>
         <li><a onClick={(e)=>{onLogout();}} >Logout</a></li>
       </ul>
     </div>}
    </React.Fragment>
  )
}

export default  withRouter(MyProfileSidebar);