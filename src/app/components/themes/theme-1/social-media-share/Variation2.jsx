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

const Variation2 = ({ event, socialMediaShare, labels }) => {
  return (
    <div style={{ paddingTop: "80px",paddingBottom: "80px" }} className="edgtf-container">
      <div className="edgtf-container-inner container">
      <HeadingElement dark={false} label={labels.SECTION_SOCIAL_FRONT_TITLE} align={'center'} />
        <div className="ebs-social-share text-center pb-3">
          {socialMediaShare.Facebook && <FacebookShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <FacebookIcon size={120} 
            onMouseOver={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#105DA0';
            }} 
            onMouseLeave={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#313131';
            }} 
            bgStyle={{fill: '#313131'}} round={true} title="Facebook" />
          </FacebookShareButton>}
          {socialMediaShare.Linkedin && <LinkedinShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <LinkedinIcon size={120}
            onMouseOver={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#0E76A8';
            }} 
            onMouseLeave={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#313131';
            }} 
            bgStyle={{fill: '#313131'}} round={true} title="Linked In" />
          </LinkedinShareButton>}
          {socialMediaShare.Twitter && <TwitterShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <TwitterIcon size={120}
              onMouseOver={(e) =>{
                  if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#3FA9F5';
              }} 
              onMouseLeave={(e) =>{
                  if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#313131';
              }}
             bgStyle={{fill: '#313131'}} round={true} title="Twitter" />
          </TwitterShareButton>}
          {socialMediaShare.Pinterest && <PinterestShareButton
            url={`${window.location.origin.toString()}/${event.url}/`}
            media={
              event.settings.header_logo
                ? `${process.env.REACT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                : `${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
            }
          >
            <PinterestIcon size={120}
             onMouseOver={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#e60023';
            }} 
            onMouseLeave={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#313131';
            }}
             bgStyle={{fill: '#313131'}} round={true} title="Pinterest" />
          </PinterestShareButton>}
          {socialMediaShare.Email && <EmailShareButton
            url={`${window.location.origin.toString()}/${event.url}`}
          >
            <EmailIcon size={120}
               onMouseOver={(e) =>{
                if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#E4E7E7';
              }} 
              onMouseLeave={(e) =>{
                  if (e.target.tagName.toLowerCase() === 'circle') e.target.style.fill = '#313131';
              }}
             bgStyle={{fill: '#313131'}} round={true} title="Facebook" />
          </EmailShareButton>}
        </div>
      </div>
    </div>
  );
};

export default Variation2;
