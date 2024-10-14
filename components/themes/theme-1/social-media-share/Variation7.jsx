import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  EmailShareButton,
  XIcon,
} from "react-share";

const Variation7 = ({ event, socialMediaShare, labels, settings }) => {

  return (
      <div className="ebs-master-default-wrapper edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding text-white text-center  d-flex align-items-center justify-content-center">
        <div style={{background: 'none'}} className="edgtf-container">
          <div className="edgtf-container-inner container">
           <div className="row align-items-center">
             <div className="col-md-6 text-start">
               <HeadingElement dark={true} label={labels.SECTION_SOCIAL_FRONT_TITLE} align={'left'} />
             </div>
             <div className="col-md-6 d-flex justify-content-end">
               <div className="ebs-social-share ebs-social-share-v2 text-end pb-3">
                 {Object.entries(socialMediaShare).map(([alias, status]) => {
                   if (status === 1) {
                     switch (alias) {
                       case 'Facebook':
                         return (
                             <FacebookShareButton
                                 key={alias}
                                 background={'#000'}
                                 url={`${window.location.origin.toString()}/${event.url}`}
                             >
                               <FacebookIcon size={120} style={{borderRadius: 10}} enableBackground={false} title="Facebook" />
                             </FacebookShareButton>
                         );
                       case 'Linkedin':
                         return (
                             <LinkedinShareButton
                                 key={alias}
                                 url={`${window.location.origin.toString()}/${event.url}`}
                             >
                               <LinkedinIcon size={120} style={{borderRadius: 10}} enableBackground={false} title="Linked In" />
                             </LinkedinShareButton>
                         );
                       case 'Twitter':
                         return (
                             <TwitterShareButton
                                 key={alias}
                                 url={`${window.location.origin.toString()}/${event.url}`}
                             >
                               <XIcon size={120} style={{borderRadius: 10}} enableBackground={false} title="Twitter" />
                             </TwitterShareButton>
                         );
                       case 'Pinterest':
                         return (
                             <PinterestShareButton
                                 key={alias}
                                 url={`${window.location.origin.toString()}/${event.url}/`}
                                 media={
                                   event.settings.header_logo
                                       ? `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                                       : `${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
                                 }
                             >
                               <PinterestIcon size={120} style={{borderRadius: 10}} enableBackground={false} title="Pinterest" />
                             </PinterestShareButton>
                         );
                       case 'Email':
                         return (
                             <EmailShareButton
                                 key={alias}
                                 url={`${window.location.origin.toString()}/${event.url}`}
                             >
                               <EmailIcon size={120} style={{borderRadius: 10}} enableBackground={false} title="Email" />
                             </EmailShareButton>
                         );
                       default:
                         return null;
                     }
                   }
                 })}
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
  );
};

export default Variation7;
