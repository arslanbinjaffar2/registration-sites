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

const Variation6 = ({ event, socialMediaShare, labels, settings }) => {
  const bgStyle =
    settings && settings.background_color !== ""
      ? { backgroundColor: settings.background_color }
      : {};

  return (
    <div
      style={bgStyle}
      className="edgtf-parallax-section-holder ebs-default-padding"
    >
      <div className="container">
        <HeadingElement
          dark={false}
          label={labels.SECTION_SOCIAL_FRONT_TITLE}
          align={"center"}
        />
        <div className="ebs-social-share text-center pb-3 ebs-social-share-v5">
          {Object.entries(socialMediaShare).map(([alias, status]) => {
            if (status === 1) {
              switch (alias) {
                case "Facebook":
                  return (
                    <FacebookShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <FacebookIcon size={60} title="Facebook" />{" "}
                      <span>Facebook</span>
                    </FacebookShareButton>
                  );
                case "Linkedin":
                  return (
                    <LinkedinShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <LinkedinIcon size={60} title="Linked In" />{" "}
                      <span>Linked In</span>
                    </LinkedinShareButton>
                  );
                case "Twitter":
                  return (
                    <TwitterShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <XIcon size={60} title="Twitter" /> <span>Twitter</span>
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
                      <PinterestIcon size={60} title="Pinterest" />{" "}
                      <span>Pinterest</span>
                    </PinterestShareButton>
                  );
                case "Email":
                  return (
                    <EmailShareButton
                      url={`${window.location.origin.toString()}/${event.url}`}
                    >
                      <EmailIcon size={60} title="Email" /> <span>Email</span>
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

export default Variation6;
