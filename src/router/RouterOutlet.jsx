import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from '@/Index';
import FullPage from '@/FullPage';
import Home from '@/Home';
import Error404 from '@/Error404';
import { connect } from 'react-redux';
import AttendeeLayout from '@/AttendeeLayout';
import NewsDetail from "@/modules/news/NewsDetail";
import News from '@/modules/news/News';
import Header from "@/themes/theme-1/header/Header";


class RouterOutlet extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Header />
        <Switch>
          <MasterLayoutRoute component={FullPage} exact path="/fullpage" />
          <MasterLayoutRoute component={Home} exact path="/home" />
          <Route component={AttendeeLayout} exact path="/:event_url/attendees" />
          <MasterLayoutRoute component={Index} exact path="/:event_url" />
          {/* <Route component={NewsDetail} exact path="/:event_url/news-detail/:id" /> */}
          {/* <Route component={News} exact path="/:event_url/news" /> */}
          <Route component={Error404} />
        </Switch>
        </React.Fragment>
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
