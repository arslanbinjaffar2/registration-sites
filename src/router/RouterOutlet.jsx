import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from '@/Index';
import FullPage from '@/FullPage';
import Home from '@/Home';
import Error404 from '@/Error404';
import { connect } from 'react-redux';
import AttendeeLayout from '@/AttendeeLayout';

class RouterOutlet extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MasterLayoutRoute component={FullPage} exact path="/fullpage" />
          <MasterLayoutRoute component={Home} exact path="/home" />
          <Route component={AttendeeLayout} exact path="/:event_url/attendees" />
          <MasterLayoutRoute component={Index} exact path="/:event_url?" />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { event } = state;
  return {
    event
  };
}

export default connect(mapStateToProps)(RouterOutlet);
