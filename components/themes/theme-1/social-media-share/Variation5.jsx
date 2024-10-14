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

const Variation5 = ({ event, settings, socialMediaShare, labels }) => {
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div
      style={bgStyle}
      className="edgtf-parallax-section-holder ebs-default-padding ebs-master-default-wrapper"
    >
      <div className="container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
        <div className="ebs-social-share text-center pb-3">
          {Object.entries(socialMediaShare).map(([alias, status]) => {
            if (status === 1) {
              switch (alias) {
                case "Facebook":
                  return (
                    <FacebookShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <FacebookIcon
                        size={120}
                        borderRadius="6px"
                        title="Facebook"
                      />
                    </FacebookShareButton>
                  );
                case "Linkedin":
                  return (
                    <LinkedinShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <LinkedinIcon
                        size={120}
                        borderRadius="6px"
                        title="Linked In"
                      />
                    </LinkedinShareButton>
                  );
                case "Twitter":
                  return (
                    <TwitterShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <XIcon size={120} borderRadius="6px" title="Twitter" />
                    </TwitterShareButton>
                  );
                case "Pinterest":
                  return (
                    <PinterestShareButton
                      url={`${window.location.origin.toString()}/${event.url}/`}
                      media={
                        event.settings.header_logo
                          ? `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/event/branding/${event.settings.header_logo}`
                          : `${process.env.NEXT_APP_EVENTCENTER_URL}/_mobile_assets/images/logo-header@2x.png`
                      }
                    >
                      <PinterestIcon
                        size={120}
                        borderRadius="6px"
                        title="Pinterest"
                      />
                    </PinterestShareButton>
                  );
                case "Email":
                  return (
                    <EmailShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <EmailIcon size={120} borderRadius="6px" title="Email" />
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
  );
};

export default Variation5;
