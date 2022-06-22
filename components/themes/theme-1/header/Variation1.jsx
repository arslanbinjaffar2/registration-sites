import * as React from "react";
import ActiveLink from "components/atoms/ActiveLink";
import MyProfileSidebar from "components/myAccount/profile/MyProfileSidebar";
import Image from 'next/image'

class Variation1 extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      module: false,
      menus: this.props.event.header_data,
      showMenu: false,
      menuresponsive: this.props.event.header_data,
      width: window.innerWidth,
      event:
        this.props.event !== undefined && this.props.event
          ? this.props.event
          : "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.handleMenu();
    window.addEventListener("resize", this.handleResize.bind(this), false);
    window.addEventListener("scroll", this.handleScroll.bind(this), false);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.handleResize.bind(this));
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && typeof window !== 'undefined') {
      document.getElementsByTagName('body')[0].classList.remove('un-scroll');
      this.setState({ showMenu: false });
      const _menubar = document.querySelectorAll(".navbar .dropdown-menu");
      _menubar.forEach(element => {
        element.style.display = 'none'
      });
      setTimeout(() => {
        _menubar.forEach(element => {
          element.style.display = 'block'
        });
      }, 0);
    }
  }

  handleScroll = () => {
    if (typeof window !== 'undefined') {
      const _app = document.getElementById("App");
      if (window.scrollY > 250) {
        _app.classList.add("ebs-header-sticky");
        _app.style.paddingTop =
          document.querySelectorAll("#App > .ebs-header-main-wrapper")[0]
            .offsetHeight + "px";
      } else {
        _app.classList.remove("ebs-header-sticky");
        _app.style.paddingTop = 0 + "px";
      }
    }
  };

  handleResize = () => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
      this.setState(
        {
          width: window.innerWidth,
          menus: [],
        },
        () => {
          this.setState(
            {
              menus: this.state.menuresponsive,
            },
            () => {
              this.handleMenu();
            }
          );
        }
      );
    }, 100);
  };

  handleMenu = () => {
    if (window.innerWidth >= 991 && typeof window !== 'undefined') {
      var _total = 0;
      var _element = false;
      const _container = document.getElementById("navbarSupportedContent");
      const _list = document.querySelectorAll("#navbarSupportedContent .nav.navbar-nav > li");
      const _item = document.createElement("li");
      const _itemancor = document.createElement("span");

      _itemancor.classList.add("nav-link");
      const textnode = document.createTextNode("More");
      const _ul = document.createElement("ul");
      _ul.classList.add("dropdown-menu");
      _itemancor.appendChild(textnode);
      _item.classList.add("nav-item");
      _item.classList.add("nav-item-more");
      _item.appendChild(_itemancor);
      _list.forEach((element) => {
        if (_total < _container.offsetWidth - 220) {
          _total = _total + element.offsetWidth + 10;
        } else {
          _element = true;
          _ul.appendChild(element);
        }
      });
      if (_element) {
        _item.appendChild(_ul);
        document.querySelectorAll("#navbarSupportedContent .nav.navbar-nav")[0].appendChild(_item);
      }
      const _nav = document.querySelectorAll('.navbar.navbar-expand-lg .nav .nav-item');
      _nav.forEach(element => {
        if (element.childNodes[1]) {
          const _arrow = document.createElement("em");
          _arrow.classList.add('fa');
          _arrow.classList.add('fa-chevron-down');
          _arrow.classList.add('ebs-menu-arrow');
          element.classList.add('has-drop-down');
          element.childNodes[0].appendChild(_arrow);
        }
      });
    }
  };

  render() {
    const { menus, event } = this.state;
    if (menus.length === 0) return <div>Loading...</div>;
    return (
      <div className="ebs-main-header ebs-header-main-wrapper ebs-main-header-v1 ebs-main-header-v2">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-3 col-6">
              <div
                style={{ padding: "0", border: "none" }}
                className="ebs-logo-main text-left"
              >
                <ActiveLink href={`/${event.url}`}>
                  <a>
                    {event.settings.header_logo ? (
                      <img
                        src={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`}
                        alt=""
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`}
                        alt=""
                      />
                    )}
                  </a>
                </ActiveLink>
              </div>
            </div>
            <div className="col-lg-9 col-6 d-flex align-items-center justify-content-end">
              <nav className="navbar navbar-expand-lg navbar-light">
                {!this.state.showMenu && (
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    onClick={() => {
                      document.getElementsByTagName('body')[0].classList.toggle('un-scroll');
                      this.setState({ showMenu: !this.state.showMenu })
                    }
                    }
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                )}
                <div
                  className={`collapse navbar-collapse ${this.state.showMenu ? "show" : ""
                    }`}
                  id="navbarSupportedContent"
                >
                  <div
                    onClick={() => {
                      document.getElementsByTagName('body')[0].classList.toggle('un-scroll');
                      this.setState({ showMenu: !this.state.showMenu })
                    }
                    }
                    id="btn-menu-close"
                  ></div>
                  <ul className="nav navbar-nav m-0">
                    {menus["top_menu"].map((menu) => (
                      <li className="nav-item" key={menu.id}>
                        {menu.alias === "custom" ? (
                          menu.url !== "" ? (
                            <a
                              className="nav-link"
                              aria-current="page"
                              href={menu.url}
                            >
                              {menu.module}
                            </a>
                          ) : (
                            <ActiveLink
                              className="nav-link"
                              aria-current="page"
                              href={`/${this.props.event.url}/${menu.alias}/${menu.module}`}
                            >
                              <a>
                                {menu.module}
                              </a>
                            </ActiveLink>
                          )
                        ) : (
                          <ActiveLink
                            className="nav-link"
                            aria-current="page"
                            href={`/${this.props.event.url}/${menu.alias}`}
                          >
                            <a>
                              {menu.module}
                            </a>
                          </ActiveLink>
                        )}
                        {menu.alias === "gallery" && (
                          <ul className="dropdown-menu">
                            {menus["gallery_sub_menu"].map((myaccount, k) => (
                              <li className="nav-item" key={k}>
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
                                  <a>
                                    {myaccount.module}
                                  </a>
                                </ActiveLink>
                              </li>
                            ))}
                          </ul>
                        )}
                        {menu.alias === "myaccount" && (
                          <ul className="dropdown-menu">
                            {!this.props.userExist ? menus["my_account_sub_menu"].map(
                              (myaccount, k) => (
                                <li className="nav-item" key={k}>
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
                                    <a>
                                      {myaccount.module}
                                    </a>
                                  </ActiveLink>) :
                                    <div className="nav-link" onClick={() => { this.props.setShowLogin(true) }}>
                                      {myaccount.module}
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
                                <a>
                                  My Profile
                                </a>
                              </ActiveLink>
                            </li>
                            )}
                          </ul>
                        )}
                        {(menu.alias === "practicalinformation" && menus["practical_info_menu"].length > 0) && (
                          <ul className="dropdown-menu">
                            {menus["practical_info_menu"].map((pItem, k) =>
                              pItem.page_type && pItem.page_type === "menu" ? (
                                <li className="nav-item" key={pItem.id}>
                                  <span className="nav-link">
                                    {pItem.info.name}
                                  </span>
                                  {pItem.submenu.length > 0 && (
                                    <ul className="dropdown-menu">
                                      {pItem.submenu.map((subitem, k) => (
                                        <li className="nav-item" key={k}>
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
                                                this.props.event.url +
                                                "/" +
                                                menu.alias +
                                                "/" +
                                                subitem.id
                                              }
                                              key={subitem.id}
                                            >
                                              <a>
                                                {subitem.info.name}
                                              </a>
                                            </ActiveLink>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li className="nav-item" key={k}>
                                  {pItem.page_type && pItem.page_type === 2 ?
                                    (
                                      <a
                                        className="nav-link"
                                        aria-current="page"
                                        href={`${pItem.website_protocol}${pItem.url}`}
                                      >
                                        {pItem.info.name}
                                      </a>
                                    ) :
                                    (
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
                                        <a>
                                          {pItem.info.name}
                                        </a>
                                      </ActiveLink>
                                    )}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                        {(menu.alias === "additional_information" && menus["additional_info_menu"].length > 0) && (
                          <ul className="dropdown-menu">
                            {menus["additional_info_menu"].map((aItem, k) =>
                              aItem.page_type && aItem.page_type === "menu" ? (
                                <li className="nav-item" key={aItem.id}>
                                  <span className="nav-link">
                                    {aItem.info.name}
                                  </span>
                                  {aItem.submenu.length > 0 && (
                                    <ul className="dropdown-menu">
                                      {aItem.submenu.map((subitem, k) => (
                                        <li className="nav-item" key={k}>
                                          {subitem.page_type && subitem.page_type === 2 ?
                                            (
                                              <a
                                                className="nav-link"
                                                aria-current="page"
                                                href={`${subitem.website_protocol}${subitem.url}`}
                                              >
                                                {subitem.info.name}
                                              </a>
                                            ) :
                                            (
                                              <ActiveLink
                                                aria-current="page"
                                                className="nav-link"
                                                href={
                                                  "/" +
                                                  this.props.event.url +
                                                  "/" +
                                                  menu.alias +
                                                  "/" +
                                                  subitem.id
                                                }
                                                key={subitem.id}
                                              >
                                                <a>
                                                  {subitem.info.name}
                                                </a>
                                              </ActiveLink>
                                            )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li className="nav-item" key={k}>
                                  {aItem.page_type && aItem.page_type === 2 ?
                                    (
                                      <a
                                        className="nav-link"
                                        aria-current="page"
                                        href={`${aItem.website_protocol}${aItem.url}`}
                                      >
                                        {aItem.info.name}
                                      </a>
                                    ) :
                                    (
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
                                        <a>
                                          {aItem.info.name}
                                        </a>
                                      </ActiveLink>
                                    )}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                        {(menu.alias === "general_information" && menus["general_info_menu"].length > 0) && (
                          <ul className="dropdown-menu">
                            {menus["general_info_menu"].map((gItem, k) =>
                              gItem.page_type && gItem.page_type === "menu" ? (
                                <li className="nav-item" key={gItem.id}>
                                  <span className="nav-link">
                                    {gItem.info.name}
                                  </span>
                                  {gItem.submenu.length > 0 && (
                                    <ul className="dropdown-menu">
                                      {gItem.submenu.map((subitem, k) => (
                                        <li className="nav-item" key={k}>
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
                                                this.props.event.url +
                                                "/" +
                                                menu.alias +
                                                "/" +
                                                subitem.id
                                              }
                                              key={subitem.id}
                                            >
                                              <a>
                                                {subitem.info.name}
                                              </a>
                                            </ActiveLink>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li className="nav-item" key={k}>
                                  {gItem.page_type && gItem.page_type === 2 ?
                                    (
                                      <a
                                        className="nav-link"
                                        aria-current="page"
                                        href={`${gItem.website_protocol}${gItem.url}`}
                                      >
                                        {gItem.info.name}
                                      </a>
                                    ) :
                                    (
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
                                        <a>
                                          {gItem.info.name}
                                        </a>
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
              </nav>
              {this.props.userExist && <MyProfileSidebar />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Variation1;
