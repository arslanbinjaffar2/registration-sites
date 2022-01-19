import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "../../../Videopopup";

const Variation2 = ({ videos }) => {
  const imgUrl = (photo) => {
    if (photo.thumnail && photo.thumnail !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.thumnail
    } else {
      return "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
    }
  };
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div className="edgtf-title-section-holder mb-5">
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Conference Video Gallery
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>

              <h6 className="edgtf-section-subtitle">
                Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad
                his suavitate complectitur ruis dicant facilisi atvimsed eu
                justo evertitur
              </h6>
            </div>
          </div>
        </div>
        <div className="edgtf-portfolio-list-holder-outer edgtf-ptf-gallery-with-space edgtf-dark">
          <div className="edgtf-portfolio-list-holder d-flex row">
                {videos &&
                  videos.map((photo, i) => (
                    <div key={i} className="col-md-4 col-sm-6">
                      <PortalWithState closeOnOutsideClick closeOnEsc>
                      {({ openPortal, closePortal, isOpen, portal }) => (
                        <React.Fragment>
                          <article
                            onClick={openPortal}
                            className="edgtf-portfolio-item mix"
                            style={{ display: "block", visibility: "visible" }}
                          >
                            <div className="ebs-video-button-inner ebs-right-top">
                                <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </div>
                            <div className="edgtf-item-image-holder">
                              <img
                                style={{ width: "100%" }}
                                src={imgUrl(photo)}
                                alt="g"
                              />
                            </div>
                            <div className="edgtf-item-text-overlay">
                              <div className="edgtf-item-text-overlay-inner">
                                <div className="edgtf-item-text-holder">
                                  {photo.info && (
                                    <h4 className="edgtf-item-title">
                                      {Object.keys(photo.info)}
                                    </h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          </article>
                          {portal(
                            <Videopopup
                                url={photo.video_path && process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
                                onClose={closePortal} />
                          )}
                          </React.Fragment>
                        )}
                      </PortalWithState>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation2;
