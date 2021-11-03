import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {service} from '../../services/service';
import {Link} from "react-router-dom";

class Header extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            module: false,
            menus: [],
            event: (this.props.event !== undefined && this.props.event ? this.props.event : ''),

        }
    }

    async componentDidMount() {
        this._isMounted = true;

        this.loadMenu();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadMenu() {
        service.get(`${process.env.REACT_APP_URL}/event/${this.props.event.url}/menu`).then(
            response => {
                this.setState({
                    menus: response.data
                });
            }
        )
    }

    render() {
        const {menus, event} = this.state;
        if (menus.length === 0) return <div>Loading...</div>;
        return <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        {event.settings.header_logo ? (
                            <img src={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`} alt=""/>
                        ) : (

                            <img src={`${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`} alt=""/>
                        )}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {menus['top_menu'].map(menu => (
                                <li className="nav-item" key={menu.id}>
                                    <Link className="nav-link active" aria-current="page" to='/'>{menu.module}</Link>
                                    {menu.alias == "gallery" ? menus['gallery_sub_menu'].map(gallery => (
                                        <Link className="nav-link active" aria-current="page" to='/'
                                              key={gallery.id}>{gallery.module}</Link>
                                    )) : ""}
                                    {menu.alias == "myaccount" ? menus['my_account_sub_menu'].map(myaccount => (
                                        <Link className="nav-link active" aria-current="page" to='/'
                                              key={myaccount.id}>{myaccount.module}</Link>
                                    )) : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>;
    }
}

function mapStateToProps(state) {
    const {event} = state;
    return {
        event
    };
}

export default connect(mapStateToProps)(withRouter(Header));
