import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { service } from "app/services/service";
import { Link } from "react-router-dom";

class Header extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      module: false,
      menus: [],
      menuresponsive: [],
			width: window.innerWidth,
      event:
        this.props.event !== undefined && this.props.event
          ? this.props.event
          : "",
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.loadMenu();
    window.addEventListener('resize', this.handleResize.bind(this),false)
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.handleResize.bind(this));
  }
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
          this.handleMenu()
        })
      })
    }, 100);
  }
  loadMenu() {
    service
      .get(`${process.env.REACT_APP_URL}/event/${this.props.event.url}/menu`)
      .then((response) => {
        this.setState({
          menus: response.data,
          menuresponsive: response.data,
        },()=>{
					this.handleMenu()
				});
      });
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
			_item.appendChild(_itemancor);
      _list.forEach(element => {
        if (_total < (_container.offsetWidth - 220)) {
          _total = _total + element.offsetWidth;
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
	}
  render() {
    const { menus, event } = this.state;
    if (menus.length === 0) return <div>Loading...</div>;
    return (
      <div className="ebs-main-header">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-3 col-6">
              <div className="ebs-logo-main">
                <Link to="/">
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
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent">
                  <ul className="nav navbar-nav m-0">
                    {menus["top_menu"].map((menu) => (
                      <li className="nav-item" key={menu.id}>
                        <Link className="nav-link" aria-current="page" to="/">
                          {menu.module}
                        </Link>
                        {menu.alias === "gallery" && (
                          <ul>
                            {menus["gallery_sub_menu"].map((myaccount, k) => (
                              <li key={k}>
                                <Link
                                  aria-current="page"
                                  to="/"
                                  key={myaccount.id}
                                >
                                  {myaccount.module}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {menu.alias === "myaccount" && (
                          <ul>
                            {menus["my_account_sub_menu"].map(
                              (myaccount, k) => (
                                <li key={k}>
                                  <Link
                                    aria-current="page"
                                    to="/"
                                    key={myaccount.id}
                                  >
                                    {myaccount.module}
                                  </Link>
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

function mapStateToProps(state) {
  const { event } = state;
  return {
    event,
  };
}

export default connect(mapStateToProps)(withRouter(Header));
