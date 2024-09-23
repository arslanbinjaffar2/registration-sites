import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { globalSelector } from "store/Slices/GlobalSlice";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "./ui-components/PageLoader";
import EventDescription from "./modules/EventDescription";
import PageContent from "./modules/manage-packages/PageContent";
import ReactFullpage from "@fullpage/react-fullpage";

// Lazy imports
const Speaker = lazy(() => import("components/modules/speakers/Speaker"));
const Gallery = lazy(() => import("components/modules/Gallery"));
const Video = lazy(() => import("components/modules/Video"));
const Sponsor = lazy(() => import("components/modules/sponsor/Sponsor"));
const Program = lazy(() => import("components/modules/program/Program"));
const Exhibitor = lazy(() => import("components/modules/exhibitor/Exhibitor"));
const SocialShare = lazy(() => import("components/modules/SocialShare"));
const Counter = lazy(() => import("components/modules/Counter"));
const RegisterNow = lazy(() => import("components/modules/RegisterNow"));
const Banner = lazy(() => import("components/modules/Banner"));
const Map = lazy(() => import("components/modules/Map"));
const EventInformation = lazy(() => import("components/modules/EventInformation"));
const NewsLetterSubscription = lazy(() => import("components/modules/NewsLetterSubscription"));
const CustomSection1 = lazy(() => import("components/modules/CustomSection1"));
const CustomSection2 = lazy(() => import("components/modules/CustomSection2"));
const CustomSection3 = lazy(() => import("components/modules/CustomSection3"));
const SortableBanner = lazy(() => import("components/modules/SortableBanner"));
const News = lazy(() => import("components/modules/news/News"));

const Index2 = () => {
  const { event } = useSelector(eventSelector);
  const { loadedSections, loadCount } = useSelector(globalSelector);
  const { layoutSections } = event;

  const renderSections = () => {
    return layoutSections.map((section, i) => {
      if (section.status !== 1) return null;

      switch (section.module_alias) {
        case "social_media_share":
          return (
            <div className="section overflow-hidden" key={i}>
              <SocialShare />
            </div>
          );
        case "event_description":
          return (
            <div className="section overflow-hidden" key={i}>
              <EventDescription event={event} />
            </div>
          );
        case "custom_html1":
          return (
            <div className="section overflow-hidden" key={i}>
              <CustomSection1 />
            </div>
          );
        case "custom_html2":
          return (
            <div className="section overflow-hidden" key={i}>
              <CustomSection2 />
            </div>
          );
        case "custom_html3":
          return (
            <div className="section overflow-hidden" key={i}>
              <CustomSection3 />
            </div>
          );
        case "event_info":
          return (
            <div className="section overflow-hidden" key={i}>
              <EventInformation />
            </div>
          );
        case "newsletter_subscription":
          return (
            <div className="section overflow-hidden" key={i}>
              <NewsLetterSubscription />
            </div>
          );
        case "agenda":
          return (
            <div className="section overflow-hidden" key={i}>
              <Program homePage={true} />
            </div>
          );
        case "sponsor":
          return (
            <div className="section overflow-hidden" key={i}>
              <Sponsor homePage={true} />
            </div>
          );
        case "top_banner":
          return (
            <div className="section overflow-hidden" key={i}>
              <Banner />
            </div>
          );
        case "banner_sort":
          return (
            <div className="section overflow-hidden" key={i}>
              <SortableBanner />
            </div>
          );
        case "register_now":
          return (
            <div className="section overflow-hidden" key={i}>
              <RegisterNow />
            </div>
          );
        case "exhibitor":
          return (
            <div className="section overflow-hidden" key={i}>
              <Exhibitor homePage={true} />
            </div>
          );
        case "speaker":
          return (
            <div className="section overflow-hidden" key={i}>
              <Speaker homePage={true} />
            </div>
          );
        case "map":
          return (
            <div className="section overflow-hidden" key={i}>
              <Map />
            </div>
          );
        case "video":
          return (
            <div className="section overflow-hidden" key={i}>
              <Video homePage={true} />
            </div>
          );
        case "gallery":
          return (
            <div className="section overflow-hidden" key={i}>
              <Gallery homePage={true} />
            </div>
          );
        case "news":
          return (
            <div className="section overflow-hidden" key={i}>
              <News homePage={true} />
            </div>
          );
        case "count_down":
          return (
            <div className="section overflow-hidden" key={i}>
              <Counter homePage={true} />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <React.Fragment>
        {loadedSections !== loadCount && <PageLoader className="fixed" />}
        {event && layoutSections && (
          <ReactFullpage
            licenseKey={"YOUR_KEY_HERE"}
            scrollingSpeed={1000}
            render={() => {
              return (
                <ReactFullpage.Wrapper>{renderSections()}</ReactFullpage.Wrapper>
              );
            }}
          />
        )}
      </React.Fragment>
    </Suspense>
  );
};

export default Index2;
