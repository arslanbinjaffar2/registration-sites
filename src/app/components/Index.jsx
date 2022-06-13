// import Slider from '@/modules/Slider';
// import Timetable from '@/modules/Timetable';
// import CustomSection from "@/themes/theme-1/custom-sections/CustomSection";
// import Map from "@/modules/Map";
import React, {Suspense, lazy} from "react";
import { globalSelector } from "store/Slices/GlobalSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector } from "react-redux";

import PageLoader from "./ui-components/PageLoader";
import FullPageLoader from "./ui-components/FullPageLoader";

const Speaker = lazy(() => import("@/modules/speakers/Speaker"));
const Gallery = lazy(() => import("@/modules/Gallery"));
const Video = lazy(() => import("@/modules/Video"));
const Sponsor = lazy(() => import("@/modules/sponsor/Sponsor"));
// const Program = lazy(() => import("@/modules/program/Program"));
const Exhibitor = lazy(() => import("@/modules/exhibitor/Exhibitor"));
const SocialShare = lazy(() => import("@/modules/SocialShare"));
const RegisterNow = lazy(() => import("@/modules/RegisterNow"));
const Banner = lazy(() => import("@/modules/Banner"));
const Map = lazy(() => import("@/modules/Map"));
const CustomSection1 = lazy(() => import("@/modules/CustomSection1"));
const CustomSection2 = lazy(() => import("@/modules/CustomSection2"));



const Index = () => {
  const { event } = useSelector(eventSelector);
  const { loadedSections, loadCount } = useSelector(globalSelector);
  const { layoutSections } = event;
  
  return (
    <Suspense fallback={<PageLoader/>}>
      <React.Fragment>
        {loadedSections !== loadCount && <PageLoader className="fixed" />}    
        {event &&
          layoutSections &&
          layoutSections.map((section, i) => {
            return (() => {
              if (section.module_alias === "social_media_share" && section.status === 1)
                return <SocialShare key={i} />;
              else if (section.module_alias === "event_title_info" && section.status === 1)
                return <div key={i}></div>;
              else if (section.module_alias === "custom_html2" && section.status === 1)
                return <CustomSection2 key={i}/>;
              else if (section.module_alias === "custom_html1" && section.status === 1)
                return <CustomSection1 key={i} />;
              else if (section.module_alias === "event_info" && section.status === 1) return <div key={i}></div>;
              // else if (section.module_alias === "agenda" && section.status === 1)
              //   return <Program homePage={true} key={i} />;
              else if (section.module_alias === "sponsor" && section.status === 1)
                return <Sponsor homePage={true} key={i} />;
              else if (section.module_alias === "top_banner" && section.status === 1) return <Banner key={i} />;
              else if (section.module_alias === "register_now" && section.status === 1)
                return <RegisterNow key={i}/>;
              else if (section.module_alias === "exhibitor" && section.status === 1)
                return <Exhibitor homePage={true} key={i} />;
              else if (section.module_alias === "speaker" && section.status === 1)
                return <Speaker homePage={true} key={i} />;
              else if (section.module_alias === "map" && section.status === 1) 
              return <Map key={i} />;
              else if (section.module_alias === "video" && section.status === 1)
                return <Video homePage={true} key={i} />;
              else if (section.module_alias === "gallery" && section.status === 1)
                return <Gallery homePage={true} key={i} />;
              else if (section.module_alias === "streaming" && section.status === 1) return <div key={i}></div>;
              else if (section.module_alias === "waiting_list" && section.status === 1)
                return <div key={i}></div>;
            })();
          })}
      </React.Fragment>
    </Suspense>

  );
};

export default Index;
