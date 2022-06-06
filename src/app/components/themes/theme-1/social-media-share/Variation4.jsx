import React from "react";
import HeadingElement from "@/ui-components/HeadingElement";
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

const Variation4 = ({ event, settings }) => {
  return (
    <div style={{padding: "80px 0",}}
      className="edgtf-parallax-section-holder">
      <div className="container">
        <HeadingElement dark={false} label={'Share on social media'}  align={'center'} />
        <div className="ebs-social-share text-center pb-3">
          <FacebookShareButton url={`${window.location.origin.toString()}/${event.url}`}
          >
            <FacebookIcon size={60} iconFillColor="#242424" bgStyle={{fill: 'transparent'}} 
             round={true} title="Facebook" />
          </FacebookShareButton>
          <LinkedinShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <LinkedinIcon size={60} iconFillColor="#242424" bgStyle={{fill: 'transparent'}}
             round={true} title="Linked In" />
          </LinkedinShareButton>
          <TwitterShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <TwitterIcon size={60} iconFillColor="#242424" bgStyle={{fill: 'transparent'}}
              round={true} title="Twitter" />
          </TwitterShareButton>
          <PinterestShareButton
            url={`${window.location.origin.toString()}/${event.url}/`}
            media={
              event.settings.header_logo
                ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                : `${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
            }
          >
            <PinterestIcon size={60} iconFillColor="#242424" bgStyle={{fill: 'transparent'}}
              round={true} title="Pinterest" />
          </PinterestShareButton>
          <EmailShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <EmailIcon size={60} iconFillColor="#242424" bgStyle={{fill: 'transparent'}}
              round={true} title="Facebook" />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};

export default Variation4;
