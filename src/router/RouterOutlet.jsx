import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MasterLayoutRoute from "@/layout/MasterLayoutRoute";
import Index from "@/Index";
import FullPage from "@/FullPage";
import Home from "@/Home";
import Header from "@/modules/Header";
import Error404 from "@/Error404";
import AttendeesPage from "@/pages/attendees/AttendeesPage";
import AttendeeDetailPage from "@/pages/attendees/AttendeeDetailPage";
import GalleryPage from "@/pages/GalleryPage";
import ExhibitorPage from "@/pages/ExhibitorPage";
import PhotosPage from "@/pages/PhotosPage";
import ProgramPage from "@/pages/ProgramPage";
import SpeakerPage from "@/pages/speakers/SpeakerPage";
import SpeakerDetailPage from "@/pages/speakers/SpeakerDetailPage";
import SponsorPage from "@/pages/SponsorPage";
import StreamingPage from "@/pages/StreamingPage";
import TimetablePage from "@/pages/TimetablePage";
import TimeLine from "@/pages/TimeLine";
import VideoPage from "@/pages/VideoPage";
import CmsPage from "@/pages/CmsPage";
import CustomPage from "@/pages/CustomPage";
import NewsPage from "@/pages/news/NewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage";
import MasterLayoutMyAccount from "@/layout/MasterLayoutMyAccount";
import MyProfile from "@/myAccount/profile/MyProfile";
import MyProfileEdit from "@/myAccount/profile/MyProfileEdit";
import MyBilling from "@/myAccount/profile/MyBilling";
import ManageKeywords from "@/myAccount/profile/ManageKeywords";
import ManageNewsLetter from "@/myAccount/profile/ManageNewsLetter";
import AfterLoginSubRegistration from "@/myAccount/profile/AfterLoginSubRegistration";
import MySubRegistration from "@/myAccount/profile/MySubRegistration";
import SurveyList from "@/myAccount/profile/SurveyList";
import surveyDetail from "@/myAccount/profile/surveyDetail";
import MyProgram from "@/myAccount/profile/MyProgram";

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
              component={TimeLine}
              exact
              path="/:event_url/timeline"
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
            <MasterLayoutMyAccount
              component={ManageKeywords}
              exact
              path="/:event_url/keyword-interest"
            />
            <MasterLayoutMyAccount
              component={ManageNewsLetter}
              exact
              path="/:event_url/news-letter-subscription"
            />
            <MasterLayoutMyAccount
              component={SurveyList}
              exact
              path="/:event_url/surveys"
            />
            <MasterLayoutMyAccount
              component={surveyDetail}
              exact
              path="/:event_url/survey/:survey_id"
            />
            <MasterLayoutMyAccount
              component={MyProgram}
              exact
              path="/:event_url/my-program/"
            />
            <MasterLayoutMyAccount
              component={AfterLoginSubRegistration}
              exact
              path="/:event_url/sub-registration-after-login"
            />
            <MasterLayoutMyAccount
              component={MySubRegistration}
              exact
              path="/:event_url/my-sub-registration"
            />
            <MasterLayoutMyAccount
              component={MyBilling}
              exact
              path="/:event_url/profile/my-billing"
            />
            <Route
              component={AttendeesPage}
              exact
              path="/:event_url/attendees"
            />
            <Route
              component={AttendeeDetailPage}
              exact
              path="/:event_url/attendees/:id"
            />
            <Route
              component={SpeakerDetailPage}
              exact
              path="/:event_url/speakers/:id"
            />
            <Route component={Error404} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default RouterOutlet;
