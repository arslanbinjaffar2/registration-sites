import React from "react";
import { Gallery, Item } from 'react-photoswipe-gallery'
import HeadingElement from "components/ui-components/HeadingElement";
import ActiveLink from "components/atoms/ActiveLink";
import Image from 'next/image'
import { getMeta } from 'helpers/helper';

const Variation8 = ({ photos, settings, loadMore, home, eventUrl, sitelabels, totalPages }) => {

  const imgUrl = (photo) => {
    if (photo.image && photo.image !== "") {
      return process.env.NEXT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
    }
  };

  return (
    <div className="module-section">
      <div className="container">
        {/* <HeadingElement dark={false} label={sitelabels.EVENTSITE_PHOTOS} desc={sitelabels.EVENTSITE_PHOTOS_SUB} align={settings.text_align} /> */}
        <div className="edgtf-portfolio-list-holder-outer edgtf-ptf-gallery-with-space edgtf-dark">
          <div className="edgtf-portfolio-list-holder">
            <div className="d-flex row">
              <Gallery shareButton={false} id="my-gallery">
                {photos &&
                  photos.map((photo, i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                      <Item
                        key={i}
                        original={imgUrl(photo)}
                        thumbnail={imgUrl(photo)}
                        title={`${Object.keys(photo.info)}`}
                        width={getMeta(imgUrl(photo), 'width') !== 0 ? getMeta(imgUrl(photo), 'width') : 1000}
                        height={getMeta(imgUrl(photo), 'height') !== 0 ? getMeta(imgUrl(photo), 'height') : 665}
                      >
                        {({ ref, open }) => (
                          <article
                            ref={ref} onClick={open}
                            className="edgtf-portfolio-item mix ebs-animation-layer"
                            style={{ display: "block", visibility: "visible", animationDelay: 50 * i + 'ms', cursor: 'pointer' }}
                          >
                            <div className="edgtf-item-image-holder gallery-img-wrapper-rectangle">
                              {photo.image && photo.image !== "" ? (
                                <img
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  style={{ width: "100%" }}
                                  src={process.env.NEXT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image}
                                  alt="g"
                                />
                              ) : (
                                <Image
                                  onLoad={(e) => e.target.style.opacity = 1}
                                  style={{ width: "100%" }}
                                  src={require("public/img/gallery-not-found.png")}
                                  alt="g"
                                />
                              )}
                            </div>
                            <div className="edgtf-item-text-overlay">
                              <div className="edgtf-item-text-overlay-inner">
                                <div className="edgtf-item-text-holder">
                                  {photo.info && (
                                    <h4 className="edgtf-item-title">
                                      {Object.keys(photo.info)}
                                    </h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          </article>
                        )}
                      </Item>
                    </div>
                  ))}
              </Gallery>
            </div>
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
    </div>
  );
};

export default Variation8;
