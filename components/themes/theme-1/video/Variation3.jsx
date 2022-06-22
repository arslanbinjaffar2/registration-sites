import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "components/Videopopup";
import HeadingElement from 'components/ui-components/HeadingElement';
import Link from 'next/link'

const Variation3 = ({ videos, loadMore, eventUrl, home, siteLabels }) => {
  const imgUrl = (photo) => {
    if (photo.thumnail && photo.thumnail !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.thumnail
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
    }
  };
  return (
    <div style={{ padding: "40px 0" }} className="module-section">
       <div className="container">
        <HeadingElement dark={false} label={siteLabels.EVENTSITE_VIDEOS} align={'center'} />
      </div>
      <div className="container">
        <div className="edgtf-portfolio-list-holder-outer">
          <div className="edgtf-portfolio-list-holder">
          <div className="d-flex row">
              {videos &&
                videos.map((photo, i) => (
                  <div key={i} className="col-md-4 col-sm-6">
                        <PortalWithState closeOnOutsideClick closeOnEsc>
                          {({ openPortal, closePortal, isOpen, portal }) => (
                        <React.Fragment>
                        <div style={{animationDelay: 50*i+'ms', overflow: 'hidden'}} onClick={openPortal} className="edgtf-image-with-text edgtf-image-with-text-above mb-30px ebs-animation-layer">
                         <div className="ebs-video-button-inner ebs-right-top">
                                <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </div>
                          
                            <div className="edgtf-iwt-image gallery-img-wrapper-rectangle">
                              <img
                                onLoad={(e) => e.target.style.opacity = 1}
                                style={{ width: "100%" }}
                                src={imgUrl(photo)}
                                alt="g"
                              />
                            </div>
                          <div className="edgtf-iwt-text-holder">
                            <div className="edgtf-iwt-text-table">
                              <div className="edgtf-iwt-text-cell">
                                {photo.info && (
                                  <h3 className="edgtf-iwt-title">
                                    {Object.keys(photo.info)}
                                  </h3>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
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
          {!home && loadMore() }
      {home && <div className="container p-0 pt-5 text-center">
           <Link href={`/${eventUrl}/videos`}>
              <button
                className="edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color"
              >
                Load More
              </button>
           </Link>
       </div> }
        </div>
      </div>
    </div>
  );
};

export default Variation3;
