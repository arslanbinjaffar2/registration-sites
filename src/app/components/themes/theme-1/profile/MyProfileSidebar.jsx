import React, { useEffect , useState } from "react";

const MyProfileSidebar = () =>  {
  const [toggleMenu, setstatetoggleMenu] = useState(false)
  useEffect(() => {
    console.log('mounted');
    return () => {
      console.log('un mounted');
    }
}, [])
this.handleClick = () => {
  setstatetoggleMenu(!toggleMenu);
}
  return (
    <React.Fragment>
     {!toggleMenu && <div onClick={this.handleClick.bind(this)} className="ebs-sideber-icon">
       <img src={require('img/ico-menu.svg')} alt="" />
     </div>}
     {toggleMenu && <div className="ebs-sidebar-account">
      <div onClick={this.handleClick.bind(this)} className="ebs-sideber-icon-inner">
        <img src={require('img/ico-menu.svg')} alt="" />
        My Account
      </div>
       <ul>
         <li><a href="#!">My profile</a></li>
         <li><a href="#!">My billing</a></li>
         <li><a href="#!">My billing history</a></li>
         <li><a href="#!">Cancel registration</a></li>
         <li><a href="#!">My Sub registration</a></li>
         <li><a href="#!">My program</a></li>
         <li><a href="#!">Surveys</a></li>
         <li><a href="#!">Networking interests</a></li>
         <li><a href="#!">Newsletter subscription</a></li>
         <li><a href="#!">Logout</a></li>
       </ul>
     </div>}
    </React.Fragment>
  )
}

export default  MyProfileSidebar;