import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/Home';
import Timetable from '@/Timetable';
import Slidercarousel from '@/Slidercarousel';
import Sponsorsgrid from '@/Sponsorsgrid';
import Sponsorsgridv2 from '@/Sponsorsgridv2';
import Video from '@/Video';
import FullPage from '@/FullPage';
import Error404 from '@/Error404';
class RouterOutlet extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/time-table" component={Timetable} exact={true} />
          <Route path="/slider" component={Slidercarousel} exact={true} />
          <Route path="/sponsors" component={Sponsorsgrid} exact={true} />
          <Route path="/sponsorsv2" component={Sponsorsgridv2} exact={true} />
          <Route path="/video" component={Video} exact={true} />
          <Route path="/fullpage" component={FullPage} exact={true} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
