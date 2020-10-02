import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translation } from "react-i18next";
import { service } from 'services/service';
import { GeneralAction } from 'actions/general-action';

const MasterLayout = ({ children, ...rest, history }) => {
    return (
        <Translation>
            {t => (
                children
            )}
        </Translation>
    );
}

class MasterLayoutRoute extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event,
        };
    }

    componentDidMount() {
        this.loadEvent();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadEvent() {
        this._isMounted = true;
        this.setState({ preLoader: true });
        service.get(`${process.env.REACT_APP_URL}/event/fetch/api-event`)
            .then(
                response => {
                    if (response.success) {
                        if (this._isMounted) {
                            if (response.data) {
                                this.setState({
                                    event: response.data.event,
                                    preLoader: false
                                }, () => {
                                    this.props.dispatch(GeneralAction.eventInfo(response.data.event));
                                });
                            }
                        }
                    }
                },
                error => { }
            );
    }

    static getDerivedStateFromProps(props, state) {
        if (props.event.id !== undefined && state.event.id !== props.event.id) {
            return {
                event: props.event,
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <MasterLayout history={this.props.history}>
                    <Component
                        event={this.state.event}
                        {...matchProps} />
                </MasterLayout>
            )} />
        )
    }
};

function mapStateToProps(state) {
    const { event } = state;
    return {
        event
    };
}

export default connect(mapStateToProps)(withRouter(MasterLayoutRoute));