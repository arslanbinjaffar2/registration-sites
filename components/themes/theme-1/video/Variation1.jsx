import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "components/Videopopup";
import HeadingElement from "components/ui-components/HeadingElement";
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'

const Variation1 = ({ videos, loadMore, eventUrl, home, siteLabels, totalPages }) => {

  return (
    <div className="module-section">
      <div className="container">
        <HeadingElement dark={false} label={siteLabels.EVENTSITE_VIDEOS} align={'center'} />
      </div>
      <div className="edgtf-image-gallery clearfix">
        <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
          {videos &&
            videos.map((photo, i) => {
              return (
                <div style={{ animationDelay: 50 * i + 'ms' }} key={i} className="edgtf-gallery-image ebs-animation-layer">
                  <PortalWithState closeOnOutsideClick closeOnEsc>
                    {({ openPortal, closePortal, isOpen, portal }) => (
                      <React.Fragment>
                        <span className="gallery-img-wrapper-rectangle" style={{ display: 'block', position: 'relative' }} onClick={openPortal} title="home-2-gallery-img-1">
                          <div className="ebs-video-button-inner">
                            <i className="fa fa-play-circle" aria-hidden="true"></i>
                          </div>
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
                        </span>
                        {portal(
                          <Videopopup
                            url={photo.video_path && process.env.NEXT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
                            onClose={closePortal} />
                        )}
                      </React.Fragment>
                    )}
                  </PortalWithState>
                </div>

              );
            })}
        </div>
        {!home && loadMore()}
        {home && totalPages > 1 && <div className="container p-0 pt-5 text-center">
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
  );
};

export default Variation1;
