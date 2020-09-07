import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/Home';
import ScheduleWrapper from '@/ScheduleWrapper';
import Timetable from '@/Timetable';
import OurProgram from '@/OurProgram';
import OurProgramv2 from '@/OurProgramv2';
import OurProgramv3 from '@/OurProgramv3';
import Speakerv1 from '@/Speakerv1';
import Speakerv2 from '@/Speakerv2';
import Speakerv3 from '@/Speakerv3';
import Speakerv4 from '@/Speakerv4';
import Slidercarousel from '@/Slidercarousel';
import Sponsorsgrid from '@/Sponsorsgrid';
import Video from '@/Video';
import ImageGalleryv1 from '@/ImageGalleryv1';
import ImageGalleryv2 from '@/ImageGalleryv2';
import ImageGalleryv3 from '@/ImageGalleryv3';
import FullPage from '@/FullPage';
import Bannerv1 from '@/Bannerv1';
import Bannerv2 from '@/Bannerv2';
import Bannerv3 from '@/Bannerv3';
import Bannerv4 from '@/Bannerv4';
import Bannerv5 from '@/Bannerv5';
import Error404 from '@/Error404';
class RouterOutlet extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/schedule" component={ScheduleWrapper} exact={true} />
          <Route path="/time-table" component={Timetable} exact={true} />
          <Route path="/our-program" component={OurProgram} exact={true} />
          <Route path="/our-programv2" component={OurProgramv2} exact={true} />
          <Route path="/our-programv3" component={OurProgramv3} exact={true} />
          <Route path="/speakerv1" component={Speakerv1} exact={true} />
          <Route path="/speakerv2" component={Speakerv2} exact={true} />
          <Route path="/speakerv3" component={Speakerv3} exact={true} />
          <Route path="/speakerv4" component={Speakerv4} exact={true} />
          <Route path="/slider" component={Slidercarousel} exact={true} />
          <Route path="/sponsors" component={Sponsorsgrid} exact={true} />
          <Route path="/video" component={Video} exact={true} />
          <Route path="/imagev1" component={ImageGalleryv1} exact={true} />
          <Route path="/imagev2" component={ImageGalleryv2} exact={true} />
          <Route path="/imagev3" component={ImageGalleryv3} exact={true} />
          <Route path="/fullpage" component={FullPage} exact={true} />
          <Route path="/bannerv1" component={Bannerv1} exact={true} />
          <Route path="/Bannerv2" component={Bannerv2} exact={true} />
          <Route path="/Bannerv3" component={Bannerv3} exact={true} />
          <Route path="/Bannerv4" component={Bannerv4} exact={true} />
          <Route path="/Bannerv5" component={Bannerv5} exact={true} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
