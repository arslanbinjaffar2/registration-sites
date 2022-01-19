import React from "react";
const Variation1 = ({ videos }) => {
  console.log(videos);
  const imgUrl = (photo) => {
    if (photo.image && photo.image !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image
    } else {
      return "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"
    }
  };

  return (
    <div className="edgtf-image-gallery clearfix">
      <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
        {videos &&
          videos.map((photo, i) => {
            return (
              <div key={i} className="edgtf-gallery-image" >
                  <span title="home-2-gallery-img-1">
                    <img
                      style={{ width: "100%" }}
                      src={imgUrl(photo)}
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
