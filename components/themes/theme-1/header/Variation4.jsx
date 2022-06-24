import * as React from "react";
import ActiveLink from "components/atoms/ActiveLink";
import { Scrollbars } from "react-custom-scrollbars-2";
import MyProfileSidebar from "components/myAccount/profile/MyProfileSidebar";
import Image from 'next/image'

class Variation4 extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      module: false,
      showMenu: false,
      menus: this.props.event.header_data,
      menuresponsive: null,
      width: window.innerWidth,
      event:
        this.props.event !== undefined && this.props.event
          ? this.props.event
          : "",
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const rows = this.state.menus["top_menu"].reduce(function (
      rows,
      key,
      index
    ) {
      return (
        (index % 8 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    },
      []);
    this.setState({
      menuresponsive: rows,
    });
    window.addEventListener("scroll", this.handleScroll.bind(this), false);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  async componentDidUpdate(prevProps) {
    if (typeof window !== 'undefined') {
      if (prevProps.loaded !== this.props.loaded) {
        this.handleFunction();
        document
          .getElementsByTagName("body")[0]
          .classList.remove("ebs-scroll-menu");
        this.setState({
          showMenu: false,
        });
      }
    }
  }

  handleScroll = () => {
    if (typeof window !== 'undefined') {
      const _app = document.getElementById("App");
      const _theme = document
        .getElementById("ebs-header-master")
        .classList.contains("ebs-fixed-header");
      if (window.scrollY > 350) {
        _app.classList.add("ebs-header-sticky");
        _app.style.paddingTop = _theme
          ? 0
          : document.querySelectorAll("#App > .ebs-header-main-wrapper")[0]
            .offsetHeight + "px";
      } else {
        _app.classList.remove("ebs-header-sticky");
        _app.style.paddingTop = 0 + "px";
      }
    }
  };

  accordionToggle = (e) => {
    if (typeof window !== 'undefined') {
      //variables
      var _this = e.target;
      var panel = _this.nextElementSibling;
      var panelParent = _this.parentElement.parentElement;
      var coursePanel = document.getElementsByClassName("ebs-accordion-dropdown");
      if (panel) {
        /*if pannel is already open - minimize*/
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          _this.classList.remove("active");
        } else {

          //opens the specified pannel
          panel.style.maxHeight = panel.scrollHeight + "px";

          for (var iii = 0; iii < coursePanel.length; iii++) {
            // coursePanel[iii].style.maxHeight = null;
            if (coursePanel[iii] === panelParent) {
              coursePanel[iii].style.maxHeight =
                coursePanel[iii].scrollHeight + panel.scrollHeight + "px";
            }
          }
          //adds the 'active' addition to the css.
          _this.classList.add("active");
        }
      }
    }
  };

  handleFunction = () => {
    if (typeof window !== 'undefined') {
      document
        .getElementById("ebs-header-master")
        .classList.remove("ebs-fixed-header");
      document
        .getElementById("ebs-header-master")
        .classList.remove("ebs-light-header");
      if (window.innerWidth >= 991) {
        var _nextSibling =
          document.getElementById("ebs-header-master").nextSibling.dataset.fixed;
        if (_nextSibling === "true") {
          document
            .getElementById("ebs-header-master")
            .classList.add("ebs-fixed-header");
        } else {
          document
            .getElementById("ebs-header-master")
            .classList.add("ebs-light-header");
        }
      }
    }
  };

  handleMenu = () => {
    if (typeof window !== 'undefined') {
      this.setState({ showMenu: !this.state.showMenu }, () => {
        const _body = document.getElementsByTagName("body")[0];
        const _scroll = document.body.classList.contains("ebs-scroll-menu");
        if (_scroll) {
          _body.classList.remove("ebs-scroll-menu");
        } else {
          setTimeout(() => {
            _body.classList.add("ebs-scroll-menu");
          }, 400);
        }
      });
    }
  };

  render() {
    const { menus, event, menuresponsive } = this.state;
    if (menus.length === 0) return <div>Loading...</div>;
    return (
      <div
        id="ebs-header-master"
        className="ebs-main-header-v3 ebs-header-main-wrapper ebs-header-shadow"
      >
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-3 col-6">
              <div className="ebs-logo-main">
                <ActiveLink href={`/${event.url}`}>
                  {event.settings.header_logo ? (
                    <img
                      src={`${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`}
                      alt=""
                    />
                  ) : (
                    <img
                      src={`${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`}
                      alt=""
                    />
                  )}
                </ActiveLink>
              </div>
            </div>
            <div className="col-lg-9 col-6 d-flex align-items-center justify-content-end">
              <nav className="navbar navbar-expand-lg navbar-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContentFixedTheme"
                  aria-controls="navbarSupportedContentFixedTheme"
                  aria-expanded="false"
                  style={{ display: "inline-block" }}
                  onClick={this.handleMenu.bind(this)}
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className={`collapse  ${this.state.showMenu ? "show" : ""}`}
                  id="navbarSupportedContentFixedTheme"
                >
                  <div className="ebs-scroll-container">
                    <div
                      onClick={this.handleMenu.bind(this)}
                      id="btn-menu-close"
                    ></div>
                    <Scrollbars
                      autoHide
                      className="ebs-scorll"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <div className="ebs-scorll-inner">
                        <div className="container d-flex ebs-container-flex w-100 h-100">
                          <div className="row w-100 d-flex">
                            {menuresponsive &&
                              menuresponsive.map((menues, k) => (
                                <div
                                  key={k}
                                  className={`col-md-6 col-lg-${12 / menuresponsive.length
                                    }`}
                                >
                                  <ul key={k} className="nav navbar-nav m-0">
                                    {menues.map((menu) => (
                                      <li className="nav-item" key={menu.id}>
                                        {(menu.alias === "gallery" ||
                                          menu.alias === "myaccount" ||
                                          menu.alias ===
                                          "practicalinformation" ||
                                          menu.alias ===
                                          "additional_information" ||
                                          menu.alias ===
                                          "general_information") && (
                                            <span
                                              onClick={this.accordionToggle.bind(this)}
                                              className="nav-link ebs-accordion-button"
                                            >
                                              <span className="ebs-nav-item">
                                                {menu.module}
                                              </span>
                                            </span>
                                          )}
                                        {menu.alias !== "gallery" &&
                                          menu.alias !== "myaccount" &&
                                          menu.alias !==
                                          "practicalinformation" &&
                                          menu.alias !==
                                          "additional_information" &&
                                          menu.alias !==
                                          "general_information" && (
                                            <ActiveLink
                                              className="nav-link"
                                              aria-current="page"
                                              href={
                                                "/" +
                                                this.props.event.url +
                                                "/" +
                                                menu.alias
                                              }
                                            >
                                              <span className="ebs-nav-item">
                                                {menu.module}
                                              </span>
                                            </ActiveLink>
                                          )}
                                        {menu.alias === "gallery" && (
                                          <ul className="dropdown-menu ebs-accordion-dropdown">
                                            {menus["gallery_sub_menu"].map(
                                              (myaccount, k) => (
                                                <li
                                                  className="nav-item"
                                                  key={k}
                                                >
                                                  <ActiveLink
                                                    aria-current="page"
                                                    className="nav-link"
                                                    href={
                                                      "/" +
                                                      this.props.event.url +
                                                      "/" +
                                                      myaccount.alias
                                                    }
                                                    key={myaccount.id}
                                                  >
                                                    <span className="ebs-nav-item">
                                                      {myaccount.module}
                                                    </span>
                                                  </ActiveLink>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                        {menu.alias === "myaccount" && (
                                          <ul className="dropdown-menu">
                                            {!this.props.userExist ? menus["my_account_sub_menu"].map(
                                              (myaccount, k) => (
                                                <li
                                                  className="nav-item"
                                                  key={k}
                                                >
                                                  {myaccount.alias !== "login" ? (<ActiveLink
                                                    aria-current="page"
                                                    className="nav-link"
                                                    href={
                                                      "/" +
                                                      this.props.event.url +
                                                      "/" +
                                                      myaccount.alias
                                                    }
                                                    key={myaccount.id}
                                                  >
                                                    <span className="ebs-nav-item">
                                                      {myaccount.module}
                                                    </span>
                                                  </ActiveLink>) :
                                                    <div className="nav-link" onClick={() => { this.props.setShowLogin(true) }}>
                                                      <span className="ebs-nav-item">
                                                        {myaccount.module}
                                                      </span>
                                                    </div>
                                                  }
                                                </li>
                                              )
                                            ) : (<li className="nav-item">
                                              <ActiveLink
                                                aria-current="page"
                                                className="nav-link"
                                                href={`/${event.url}/profile`}
                                              >
                                                My Profile
                                              </ActiveLink>
                                            </li>
                                            )}
                                          </ul>
                                        )}
                                        {(menu.alias ===
                                          "practicalinformation" && menus["practical_info_menu"].length > 0) && (
                                            <ul className="dropdown-menu ebs-accordion-dropdown">
                                              {menus["practical_info_menu"].map(
                                                (pItem, k) =>
                                                  pItem.page_type &&
                                                    pItem.page_type === "menu" ? (
                                                    <li
                                                      className="nav-item"
                                                      key={pItem.id}
                                                    >
                                                      <span
                                                        onClick={this.accordionToggle.bind(this)}
                                                        className="nav-link ebs-accordion-button"
                                                      >
                                                        <span className="ebs-nav-item">
                                                          {pItem.info.name}
                                                        </span>
                                                      </span>
                                                      {pItem.submenu.length >
                                                        0 && (
                                                          <ul className="dropdown-menu ebs-accordion-dropdown">
                                                            {pItem.submenu.map(
                                                              (subitem, k) => (
                                                                <li
                                                                  className="nav-item"
                                                                  key={k}
                                                                >
                                                                  {subitem.page_type &&
                                                                    subitem.page_type === 2 ? (
                                                                    <a
                                                                      className="nav-link"
                                                                      aria-current="page"
                                                                      href={`${subitem.website_protocol}${subitem.url}`}
                                                                    >
                                                                      {subitem.info.name}
                                                                    </a>
                                                                  ) : (
                                                                    <ActiveLink
                                                                      aria-current="page"
                                                                      className="nav-link"
                                                                      href={
                                                                        "/" +
                                                                        this.props
                                                                          .event.url +
                                                                        "/" +
                                                                        menu.alias +
                                                                        "/" +
                                                                        subitem.id
                                                                      }
                                                                      key={subitem.id}
                                                                    >
                                                                      {
                                                                        subitem.info
                                                                          .name
                                                                      }
                                                                    </ActiveLink>
                                                                  )}
                                                                </li>
                                                              )
                                                            )}
                                                          </ul>
                                                        )}
                                                    </li>
                                                  ) : (
                                                    <li
                                                      className="nav-item"
                                                      key={k}
                                                    >
                                                      {pItem.page_type &&
                                                        pItem.page_type === 2 ? (
                                                        <a
                                                          className="nav-link"
                                                          aria-current="page"
                                                          href={`${pItem.website_protocol}${pItem.url}`}
                                                        >
                                                          {pItem.info.name}
                                                        </a>
                                                      ) : (
                                                        <ActiveLink
                                                          aria-current="page"
                                                          className="nav-link"
                                                          href={
                                                            "/" +
                                                            this.props.event.url +
                                                            "/" +
                                                            menu.alias +
                                                            "/" +
                                                            pItem.id
                                                          }
                                                          key={pItem.id}
                                                        >
                                                          {pItem.info.name}
                                                        </ActiveLink>
                                                      )}
                                                    </li>
                                                  )
                                              )}
                                            </ul>
                                          )}
                                        {(menu.alias ===
                                          "additional_information" && menus["additional_info_menu"].length > 0) && (
                                            <ul className="dropdown-menu ebs-accordion-dropdown">
                                              {menus["additional_info_menu"].map(
                                                (aItem, k) =>
                                                  aItem.page_type &&
                                                    aItem.page_type === "menu" ? (
                                                    <li
                                                      className="nav-item"
                                                      key={aItem.id}
                                                    >
                                                      <span
                                                        onClick={this.accordionToggle.bind(this)}
                                                        className="nav-link ebs-accordion-button"
                                                      >
                                                        <span className="ebs-nav-item">
                                                          {aItem.info.name}
                                                        </span>
                                                      </span>
                                                      {aItem.submenu.length >
                                                        0 && (
                                                          <ul className="dropdown-menu ebs-accordion-dropdown">
                                                            {aItem.submenu.map(
                                                              (subitem, k) => (
                                                                <li
                                                                  className="nav-item"
                                                                  key={k}
                                                                >
                                                                  {subitem.page_type &&
                                                                    subitem.page_type === 2 ? (
                                                                    <a
                                                                      className="nav-link"
                                                                      aria-current="page"
                                                                      href={`${subitem.website_protocol}${subitem.url}`}
                                                                    >
                                                                      {subitem.info.name}
                                                                    </a>
                                                                  ) : (
                                                                    <ActiveLink
                                                                      aria-current="page"
                                                                      className="nav-link"
                                                                      href={
                                                                        "/" +
                                                                        this.props
                                                                          .event.url +
                                                                        "/" +
                                                                        menu.alias +
                                                                        "/" +
                                                                        subitem.id
                                                                      }
                                                                      key={subitem.id}
                                                                    >
                                                                      {
                                                                        subitem.info
                                                                          .name
                                                                      }
                                                                    </ActiveLink>
                                                                  )}
                                                                </li>
                                                              )
                                                            )}
                                                          </ul>
                                                        )}
                                                    </li>
                                                  ) : (
                                                    <li
                                                      className="nav-item"
                                                      key={k}
                                                    >
                                                      {aItem.page_type &&
                                                        aItem.page_type === 2 ? (
                                                        <a
                                                          className="nav-link"
                                                          aria-current="page"
                                                          href={`${aItem.website_protocol}${aItem.url}`}
                                                        >
                                                          {aItem.info.name}
                                                        </a>
                                                      ) : (
                                                        <ActiveLink
                                                          aria-current="page"
                                                          className="nav-link"
                                                          href={
                                                            "/" +
                                                            this.props.event.url +
                                                            "/" +
                                                            menu.alias +
                                                            "/" +
                                                            aItem.id
                                                          }
                                                          key={aItem.id}
                                                        >
                                                          {aItem.info.name}
                                                        </ActiveLink>
                                                      )}
                                                    </li>
                                                  )
                                              )}
                                            </ul>
                                          )}
                                        {(menu.alias ===
                                          "general_information" && menus["general_info_menu"].length > 0) && (
                                            <ul className="dropdown-menu ebs-accordion-dropdown">
                                              {menus["general_info_menu"].map(
                                                (gItem, k) =>
                                                  gItem.page_type &&
                                                    gItem.page_type === "menu" ? (
                                                    <li
                                                      className="nav-item"
                                                      key={gItem.id}
                                                    >
                                                      <span
                                                        onClick={this.accordionToggle.bind(this)}
                                                        className="nav-link ebs-accordion-button"
                                                      >
                                                        <span className="ebs-nav-item">
                                                          {gItem.info.name}
                                                        </span>
                                                      </span>
                                                      {gItem.submenu.length >
                                                        0 && (
                                                          <ul className="dropdown-menu ebs-accordion-dropdown">
                                                            {gItem.submenu.map(
                                                              (subitem, k) => (
                                                                <li
                                                                  className="nav-item"
                                                                  key={k}
                                                                >
                                                                  {subitem.page_type &&
                                                                    subitem.page_type === 2 ? (
                                                                    <a
                                                                      className="nav-link"
                                                                      aria-current="page"
                                                                      href={`${subitem.website_protocol}${subitem.url}`}
                                                                    >
                                                                      {subitem.info.name}
                                                                    </a>
                                                                  ) : (
                                                                    <ActiveLink
                                                                      aria-current="page"
                                                                      className="nav-link"
                                                                      href={
                                                                        "/" +
                                                                        this.props
                                                                          .event.url +
                                                                        "/" +
                                                                        menu.alias +
                                                                        "/" +
                                                                        subitem.id
                                                                      }
                                                                      key={subitem.id}
                                                                    >
                                                                      {
                                                                        subitem.info
                                                                          .name
                                                                      }
                                                                    </ActiveLink>
                                                                  )}
                                                                </li>
                                                              )
                                                            )}
                                                          </ul>
                                                        )}
                                                    </li>
                                                  ) : (
                                                    <li
                                                      className="nav-item"
                                                      key={k}
                                                    >
                                                      {gItem.page_type &&
                                                        gItem.page_type === 2 ? (
                                                        <a
                                                          className="nav-link"
                                                          aria-current="page"
                                                          href={`${gItem.website_protocol}${gItem.url}`}
                                                        >
                                                          {gItem.info.name}
                                                        </a>
                                                      ) : (
                                                        <ActiveLink
                                                          aria-current="page"
                                                          className="nav-link"
                                                          href={
                                                            "/" +
                                                            this.props.event.url +
                                                            "/" +
                                                            menu.alias +
                                                            "/" +
                                                            gItem.id
                                                          }
                                                          key={gItem.id}
                                                        >
                                                          {gItem.info.name}
                                                        </ActiveLink>
                                                      )}
                                                    </li>
                                                  )
                                              )}
                                            </ul>
                                          )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </Scrollbars>
                  </div>
                </div>
              </nav>
              {this.props.userExist && <MyProfileSidebar />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Variation4;
