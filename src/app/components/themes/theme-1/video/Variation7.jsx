import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "../../../Videopopup";
import HeadingElement from '@/ui-components/HeadingElement';

const Variation7 = ({ videos }) => {
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
        <HeadingElement dark={false} label={'Conference Video Gallery'} desc={'Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi atvimsed eu justo evertitur'} align={'center'} />
      </div>
      <div className="container">
        <div className="edgtf-portfolio-list-holder-outer">
          <div className="edgtf-portfolio-list-holder d-flex row">
              {videos &&
                videos.map((photo, i) => (
                  <div key={i} className="col-md-4 col-lg-3 col-sm-6">
                        <PortalWithState closeOnOutsideClick closeOnEsc>
                          {({ openPortal, closePortal, isOpen, portal }) => (
                        <React.Fragment>
                        <div onClick={openPortal} className="edgtf-image-with-text edgtf-image-with-text-above mb-30px">
                         <div className="ebs-video-button-inner ebs-right-top">
                                <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </div>
                          <div className="edgtf-link-holder">
                            <div className="edgtf-iwt-image">
                              <img
                                style={{ width: "100%" }}
                                src={imgUrl(photo)}
                                alt="g"
                              />
                            </div>
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
      </div>
    </div>
  );
};

export default Variation7;
