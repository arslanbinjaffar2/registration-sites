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
const CmsDetail = ({ detail, moduleName }) => {
  const informationModules = {
    additional_information: "additional_info",
    general_information: "general_info",
    practicalinformation: "event_info",
  };
  return (
    <div style={{ paddingTop: "80px" }} className="edgtf-container">
      <div className="edgtf-container-inner">
        <div
          className={`${ "edgtf-full-width-inner"
          } clearfix`}
        >
          <div className="edgtf-column1 edgtf-content-left-from-sidebar">
            <div className="edgtf-column-inner">
              <div className="edgtf-blog-holder edgtf-blog-type-standard">
                <article>
                  <div className="edgtf-post-content">
                    <div className="edgtf-post-image">
                      <a itemProp="url" href="">
                        <img
                          src={
                            detail.image && detail.image !== ""
                              ? process.env.REACT_APP_EVENTCENTER_URL +
                                `/assets/${informationModules[moduleName]}/` +
                                detail.image
                              : "https://dev.eventbuizz.com/_admin_assets/images/header_logo_size_image.jpg"
                          }
                          className="attachment-full size-full wp-post-image"
                          alt="a"
                          width="1500"
                          height="500"
                        />
                      </a>
                    </div>
                    <div className="edgtf-post-text">
                      <div className="edgtf-post-text-inner">
                        <h2
                          itemProp="name"
                          className="entry-title edgtf-post-title"
                        >
                          <a
                            itemProp="url"
                            href="#!"
                            title="Web Analytics Made Easy"
                          >
                            {detail.name}
                          </a>
                        </h2>
                        <div
                          style={{ marginBottom: 40, marginTop: 0 }}
                          className="edgtf-post-info-bottom"
                        ></div>
                        <p
                          itemProp="description"
                          className="edgtf-post-excerpt"
                          dangerouslySetInnerHTML={{ __html: detail.description }}
                        />

                        {detail.pdf && <div className="infobooth-pdf">
                          <a href={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`} download target="_blank" style={{border:"none !important", float:"left",}}>
                            <img className="infoBoothImage" src={`${process.env.REACT_APP_EVENTCENTER_URL}/_mobile_assets/images/pdf.png`} width="40" style={{border:"none !important"}}/>
                          </a>
                          <a href={`${process.env.REACT_APP_EVENTCENTER_URL}/assets/${informationModules[moduleName]}/${detail.pdf}`} className="link_infobooth" target="_blank" download><span>
                              View Document
                          </span></a>
                        </div>}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CmsDetail;
