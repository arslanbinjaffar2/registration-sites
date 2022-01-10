import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from "@/Index";
import FullPage from "@/FullPage";
import Home from "@/Home";
import Header from "@/modules/Header";
import Error404 from "@/Error404";
import AttendeesPage from "@/pages/AttendeesPage";
import GalleryPage from "@/pages/GalleryPage";
import ExhibitorPage from "@/pages/ExhibitorPage";
import PhotosPage from "@/pages/PhotosPage";
import ProgramPage from "@/pages/ProgramPage";
import SpeakerPage from "@/pages/SpeakerPage";
import SponsorPage from "@/pages/SponsorPage";
import StreamingPage from "@/pages/StreamingPage";
import TimetablePage from "@/pages/TimetablePage";
import VideoPage from "@/pages/VideoPage";
import CmsPage from "@/pages/CmsPage";
import CustomPage from "@/pages/CustomPage";
import NewsPage from "@/pages/news/NewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage";
import MasterLayoutMyAccount from "@/layout/MasterLayoutMyAccount";
import AttendeeLayout from "@/AttendeeLayout";
import MyProfile from "@/themes/theme-1/profile/MyProfile";
import MyProfileEdit from "@/themes/theme-1/profile/MyProfileEdit";
import attendeeDetail from "@/themes/theme-1/attendee/attendeeDetail";

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
            <MasterLayoutMyAccount
              component={MyProfile}
              exact
              path="/:event_url/profile"
            />
            <MasterLayoutMyAccount
              component={MyProfileEdit}
              exact
              path="/:event_url/profile/edit"
            />
            <Route
              component={AttendeeLayout}
              exact
              path="/:event_url/attendees"
            />
            <Route
              component={attendeeDetail}
              exact
              path="/:event_url/attendees/detail"
            />
            <Route component={Error404} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
