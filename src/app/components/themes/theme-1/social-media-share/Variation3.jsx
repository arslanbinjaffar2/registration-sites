import React, { useEffect, useRef } from "react";
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

const Variation3 = ({ event, settings, socialMediaShare, labels }) => {
  const _parallax = useRef(null); 
  const _bgimage =
    settings && settings.background_image !== ""
      ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/variation_background/${settings.background_image}`
      : require("img/h1-parallax1.jpg");
      useEffect(() => {
        window.addEventListener("scroll",scollEffect);
        return () => {
          window.removeEventListener("scroll",scollEffect);
        }
      }, [])
      
       function scollEffect () {
        const scrolled = window.pageYOffset;
        const itemOffset = _parallax.current.offsetTop;
        const itemHeight = _parallax.current.getBoundingClientRect();
        if (scrolled < (itemOffset - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
        _parallax.current.style.backgroundPosition = `50%  -${(scrolled * 0.08)}px`;;
      };
  return (
    <div style={{backgroundImage: `url(${_bgimage})`,padding: "100px 0",}}
      className="edgtf-parallax-section-holder"
      ref={_parallax}>
      <div className="container">
        <HeadingElement dark={true} label={labels.SECTION_SOCIAL_FRONT_TITLE}  align={'center'} />
        <div className="ebs-social-share text-center pb-3">
          {socialMediaShare.Facebook && <FacebookShareButton url={`${window.location.origin.toString()}/${event.url}`}
          >
            <FacebookIcon size={60} bgStyle={{fill: 'transparent'}} 
             round={true} title="Facebook" />
          </FacebookShareButton>}
          {socialMediaShare.Linkedin && <LinkedinShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <LinkedinIcon size={60} bgStyle={{fill: 'transparent'}}
             round={true} title="Linked In" />
          </LinkedinShareButton>}
          {socialMediaShare.Twitter &&  <TwitterShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <TwitterIcon size={60} bgStyle={{fill: 'transparent'}}
              round={true} title="Twitter" />
          </TwitterShareButton>}
          {socialMediaShare.Pinterest && <PinterestShareButton
            url={`${window.location.origin.toString()}/${event.url}/`}
            media={
              event.settings.header_logo
                ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                : `${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
            }
          >
            <PinterestIcon size={60} bgStyle={{fill: 'transparent'}}
              round={true} title="Pinterest" />
          </PinterestShareButton>}
          {socialMediaShare.Email && <EmailShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <EmailIcon size={60} bgStyle={{fill: 'transparent'}}
              round={true} title="Facebook" />
          </EmailShareButton>}
        </div>
      </div>
    </div>
  );
};

export default Variation3;
