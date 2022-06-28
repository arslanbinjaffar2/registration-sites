import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "components/Videopopup";
import HeadingElement from "components/ui-components/HeadingElement";
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'

const Variation6 = ({ videos, loadMore, eventUrl, home, siteLabels }) => {

  return (
    <div style={{ padding: "80px 0" }} className="module-section">
      <div className="container">
        <div className="edgtf-portfolio-list-holder-outer edgtf-ptf-gallery-with-space edgtf-dark">
          <div className="edgtf-portfolio-list-holder">
            <div className="d-flex row">
              {videos &&
                videos.map((photo, i) => (
                  <div key={i} className="col-md-4 col-lg-3 col-sm-6">
                    <PortalWithState closeOnOutsideClick closeOnEsc>
                      {({ openPortal, closePortal, isOpen, portal }) => (
                        <React.Fragment>
                          <article
                            onClick={openPortal}
                            className="edgtf-portfolio-item mix ebs-animation-layer"
                            style={{ display: "block", visibility: "visible", animationDelay: 50 * i + 'ms' }}
                          >
                            <div className="ebs-video-button-inner ebs-right-top">
                              <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </div>
                            <div className="edgtf-item-image-holder gallery-img-wrapper-rectangle">
                              {photo.thumnail && photo.thumnail !== "" ? (
                                <img
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  style={{ width: "100%" }}
                                  src={process.env.NEXT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.thumnail}
                                  alt="g"
                                />
                              ) : (
                                <Image
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  style={{ width: "100%" }}
                                  src={require("public/img/gallery-not-found.png")}
                                  alt="g"
                                />
                              )}
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
                              url={photo.video_path && process.env.NEXT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
                              onClose={closePortal} />
                          )}
                        </React.Fragment>
                      )}
                    </PortalWithState>
                  </div>
                ))}
            </div>
          </div>
          {!home && loadMore()}
          {home && <div className="container p-0 pt-5 text-center">
            <ActiveLink href={`/${eventUrl}/videos`}>
              <button
                className="edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color"
              >
                Load More
              </button>
            </ActiveLink>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Variation6;
