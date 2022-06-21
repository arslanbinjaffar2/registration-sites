
import React from "react";
import Masonry from "react-masonry-css";
import { Gallery, Item } from 'react-photoswipe-gallery'
import HeadingElement from "components/ui-components/HeadingElement";
import Link from 'next/link'


const Variation6 = ({ photos, settings, loadMore, eventUrl, home, sitelabels, totalPages }) => {
  const imgUrl = (photo) => {
    if (photo.image && photo.image !== "") {
      return process.env.REACT_APP_EVENTCENTER_URL + "/assets/photos/" + photo.image
    } else {
      return "img/home-2-gallery-img-1-480x400.jpg"
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
    const breakpointColumnsObj = {
      default: 3,
      1100: 3,
      700: 2,
      500: 1,
    };
  return (
    <div className="module-section">
      <div className="container">
        <HeadingElement dark={false} label={sitelabels.EVENTSITE_PHOTOS} desc={sitelabels.EVENTSITE_PHOTOS_SUB} align={settings.text_align} />
        <div className="gallerMasonry">
          {photos && (
            <Gallery shareButton={false} id="my-gallery">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {photos &&
                photos.map((photo, i) => (
                  <div style={{animationDelay: 50*i+'ms'}} key={i} className="gallerMasonry ebs-animation-layer">
                    <Item 
                      original={imgUrl(photo)}
                      thumbnail={imgUrl(photo)}
                      title={`${Object.keys(photo.info)}`}
                      width={getMeta(imgUrl(photo),'width') !== 0 ? getMeta(imgUrl(photo),'width') : 1000 }
                      height={getMeta(imgUrl(photo),'height') !== 0 ? getMeta(imgUrl(photo),'height') : 665 }
                      >
                      {({ ref, open }) => (
                      <figure className="gallery-img-wrapper-rectangle" ref={ref} onClick={open}> 
                        <img
                          onLoad={(e) => e.target.style.opacity = 1}
                          src={imgUrl(photo)}
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
                              {`${Object.keys(photo.info)}`}
                            </div>
                          )}
                        </figcaption>
                      </figure>
                      )}
                    </Item>
                  </div>
                ))}
            </Masonry>
            </Gallery>
          )}
        </div>
        {!home && loadMore() }
        {home && totalPages > 1 && <div className="container p-0 pt-5 text-center">
           <Link to={`/${eventUrl}/photos`}>
              <button
                className="edgtf-btn edgtf-btn-medium edgtf-btn-outline edgtf-btn-custom-hover-bg edgtf-btn-custom-border-hover edgtf-btn-custom-hover-color"
              >
                Load More
              </button>
           </Link>
       </div> }
      </div>
    </div>
  );
};

export default Variation6;
