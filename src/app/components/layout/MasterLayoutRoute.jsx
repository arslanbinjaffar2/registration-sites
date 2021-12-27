import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translation } from "react-i18next";

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

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <MasterLayout history={this.props.history}>
                    <Component
                        {...matchProps} event={this.props.event} />
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