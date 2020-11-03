import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Home from '@/Home';
import ScheduleWrapper from '@/ScheduleWrapper';
import ScheduleWrapperv2 from '@/ScheduleWrapperv2';
import ScheduleWrapperv3 from '@/ScheduleWrapperv3';
import ScheduleWrapperv4 from '@/ScheduleWrapperv4';
import Timetable from '@/Timetable';
import OurProgram from '@/OurProgram';
import OurProgramv2 from '@/OurProgramv2';
import OurProgramv3 from '@/OurProgramv3';
import Speakerv1 from '@/Speakerv1';
import Speakerv2 from '@/Speakerv2';
import Speakerv3 from '@/Speakerv3';
import Speakerv4 from '@/Speakerv4';
import speakerv5 from '@/speakerv5';
import speakerv6 from '@/speakerv6';
import speakerv7 from '@/speakerv7';
import speakerv8 from '@/speakerv8';
import Slidercarousel from '@/Slidercarousel';
import Sponsorsgrid from '@/Sponsorsgrid';
import Sponsorsgridv2 from '@/Sponsorsgridv2';
import Video from '@/Video';
import ImageGalleryv1 from '@/ImageGalleryv1';
import ImageGalleryv2 from '@/ImageGalleryv2';
import ImageGalleryv3 from '@/ImageGalleryv3';
import ImageGalleryv4 from '@/ImageGalleryv4';
=======
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from '@/Index';
>>>>>>> 81d58f1deaabfbd3062278088278ec169ba4d04c
import FullPage from '@/FullPage';
import Home from '@/Home';
import Error404 from '@/Error404';
import { connect } from 'react-redux';

class RouterOutlet extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
<<<<<<< HEAD
          <Route path="/" component={Home} exact={true} />
          <Route path="/schedule" component={ScheduleWrapper} exact={true} /> 
          <Route path="/schedulev2" component={ScheduleWrapperv2} exact={true} />
          <Route path="/schedulev3" component={ScheduleWrapperv3} exact={true} />
          <Route path="/schedulev4" component={ScheduleWrapperv4} exact={true} />
          <Route path="/time-table" component={Timetable} exact={true} />
          <Route path="/our-program" component={OurProgram} exact={true} />
          <Route path="/our-programv2" component={OurProgramv2} exact={true} />
          <Route path="/our-programv3" component={OurProgramv3} exact={true} />
          <Route path="/speakerv1" component={Speakerv1} exact={true} />
          <Route path="/speakerv2" component={Speakerv2} exact={true} />
          <Route path="/speakerv3" component={Speakerv3} exact={true} />
          <Route path="/speakerv4" component={Speakerv4} exact={true} />
          <Route path="/speakerv5" component={speakerv5} exact={true} />
          <Route path="/speakerv6" component={speakerv6} exact={true} />
          <Route path="/speakerv7" component={speakerv7} exact={true} />
          <Route path="/speakerv8" component={speakerv8} exact={true} />
          <Route path="/slider" component={Slidercarousel} exact={true} />
          <Route path="/sponsors" component={Sponsorsgrid} exact={true} />
          <Route path="/sponsorsv2" component={Sponsorsgridv2} exact={true} />
          <Route path="/video" component={Video} exact={true} />
          <Route path="/imagev1" component={ImageGalleryv1} exact={true} />
          <Route path="/imagev2" component={ImageGalleryv2} exact={true} />
          <Route path="/imagev3" component={ImageGalleryv3} exact={true} />
          <Route path="/imagev4" component={ImageGalleryv4} exact={true} />
          <Route path="/fullpage" component={FullPage} exact={true} />
          <Route path="/bannerv1" component={Bannerv1} exact={true} />
          <Route path="/Bannerv2" component={Bannerv2} exact={true} />
          <Route path="/Bannerv3" component={Bannerv3} exact={true} />
          <Route path="/Bannerv4" component={Bannerv4} exact={true} />
          <Route path="/Bannerv5" component={Bannerv5} exact={true} />
=======
          <MasterLayoutRoute component={FullPage} exact path="/fullpage" />
          <MasterLayoutRoute component={Home} exact path="/home" />
          <MasterLayoutRoute component={Index} exact path="/:event_url?" />
>>>>>>> 81d58f1deaabfbd3062278088278ec169ba4d04c
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
