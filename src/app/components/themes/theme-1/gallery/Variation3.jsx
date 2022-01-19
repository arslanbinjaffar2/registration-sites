import React from "react";
import { Gallery, Item } from 'react-photoswipe-gallery'

const Variation3 = ({ photos }) => {
  const imgUrl = (photo) => {
    if (photo.image && photo.image !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image
    } else {
      return "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
    }
  };
  const getMeta = (url,type) => {
    const img = new Image();
    img.src = url;
    if (type === 'width') {
      return img.width;
    } else {
      return img.height
    }
  };
  return (
    <div style={{ padding: "80px 0 0" }} className="module-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <div className="edgtf-title-section-holder mb-5">
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Conference Gallery
              </h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
        </div>
        <div className="edgtf-portfolio-list-holder-outer">
          <div className="edgtf-portfolio-list-holder d-flex row">
            <Gallery shareButton={false} id="my-gallery">
              {photos &&
                photos.map((photo, i) => (
                  <div key={i} className="col-md-4 col-sm-6">
                     <Item
                        key={i} 
                        original={imgUrl(photo)}
                        thumbnail={imgUrl(photo)}
                        title={`${Object.keys(photo.info)}`}
                        width={getMeta(imgUrl(photo),'width') !== 0 ? getMeta(imgUrl(photo),'width') : 1000 }
                        height={getMeta(imgUrl(photo),'height') !== 0 ? getMeta(imgUrl(photo),'height') : 665 }
                        >
                        {({ ref, open }) => (
                        <div ref={ref} onClick={open} className="edgtf-image-with-text edgtf-image-with-text-above mb-30px">
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
                                  <h2 className="edgtf-iwt-title">
                                    {Object.keys(photo.info)}
                                  </h2>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      </Item>
                  </div>
                ))}
              </Gallery>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variation3;
