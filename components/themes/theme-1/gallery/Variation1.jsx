import React from "react";
import { Gallery, Item } from 'react-photoswipe-gallery'
import HeadingElement from "components/ui-components/HeadingElement";
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'
import { getMeta } from 'helpers/helper';

const Variation1 = ({ photos, settings, loadMore, home, eventUrl, sitelabels, totalPages }) => {

  const imgUrl = (photo) => {
    if (photo.image && photo.image !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
    }
  };

  return (
    <div className="module-section">
      <div className="container">
        <HeadingElement dark={false} label={sitelabels.EVENTSITE_PHOTOS} desc={sitelabels.EVENTSITE_PHOTOS_SUB} align={settings.text_align} />
      </div>
      <div className="edgtf-image-gallery clearfix">
        <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
          <Gallery shareButton={false} id="my-gallery">
            {photos &&
              photos.map((photo, i) => {
                return (
                  <Item
                    key={i}
                    original={imgUrl(photo)}
                    thumbnail={imgUrl(photo)}
                    title={`${Object.keys(photo.info)}`}
                    width={getMeta(imgUrl(photo), 'width') !== 0 ? getMeta(imgUrl(photo), 'width') : 1000}
                    height={getMeta(imgUrl(photo), 'height') !== 0 ? getMeta(imgUrl(photo), 'height') : 665}
                  >
                    {({ ref, open }) => (
                      <div style={{ animationDelay: 50 * i + 'ms' }} ref={ref} onClick={open} className="edgtf-gallery-image ebs-animation-layer" >
                        <span title="home-2-gallery-img-1" className="gallery-img-wrapper-rectangle">
                          {photo.image && photo.image !== "" ? (
                            <img
                              onLoad={(e) => e.target.style.opacity = 1}
                              src={process.env.REACT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image}
                              alt="g"
                            />
                          ) : (
                            <Image
                              onLoad={(e) => e.target.style.opacity = 1}
                              src={require("public/img/gallery-not-found.png")}
                              alt="g"
                            />
                          )}
                        </span>
                      </div>
                    )}
                  </Item>
                );
              })}
          </Gallery>
        </div>
        {!home && loadMore()}
        {home && totalPages > 1 && <div className="container p-0 pt-5 text-center">
          <ActiveLink href={`/${eventUrl}/gallery`}>
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

export default Variation1;
