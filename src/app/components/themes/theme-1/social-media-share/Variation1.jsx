import React from "react";
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

const Variation1 = ({ event }) => {
  return (
    <div style={{ paddingTop: "80px" }} className="edgtf-container pb-5">
      <div className="edgtf-container-inner">
        <div className="edgtf-title-section-holder text-center pb-1">
          <h2 className="edgtf-title-with-dots edgtf-appeared">
            Share on social media
          </h2>
          <span className="edge-title-separator edge-enable-separator" />
        </div>
        <div className="ebs-social-share text-center pb-3">
          <FacebookShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <FacebookIcon size={48} round={true} title="Facebook" />
          </FacebookShareButton>
          <LinkedinShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <LinkedinIcon size={48} round={true} title="Linked In" />
          </LinkedinShareButton>
          <TwitterShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <TwitterIcon size={48} round={true} title="Twitter" />
          </TwitterShareButton>
          <PinterestShareButton
            url={`${window.location.origin.toString()}/${event.url}/`}
            media={
              event.settings.header_logo
                ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                : `${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
            }
          >
            <PinterestIcon size={48} round={true} title="Pinterest" />
          </PinterestShareButton>
          <EmailShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <EmailIcon size={48} round={true} title="Facebook" />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default Variation1;
