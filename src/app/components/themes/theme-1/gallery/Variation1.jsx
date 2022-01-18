import React from "react";

const Variation1 = ({ photos }) => {
  return (
    <div className="edgtf-image-gallery clearfix">
      <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
        {photos &&
          photos.map((photo, i) => {
            return (
              <div className="edgtf-gallery-image" key={i}>
                <span title="home-2-gallery-img-1">
                  <img
                    style={{ width: "100%" }}
                    src={
                      photo.image && photo.image !== ""
                        ? process.env.REACT_APP_EVENTCENTER_URL +
                          "/assets/photos/thumbs/" +
                          photo.image
                        : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
                    }
                    alt="g"
                  />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Variation1;
