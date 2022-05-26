// import Slider from '@/modules/Slider';
import Program from "@/modules/Program";
import Speaker from "@/modules/speakers/Speaker";
import Banner from "@/modules/Banner";
import Gallery from "@/modules/Gallery";
import Sponsor from "@/modules/Sponsor";
// import Timetable from '@/modules/Timetable';
import Video from "@/modules/Video";
import Exhibitor from "@/modules/Exhibitor";
import SocialShare from "@/modules/SocialShare";
import CustomSection from "@/themes/theme-1/custom-sections/CustomSection";
import Map from "@/modules/Map";
import React from "react";
import { globalSelector } from "store/Slices/GlobalSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";
import PageLoader from "./ui-components/PageLoader";
import RegisterNow from "@/modules/RegisterNow";
const Index = () => {
  const { event } = useSelector(eventSelector);
  const { loadedSections, loadCount } = useSelector(globalSelector);
  const { layoutSections } = event;
  return (
    <React.Fragment>
      {loadedSections !== loadCount && <PageLoader />}    
      {event &&
        layoutSections &&
        layoutSections.map((section, i) => {
          return (() => {
            if (section.module_alias === "social_media_share" && section.status === 1)
              return <SocialShare key={i} />;
            else if (section.module_alias === "event_title_info" && section.status === 1)
              return <div key={i}></div>;
            else if (section.module_alias === "custom_html2" && section.status === 1)
              return <CustomSection key={i}/>;
            else if (section.module_alias === "custom_html1" && section.status === 1)
              return <CustomSection key={i} />;
            else if (section.module_alias === "event_info" && section.status === 1) return <div key={i}></div>;
            else if (section.module_alias === "agenda" && section.status === 1)
              return <Program homePage={true} key={i} />;
            else if (section.module_alias === "sponsor" && section.status === 1)
              return <Sponsor homePage={true} key={i} />;
            else if (section.module_alias === "top_banner" && section.status === 1) return <Banner key={i} />;
            else if (section.module_alias === "register_now" && section.status === 1)
              return <RegisterNow key={i}/>;
            else if (section.module_alias === "exhibitor" && section.status === 1)
              return <Exhibitor homePage={true} key={i} />;
            else if (section.module_alias === "speaker" && section.status === 1)
              return <Speaker homePage={true} key={i} />;
            else if (section.module_alias === "maps") return <Map key={i} />;
            else if (section.module_alias === "videos" && section.status === 1)
              return <Video homePage={true} key={i} />;
            else if (section.module_alias === "photos" && section.status === 1)
              return <Gallery homePage={true} key={i} />;
            else if (section.module_alias === "streaming" && section.status === 1) return <div key={i}></div>;
            else if (section.module_alias === "waiting_list" && section.status === 1)
              return <div key={i}></div>;
          })();
        })}
    </React.Fragment>
  );
};

export default Index;
