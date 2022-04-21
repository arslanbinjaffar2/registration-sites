import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translation } from "react-i18next";
import MyProfileSidebar from "@/myAccount/profile/MyProfileSidebar";

const MasterLayout = ({ children, ...rest, history }) => {
    return (
        <Translation>
            {t => (
                children
            )}
        </Translation>
    );
}

class MasterLayoutMyAccount extends React.Component {

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <MasterLayout history={this.props.history}>
                <MyProfileSidebar />
                    <Component {...matchProps} />
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

export default connect(mapStateToProps)(withRouter(MasterLayoutMyAccount));