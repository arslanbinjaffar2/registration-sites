// import Slider from '@/modules/Slider';
import Program from "@/modules/Program";
import Speaker from "@/modules/Speaker";
import Banner from "@/modules/Banner";
import Gallery from "@/modules/Gallery";
import Sponsor from "@/modules/Sponsor";
// import Timetable from '@/modules/Timetable';
import Video from "@/modules/Video";
import Exhibitor from "@/modules/Exhibitor";
import SocialShare from "@/themes/theme-1/social/SocialShare";
import CustomSection from "@/themes/theme-1/custom-sections/CustomSection";
import Map from "./modules/Map";
import React, {useEffect} from "react";
import {
    globalSelector,
    incrementLoadCountBy,
  } from "../../store/Slices/GlobalSlice";
import {
    eventSelector
  } from "../../store/Slices/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "./ui-components/PageLoader";

const Index = () => {
const dispatch = useDispatch();
const { event } = useSelector(eventSelector);
const { loadedSections, loadCount } = useSelector(globalSelector);
// useEffect(() => {
//     // dispatch(incrementLoadCountBy(2));
// }, []);
const { eventsiteSections } = event;

  

  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}
      <Banner />
      <CustomSection />
      <SocialShare />
      {/* <Speaker homePage={true} /> */}
      <Map />
      {event &&
        eventsiteSections &&
        eventsiteSections.map((section, i) => {
          return (() => {
            if (section.alias === "social_section") return <div key={i}></div>;
            else if (section.alias === "event_title_info")
              return <div key={i}></div>;
            else if (section.alias === "custom_html2")
              return <div key={i}></div>;
            else if (section.alias === "custom_html1")
              return <div key={i}></div>;
            else if (section.alias === "event_info") return <div key={i}></div>;
            else if (section.alias === "agendas") return <Program homePage={true} key={i} />;
            else if (section.alias === "sponsors") return <Sponsor homePage={true} key={i} />;
            // else if (section.alias === 'bottom_banner')
            //   return ()
            else if (section.alias === "register_now")
              return <div key={i}></div>;
            else if (section.alias === "exhibitors")
              return <Exhibitor homePage={true} key={i} />;
            else if (section.alias === "speakers") return <Speaker homePage={true} key={i} />;
            else if (section.alias === "maps") return <div key={i}></div>;
            else if (section.alias === "videos") return <Video homePage={true} key={i} />;
            else if (section.alias === "photos") return <Gallery homePage={true} key={i} />;
            else if (section.alias === "streaming") return <div key={i}></div>;
            else if (section.alias === "waiting_list")
              return <div key={i}></div>;
          })();
        })}
    </React.Fragment>
  );
};

export default Index;
