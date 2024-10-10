import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
const Variation2 = ({map, siteLabels}) => {
  return (
    <div className="edgtf-container ebs-default-padding ebs-master-default-wrapper p-0">
      <div className="w-100">
        <div className="ebs-google-map">
          {map && map.info.url && (
            <div className="position-relative">

            <iframe
              title="google map"
              className="vh-100"
              src={
                map.info.url
                ? map.info.url + "&scrollwheel=false&gestureHandling=none&"
                : "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13603.145696954229!2d74.3470055!3d31.5300254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1640081607060!5m2!1sen!2s&scrollwheel=false"
              }
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              />
                <div style={{zIndex: 10, left: 0, top: 0}} className="w-100 h-100 position-absolute"></div>
              </div>
          )}
          {map && map.info.image && map.info.url === "" && (
            <div className="ebs-default-padding">
              <img
                src={`${
                  process.env.NEXT_APP_EVENTCENTER_URL + "/assets/maps/"
                }${map.info.image}`}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Variation2;
