import * as React from 'react';
import Masonry from "react-masonry-css";
class ImageGalleryv4 extends React.Component {
  render() {
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
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x350/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x250/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x450/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x550/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x150/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x300/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x400/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x150/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x250/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
              <div className="gallerMasonry">
                <figure>
                  <img src="https://via.placeholder.com/350x150/" alt="" />
                  <figcaption>
                    <div class="icon" aria-hidden="true" data-icon="L"></div>
                  </figcaption>
                </figure>
              </div>
            </Masonry>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageGalleryv4;
