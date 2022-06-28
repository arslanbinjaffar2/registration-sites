
import React from "react";
import Masonry from "react-masonry-css";
import { PortalWithState } from "react-portal";
import Videopopup from "components/Videopopup";
import HeadingElement from 'components/ui-components/HeadingElement';
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'

const Variation4 = ({ videos, loadMore, eventUrl, home, siteLabels }) => {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div  className="module-section ebs-default-padding">
      <div className="container">
        <div className="gallerMasonry">
          {videos && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {videos &&
                videos.map((photo, i) => (
                  // 
                  <div style={{ animationDelay: 50 * i + 'ms' }} key={i} className="gallerMasonry ebs-animation-layer">
                    <PortalWithState closeOnOutsideClick closeOnEsc>
                      {({ openPortal, closePortal, isOpen, portal }) => (
                        <React.Fragment>
                          <figure style={{ overflow: 'hidden' }} className="gallery-img-wrapper-rectangle" onClick={openPortal}>
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
                            <div className="ebs-video-button-inner ebs-right-top">
                              <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </div>
                            <figcaption>
                              {photo.info && (
                                <div
                                  className="icon"
                                  style={{
                                    border: "none",
                                    padding: "10px",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    lineHeight: "1.2",
                                  }}
                                >
                                  {Object.keys(photo.info)}
                                </div>
                              )}
                            </figcaption>
                          </figure>
                          {portal(
                            <Videopopup
                              url={photo.video_path && process.env.NEXT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
                              onClose={closePortal} />
                          )}
                        </React.Fragment>
                      )}
                    </PortalWithState>

                  </div>
                  // 
                ))}
            </Masonry>
          )}
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
  );
};

export default Variation4;
