import React, { useState } from 'react'

const SponsorListing = () => {
  const [value, setValue] = useState("");
  const _alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return (
    <div data-fixed="true" className="">
    <div
      style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        height: 390,
      }}
      className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border"
    >
      <div className="edgtf-title-holder">
        <div className="edgtf-container clearfix">
          <div className="edgtf-container-inner">
            <div className="edgtf-title-subtitle-holder">
              <div className="edgtf-title-subtitle-holder-inner">
                <h1 style={{ color: "white" }}>
                  <span>Sponsors</span>
                </h1>
                <div className="edgtf-subtitle" style={{color: '#fff'}}>
                  <span>Lorem ipsum dolor sit.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {/* content Section */}
    <div style={{padding: '80px 0'}}>
      <div className="container">
        <div className="row d-flex">
          <div className="col-lg-3">
            <div className="ebs-form-control-search pb-3"><input className="form-control" placeholder="Search..." defaultValue={value} type="text" onChange={(e) => setValue(e.target.value)} />
              <em className="fa fa-search"></em>
            </div>
            <div className="ebs-filter-box pb-4">
              <h4>Filter by products</h4>
              <div className="ebs-filter-items">
                <ul>
                  <li><a className="active" href="#!">All</a> </li>
                  <li><a href="#!">5G</a> </li>
                  <li><a href="#!">Big data</a> </li>
                  <li><a href="#!">Elements all</a> </li>
                  <li><a href="#!">Analytics</a> </li>
                  <li><a href="#!">Order background</a> </li>
                </ul>
              </div>
            </div>
            <div className="ebs-filter-box pb-4">
              <h4>Filter by products</h4>
              <div className="ebs-filter-items">
                <ul>
                  <li><a className="active" href="#!">All</a> </li>
                  <li><a href="#!">5G</a> </li>
                  <li><a href="#!">Big data</a> </li>
                  <li><a href="#!">Elements all</a> </li>
                  <li><a href="#!">Analytics</a> </li>
                  <li><a href="#!">Order background</a> </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ebs-top-filter-container pb-3">
              <ul>
                <li><a className="active" href="#!">All</a> </li>
                <li><a href="#!">#</a> </li>
                  {_alphabet.split('').map((item,k) =>
                  <li className='alpha' key={k}><a href="#!">{item}</a></li>
                  )}
              </ul>
            </div>
            <div className="ebs-sponsor-listing">
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ebs-sponsor-item">
                <div className="d-flex align-items-center ebs-break-block">
                  <div className="ebs-img-listing">
                    <figure>
                      <img src="https://via.placeholder.com/650x350.png" alt="" />
                    </figure>
                  </div>
                  <div className="ebs-detail-listing">
                    <h2>Ambu- int </h2>
                    <div className="d-flex ebs-container-box">
                      <div className="ebs-box"><i className="fa fa-phone" />+78-54-897665</div>
                      <div className="ebs-box"><i className="fa fa-envelope" />Ambuint@gmail.com</div>
                      <div className="ebs-box"><i className="fa fa-bank" />98,107</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* content Section */}
    </div>
  )
}

export default SponsorListing