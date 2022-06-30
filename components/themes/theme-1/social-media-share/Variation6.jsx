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
} from "react-share";


const Variation6 = ({ event, socialMediaShare, labels}) => {
  return (
    <div
      className="edgtf-parallax-section-holder ebs-default-padding">
      <div className="container">
        <HeadingElement dark={false} label={labels.SECTION_SOCIAL_FRONT_TITLE}  align={'center'} />
        <div className="ebs-social-share text-center pb-3 ebs-social-share-v5">
          {socialMediaShare.Facebook && <FacebookShareButton url={`${window.location.origin.toString()}/${event.url}`}
          >
            <FacebookIcon size={60}  title="Facebook" /> <span>Facebook</span> 
          </FacebookShareButton>}
          {socialMediaShare.Linkedin && <LinkedinShareButton url={`${window.location.origin.toString()}/${event.url}`}
          >
            <LinkedinIcon size={60}  title="Linked In" /> <span>Linked In</span>  
          </LinkedinShareButton>}
          {socialMediaShare.Twitter && <TwitterShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <TwitterIcon size={60}  title="Twitter" /> <span>Twitter</span> 
          </TwitterShareButton>}
          {socialMediaShare.Pinterest && <PinterestShareButton
            url={`${window.location.origin.toString()}/${event.url}/`}
            media={
              event.settings.header_logo
                ? `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                : `${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
            }
          >
            <PinterestIcon size={60}  title="Pinterest" /> <span>Pinterest</span>
          </PinterestShareButton>}
          {socialMediaShare.Email && <EmailShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <EmailIcon size={60}  title="Email" /> <span>Email</span>
          </EmailShareButton>}
        </div>
      </div>
    </div>
  );
};

export default Variation6;
