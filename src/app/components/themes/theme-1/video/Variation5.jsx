import React from "react";
import { PortalWithState } from "react-portal";
import Videopopup from "../../../Videopopup";
import HeadingElement from "@/ui-components/HeadingElement";

const Variation1 = ({ videos }) => {
  const imgUrl = (photo) => {
    if (photo.thumnail && photo.thumnail !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.thumnail
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
    }
  };

  return (
  <div style={{ padding: "80px 0" }} className="module-section">
    <div className="container">
      <HeadingElement dark={false} label={'Conference Video Gallery'} desc={'Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi atvimsed eu justo evertitur'} align={'center'} />
    </div>
    <div className="container">
      <div className="edgtf-image-gallery clearfix">
        <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
          {videos &&
            videos.map((photo, i) => {
              return (
                <div key={i} className="edgtf-gallery-image" >
                  <PortalWithState closeOnOutsideClick closeOnEsc>
                  {({ openPortal, closePortal, isOpen, portal }) => (
                    <React.Fragment>
                    <span style={{display: 'block', position: 'relative'}} onClick={openPortal} title="home-2-gallery-img-1">
                          <div className="ebs-video-button-inner">
                            <i className="fa fa-play-circle" aria-hidden="true"></i>
                        </div>
                      <img
                        style={{ width: "100%" }}
                        src={imgUrl(photo)}
                            alt="g"
                          />
                      </span>
                      {portal(
                        <Videopopup
                            url={photo.video_path && process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
                            onClose={closePortal} />
                          )}
                    </React.Fragment>
                      )}
                      </PortalWithState>
                    </div>
                  
                  );
                })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Variation1;
