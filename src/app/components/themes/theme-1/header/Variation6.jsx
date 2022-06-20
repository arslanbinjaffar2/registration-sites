import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import MyProfileSidebar from "@/myAccount/profile/MyProfileSidebar";

class Variation6 extends React.Component {
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
    this.handleMenu();
    window.addEventListener('resize', this.handleResize.bind(this),false);
    window.addEventListener('scroll', this.handleScroll.bind(this),false);
    document.querySelectorAll('.has-drop-down > .nav-link').forEach(element => {
      element.addEventListener('click',this.accordionToggle.bind(this),false);
    });

  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.handleResize.bind(this));
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
  componentDidUpdate(prevProps, prevState) { 
    if (prevProps !== this.props) {
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
    const _app = document.getElementById("App");
    if (window.scrollY > 350) {
      _app.classList.add("ebs-header-sticky");
      _app.style.paddingTop = document.querySelectorAll("#App > .ebs-header-main-wrapper")[0].offsetHeight +'px'
    } else {
      _app.classList.remove("ebs-header-sticky");
      _app.style.paddingTop = 0+'px'
    }
  };
  handleResize = () => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
      this.setState({
        width: window.innerWidth,
        menus: []
      },()=>{
        this.setState({
          menus: this.state.menuresponsive
        },()=>{
          this.handleMenu();
          document.querySelectorAll('.has-drop-down > .nav-link').forEach(element => {
            element.addEventListener('click',this.accordionToggle.bind(this),false);
          });
        })
      })
    }, 100);
  }
 
	handleMenu = () => {
    if (window.innerWidth >= 991) {
      var _total = 0;
      var _element = false;
      const _container = document.getElementById('navbarSupportedContent');
      const _list = document.querySelectorAll('#navbarSupportedContent .nav.navbar-nav > li');
			const _item = document.createElement("li");
			const _itemancor = document.createElement("span");
			_itemancor.classList.add('nav-link')
			const textnode = document.createTextNode("More");
			const _ul = document.createElement('ul');
			_ul.classList.add('dropdown-menu');
			_itemancor.appendChild(textnode);
			_item.classList.add('nav-item');
			_item.classList.add('nav-item-more');
			_item.appendChild(_itemancor);
      _list.forEach(element => {
        if (_total < (_container.offsetWidth - 220)) {
          _total = _total + element.offsetWidth + 10;
        } else {
          _element = true;
          _ul.appendChild(element);
        }
      });
      if (_element) {
        _item.appendChild(_ul);
        document.querySelectorAll('#navbarSupportedContent .nav.navbar-nav')[0].appendChild(_item)
      }
    }
    const _nav = document.querySelectorAll('.navbar.navbar-expand-lg .nav .nav-item');
    _nav.forEach(element => {
      if (element.childNodes[1]) {
        const _arrow = document.createElement("em");
        _arrow.style.pointerEvents = 'none';
        _arrow.classList.add('fa');
        _arrow.classList.add('fa-caret-down');
        _arrow.classList.add('ebs-menu-arrow');
        element.classList.add('has-drop-down');
        element.childNodes[0].appendChild(_arrow);
        element.childNodes[1].classList.add('ebs-accordion-dropdown');
        const _html =  element.childNodes[0].innerHTML;
        const _span = document.createElement('span');
        _span.innerHTML = _html;
        _span.classList.add('nav-link');
        element.insertAdjacentElement('afterbegin', _span);
        element.childNodes[1].remove();
      }
    });
	}
  accordionToggle = (e) => {
    //variables
    e.preventDefault();
    if (window.innerWidth > 991) return false;
    var _this = e.target;
    var panel = _this.nextElementSibling;
    var panelParent = _this.parentElement.parentElement;
    var coursePanel = document.getElementsByClassName("ebs-accordion-dropdown");
    if (panel) {
      /*if pannel is already open - minimize*/
      if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        _this.classList.remove("ebs-menu-active");
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
        _this.classList.add("ebs-menu-active");
      }
    }
  };
  render() {
    const { menus, event } = this.state;
    if (menus.length === 0) return <div>Loading...</div>;
    return (
      <div className="ebs-main-header-v2 ebs-header-main-wrapper ebs-zindex-header ebs-header-height-1">
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
            <div className="col-lg-9 col-6 d-flex align-items-center justify-content-end">
              <nav className="navbar navbar-expand-lg navbar-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  style={{width: 36, height: 36,padding: 0,borderRadius: '100%'}}
                  onClick={() => {document.getElementsByTagName('body')[0].classList.toggle('un-scroll');this.setState({showMenu: !this.state.showMenu})}}
                  aria-label="Toggle navigation">
                  {!this.state.showMenu ? <span className="navbar-toggler-icon"></span> : <span style={{fontSize: 34, marginTop: 2 ,lineHeight: 1 ,height: 30}} className="material-icons">close</span>}
                </button>
                <div
                  className={`collapse navbar-collapse ${this.state.showMenu ? 'show' : ''}`}
                  id="navbarSupportedContent">
                  <ul className="nav navbar-nav m-0">
                    {menus["top_menu"].map((menu) => (
                      <li className="nav-item" key={menu.id}>
                        <NavLink className="nav-link" aria-current="page" to={'/' + this.props.event.url + '/' + menu.alias}>
                          {menu.module}
                        </NavLink>
                        {menu.alias === "gallery" && (
                          <ul className="dropdown-menu">
                            {menus["gallery_sub_menu"].map((myaccount, k) => (
                              <li className="nav-item" key={k}>
                                <NavLink
                                  aria-current="page"
                                  className="nav-link"
                                  to={'/' + this.props.event.url + '/' + myaccount.alias}
                                  key={myaccount.id}
                                >
                                  {myaccount.module}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                        {menu.alias === "myaccount" && (
                          <ul className="dropdown-menu">
                            {!this.props.userExist ? menus["my_account_sub_menu"].map(
                              (myaccount, k) => (
                                <li className="nav-item" key={k}>
                                  {myaccount.alias !== "login" ? (<NavLink
                                          aria-current="page"
                                          className="nav-link"
                                          to={
                                            "/" +
                                            this.props.event.url +
                                            "/" +
                                            myaccount.alias
                                          }
                                          key={myaccount.id}
                                        >
                                            {myaccount.module}
                                        </NavLink>):
                                        <div className="nav-link" onClick={()=>{this.props.setShowLogin(true)}}>
                                            {myaccount.module}
                                        </div> 
                                        }
                                </li>
                              )
                            ):(<li className="nav-item">
                            <NavLink
                              aria-current="page"
                              className="nav-link"
                              to={ `/${event.url}/profile`}
                            >
                                My Profile
                            </NavLink>
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
                                          <NavLink
                                            aria-current="page"
                                            className="nav-link"
                                            to={
                                              "/" +
                                              this.props.event.url +
                                              "/" +
                                              menu.alias +
                                              "/" +
                                              subitem.id
                                            }
                                            key={subitem.id}
                                          >
                                            {subitem.info.name}
                                          </NavLink>
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
                                      <NavLink
                                        aria-current="page"
                                        className="nav-link"
                                        to={
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
                                      </NavLink>
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
                                          { subitem.page_type && subitem.page_type === 2 ? 
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
                                          <NavLink
                                            aria-current="page"
                                            className="nav-link"
                                            to={
                                              "/" +
                                              this.props.event.url +
                                              "/" +
                                              menu.alias +
                                              "/" +
                                              subitem.id
                                            }
                                            key={subitem.id}
                                          >
                                            {subitem.info.name}
                                          </NavLink>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li className="nav-item" key={k}>
                                { aItem.page_type && aItem.page_type === 2 ? 
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
                                    <NavLink
                                      aria-current="page"
                                      className="nav-link"
                                      to={
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
                                    </NavLink>
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
                                          <NavLink
                                            aria-current="page"
                                            className="nav-link"
                                            to={
                                              "/" +
                                              this.props.event.url +
                                              "/" +
                                              menu.alias +
                                              "/" +
                                              subitem.id
                                            }
                                            key={subitem.id}
                                          >
                                            {subitem.info.name}
                                          </NavLink>
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
                                    <NavLink
                                      aria-current="page"
                                      className="nav-link"
                                      to={
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
                                    </NavLink>
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
              {this.props.userExist && <MyProfileSidebar /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Variation6;
