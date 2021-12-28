import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from "@/Index";
import FullPage from "@/FullPage";
import Home from "@/Home";
import Error404 from "@/Error404";
// import AttendeeLayout from "@/AttendeeLayout";
import Header from "../app/components/modules/Header";
// import EventInformation from "../app/components/modules/EventInformation";
import AttendeesPage from "../app/components/pages/AttendeesPage";
import GalleryPage from "../app/components/pages/GalleryPage";
import ExhibitorPage from "../app/components/pages/ExhibitorPage";
import PhotosPage from "../app/components/pages/PhotosPage";
import ProgramPage from "../app/components/pages/ProgramPage";
import SpeakerPage from "../app/components/pages/SpeakerPage";
import SponsorPage from "../app/components/pages/SponsorPage";
import StreamingPage from "../app/components/pages/StreamingPage";
import TimetablePage from "../app/components/pages/TimetablePage";
import VideoPage from "../app/components/pages/VideoPage";
import CmsPage from "../app/components/pages/CmsPage";
import CustomPage from "../app/components/pages/CustomPage";
import NewsPage from "../app/components/pages/news/NewsPage";
import NewsDetailPage from "../app/components/pages/news/NewsDetailPage";

class RouterOutlet extends React.Component {
  render() {
    // const event = this.props.event;
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <MasterLayoutRoute component={FullPage} exact path="/fullpage" />
            <MasterLayoutRoute component={Home} exact path="/home" />
            <MasterLayoutRoute component={Index} exact path="/:event_url" />
            <MasterLayoutRoute
              component={AttendeesPage}
              exact
              path="/:event_url/attendees"
            />
            <MasterLayoutRoute
              component={NewsDetailPage}
              exact
              path="/:event_url/news-detail/:id"
            />
            <MasterLayoutRoute
              component={NewsPage}
              exact
              path="/:event_url/news"
            />
            <MasterLayoutRoute
              component={GalleryPage}
              exact
              path="/:event_url/gallery"
            />
            <MasterLayoutRoute
              component={PhotosPage}
              exact
              path="/:event_url/photos"
            />
            <MasterLayoutRoute
              component={VideoPage}
              exact
              path="/:event_url/videos"
            />
            <MasterLayoutRoute
              component={CmsPage}
              exact
              path="/:event_url/additional_information"
            />
            <MasterLayoutRoute
              component={CmsPage}
              exact
              path="/:event_url/general_information"
            />
            <MasterLayoutRoute
              component={CmsPage}
              exact
              path="/:event_url/practicalinformation"
            />
            <MasterLayoutRoute
              component={ProgramPage}
              exact
              path="/:event_url/program"
            />
            <MasterLayoutRoute
              component={SpeakerPage}
              exact
              path="/:event_url/speakers"
            />
            <MasterLayoutRoute
              component={SponsorPage}
              exact
              path="/:event_url/sponsors"
            />
            <MasterLayoutRoute
              component={ExhibitorPage}
              exact
              path="/:event_url/exhibitors"
            />
            <MasterLayoutRoute
              component={StreamingPage}
              exact
              path="/:event_url/streaming"
            />
            <MasterLayoutRoute
              component={TimetablePage}
              exact
              path="/:event_url/Timetable"
            />
            <MasterLayoutRoute
              component={CmsPage}
              exact
              path="/:event_url/event_information"
            />
            <MasterLayoutRoute
              component={CustomPage}
              exact
              path="/:event_url/custom/:id"
            />
            <Route component={Error404} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
