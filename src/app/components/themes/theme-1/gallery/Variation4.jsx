import Masonry from "react-masonry-css";

import React from "react";

const Variation4 = ({ photos }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <div style={{ padding: "80px 0" }} className="module-section">
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
        <div className="gallerMasonry">
          {photos && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {photos &&
                photos.map((photo, i) => (
                  <div key={i} className="gallerMasonry">
                    <figure>
                      <img
                        src={
                          photo.image && photo.image !== ""
                            ? process.env.REACT_APP_EVENTCENTER_URL +
                              "/assets/photos/" +
                              photo.image
                            : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
                        }
                        alt="g"
                      />
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
                  </div>
                ))}
            </Masonry>
          )}
        </div>
      </div>
    </div>
  );
};

export default Variation4;
