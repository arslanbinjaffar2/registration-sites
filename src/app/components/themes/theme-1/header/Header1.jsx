import * as React from "react";
import { NavLink, Link } from "react-router-dom";

class Header1 extends React.Component {
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

  async componentDidMount() {
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
  handleScroll = () => {
    const _app = document.getElementById("App");
    if (window.scrollY > 250) {
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
        menus: [],
      }, () => {
        this.setState({
          menus: this.state.menuresponsive,
        },() => {
            this.handleMenu();
          });
      });
    }, 100);
  };
  handleMenu = () => {
    if (window.innerWidth >= 991) {
      var _total = 0;
      var _element = false;
      const _container = document.getElementById("navbarSupportedContent");
      const _list = document.querySelectorAll(
        "#navbarSupportedContent .nav.navbar-nav > li"
      );
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
        document
          .querySelectorAll("#navbarSupportedContent .nav.navbar-nav")[0]
          .appendChild(_item);
      }
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
                <Link to={`/${event.url}`}>
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
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-6 d-flex justify-content-end">
              <nav className="navbar navbar-expand-lg navbar-light">
                {!this.state.showMenu && (
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    onClick={() =>
                      this.setState({ showMenu: !this.state.showMenu })
                    }
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                )}
                <div
                  className={`collapse navbar-collapse ${
                    this.state.showMenu ? "show" : ""
                  }`}
                  id="navbarSupportedContent"
                >
                  <div
                    onClick={() =>
                      this.setState({ showMenu: !this.state.showMenu })
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
                            <NavLink
                              className="nav-link"
                              aria-current="page"
                              to={`/${this.props.event.url}/${menu.alias}/${menu.module}`}
                            >
                              {menu.module}
                            </NavLink>
                          )
                        ) : (
                          <NavLink
                            className="nav-link"
                            aria-current="page"
                            to={`/${this.props.event.url}/${menu.alias}`}
                          >
                            {menu.module}
                          </NavLink>
                        )}
                        {menu.alias === "gallery" && (
                          <ul className="dropdown-menu">
                            {menus["gallery_sub_menu"].map((myaccount, k) => (
                              <li className="nav-item" key={k}>
                                <NavLink
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
                                    to={
                                      "/" +
                                      this.props.event.url +
                                      "/" +
                                      myaccount.alias
                                    }
                                    key={myaccount.id}
                                  >
                                    {myaccount.module}
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Header1;
