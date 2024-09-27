import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { globalSelector } from "store/Slices/GlobalSlice";
import { eventSelector } from "store/Slices/EventSlice";
import PageLoader from "./ui-components/PageLoader";
import EventDescription from "./modules/EventDescription";
import PageContent from "./modules/manage-packages/PageContent";
import ReactFullpage from "@fullpage/react-fullpage";

// Lazy imports
import Footer from "./modules/Footer";
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
const pluginWrapper = () => {
  
  require(`public/fullpage.scrollOverflowReset.min`);
};

const Index2 = () => {
  const { event } = useSelector(eventSelector);
  const { loadedSections, loadCount } = useSelector(globalSelector);
  const { layoutSections } = event;

  const renderSections = () => {
    return layoutSections.map((section, i) => {
      if (section.status !== 1) return null;

      const wrapWithDiv = (Component, props = {}) => (
        <div className="section" key={i}>
          <div className="inner-section">
            <Component {...props} />
          </div>
        </div>
      );

      switch (section.module_alias) {
        case "social_media_share":
          return wrapWithDiv(SocialShare);
        case "event_description":
          return wrapWithDiv(EventDescription, { event });
        case "custom_html1":
          return wrapWithDiv(CustomSection1);
        case "custom_html2":
          return wrapWithDiv(CustomSection2);
        case "custom_html3":
          return wrapWithDiv(CustomSection3);
        case "event_info":
          return wrapWithDiv(EventInformation);
        case "newsletter_subscription":
          return wrapWithDiv(NewsLetterSubscription);
        case "agenda":
          return wrapWithDiv(Program, { homePage: true });
        case "sponsor":
          return wrapWithDiv(Sponsor, { homePage: true });
        case "top_banner":
          return wrapWithDiv(Banner);
        case "banner_sort":
          return wrapWithDiv(SortableBanner);
        case "register_now":
          return wrapWithDiv(RegisterNow);
        case "exhibitor":
          return wrapWithDiv(Exhibitor, { homePage: true });
        case "speaker":
          return wrapWithDiv(Speaker, { homePage: true });
        case "map":
          return wrapWithDiv(Map);
        case "video":
          return wrapWithDiv(Video, { homePage: true });
        case "gallery":
          return wrapWithDiv(Gallery, { homePage: true });
        case "news":
          return wrapWithDiv(News, { homePage: true });
        case "count_down":
          return wrapWithDiv(Counter, { homePage: true });
        case "registration_packages":
          return wrapWithDiv(PageContent, { homePage: true });
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
            pluginWrapper={pluginWrapper}
            licenseKey={"2M0Y7-J7Q98-3ZUK9-56J4J-JZJWP"}
            scrollOverflowResetKey={"6D0952DB-42C940EC-9A06348B-76575F8A"}
            scrollingSpeed={1000}
            scrollOverflowReset={true}
            scrollOverflow={true}
            autoScrolling={true}
            scrollHorizontally={true}
            navigation
            navigationPosition={"right"}
            render={() => {
              return (
                <ReactFullpage.Wrapper>
                  {renderSections()}
                  <div className="section">
                    <div className="inner-section">
                      <Footer  />
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              );
            }}
          />
        )}
      </React.Fragment>
    </Suspense>
  );
};

export default Index2;
