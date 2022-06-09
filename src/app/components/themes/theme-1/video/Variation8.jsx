
import React from "react";
import Masonry from "react-masonry-css";
import { PortalWithState } from "react-portal";
import Videopopup from "../../../Videopopup";
import HeadingElement from '@/ui-components/HeadingElement';

const Variation8 = ({ videos }) => {
  const imgUrl = (photo) => {
    if (photo.thumnail && photo.thumnail !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.thumnail
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
    }
  };
    const breakpointColumnsObj = {
      default: 3,
      1100: 3,
      700: 2,
      500: 1,
    };
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
       <div className="container">
        <HeadingElement dark={false} label={'Conference Video Gallery'} desc={'Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi atvimsed eu justo evertitur'} align={'center'} />
      </div>
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
                  <div key={i} className="gallerMasonry">
                 <PortalWithState closeOnOutsideClick closeOnEsc>
                    {({ openPortal, closePortal, isOpen, portal }) => (
                     <React.Fragment>
                      <figure onClick={openPortal}> 
                        <img
                        style={{width: '100%'}}
                          src={imgUrl(photo)}
                          alt="g"
                        />
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
                                url={photo.video_path && process.env.REACT_APP_EVENTCENTER_URL + "/assets/videos/" + photo.video_path}
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
      </div>
    </div>
  );
};

export default Variation8;
