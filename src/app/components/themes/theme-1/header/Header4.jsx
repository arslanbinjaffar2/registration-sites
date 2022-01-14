import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

class Header4 extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      module: false,
      showMenu: false,
      menus: this.props.event.header_data,
      menuresponsive: this.props.event.header_data,
			width: window.innerWidth,
      event:
        this.props.event !== undefined && this.props.event
          ? this.props.event
          : "",
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.handleFunction();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.loaded !== this.props.loaded) {
      this.handleFunction();
      document.getElementsByTagName('body')[0].classList.remove('ebs-scroll-menu');
      this.setState({
        showMenu: false
      })
    }
  }
  accordionToggle = (e) => {
    //variables
    var _this = e.target;
    var panel = _this.nextElementSibling;
    var coursePanel = document.getElementsByClassName("ebs-accordion-dropdown");
    var courseAccordionActive = document.getElementsByClassName("ebs-accordion-button active");

    /*if pannel is already open - minimize*/
    if (panel.style.maxHeight){
      //minifies current pannel if already open
      panel.style.maxHeight = null;
      //removes the 'active' class as toggle didnt work on browsers minus chrome
      _this.classList.remove("active");
    } else { //pannel isnt open...
      //goes through the buttons and removes the 'active' css (+ and -)
      for (var ii = 0; ii < courseAccordionActive.length; ii++) {
        courseAccordionActive[ii].classList.remove("active");
      }
      //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
      for (var iii = 0; iii < coursePanel.length; iii++) {
       _this.classList.remove("active");
        coursePanel[iii].style.maxHeight = null;
      }
      //opens the specified pannel
      panel.style.maxHeight = panel.scrollHeight + "px";
      //adds the 'active' addition to the css.
      _this.classList.add("active");
    } 
}
handleFunction = () => {
    document.getElementById("ebs-header-master").classList.remove('ebs-fixed-header');
    document.getElementById("ebs-header-master").classList.remove('ebs-light-header');
    if (window.innerWidth >= 991) {
      var _nextSibling = document.getElementById("ebs-header-master").nextSibling.dataset.fixed;
      if (_nextSibling === 'true') {
        document.getElementById("ebs-header-master").classList.add('ebs-fixed-header');
      } else {
        document.getElementById("ebs-header-master").classList.add('ebs-light-header');
      }
    }
}
  handleMenu = () => {
    this.setState({showMenu: !this.state.showMenu},()=>{
      const _body = document.getElementsByTagName('body')[0];
      const _scroll = document.body.classList.contains('ebs-scroll-menu');
      if (_scroll) {
        _body.classList.remove('ebs-scroll-menu');
        
      } else {
       setTimeout(() => {
        _body.classList.add('ebs-scroll-menu')
       }, 400);
      }
    })

  }
  render() {
    const { menus, event } = this.state;
    if (menus.length === 0) return <div>Loading...</div>;
    return (
      <div id="ebs-header-master" className="ebs-main-header-v3">
        <div className="container">
          <div className="row d-flex align-items-center">
          <div className="col-lg-3 col-6">
              <div className="ebs-logo-main">
                <Link to={`/${event.url}`}>
                  {event.settings.header_logo ? (
                    <img
                      src={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`}
                      alt=""
                    />):(
                    <img
                      src={`${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`}
                      alt=""
                    />)}
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-6 d-flex justify-content-end">
              <nav className="navbar navbar-expand-lg navbar-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContentFixed"
                  aria-controls="navbarSupportedContentFixed"
                  aria-expanded="false"
                  style={{display: 'inline-block'}}
                  onClick={this.handleMenu.bind(this)}
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className={`collapse  ${this.state.showMenu ? 'show' : ''}`}
                  id="navbarSupportedContentFixed">
                    <div className="ebs-scroll-container">
                    <div onClick={this.handleMenu.bind(this)} id="btn-menu-close"></div>
                    <Scrollbars className="ebs-scorll" style={{ width: '100%', height: '100%' }}>
                      <div className="ebs-scorll-inner">
                      <ul className="nav navbar-nav m-0">
                        {menus["top_menu"].map((menu) => (
                          <li className="nav-item" key={menu.id}>
                            {(menu.alias === 'gallery' || menu.alias === 'myaccount') && 
                              <span onClick={this.accordionToggle.bind(this)} className="nav-link ebs-accordion-button">
                                <span className="ebs-nav-item">{menu.module}</span>
                              </span>}
                            {(menu.alias !== 'gallery' && menu.alias !== 'myaccount') && 
                              <NavLink className="nav-link" aria-current="page" to={'/' + this.props.event.url + '/' + menu.alias}>
                              <span className="ebs-nav-item">{menu.module}</span>
                              </NavLink>}
                            {menu.alias === "gallery" && (
                              <ul className="dropdown-menu ebs-accordion-dropdown">
                                {menus["gallery_sub_menu"].map((myaccount, k) => (
                                  <li className="nav-item" key={k}>
                                    <NavLink
                                      aria-current="page"
                                      className="nav-link"
                                      to={'/' + this.props.event.url + '/' + myaccount.alias}
                                      key={myaccount.id}
                                    >
                                      <span className="ebs-nav-item">{myaccount.module}</span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {menu.alias === "myaccount" && (
                              <ul className="dropdown-menu">
                                {menus["my_account_sub_menu"].map(
                                  (myaccount, k) => (
                                    <li className="nav-item" key={k}>
                                      <NavLink
                                        aria-current="page"
                                        className="nav-link"
                                        to={'/' + this.props.event.url + '/' + myaccount.alias}
                                        key={myaccount.id}
                                      >
                                        <span className="ebs-nav-item">{myaccount.module}</span>
                                      </NavLink>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Scrollbars>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Header4;
