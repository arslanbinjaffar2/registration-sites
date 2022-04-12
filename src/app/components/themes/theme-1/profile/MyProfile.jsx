import React from 'react';

const MyProfile = () =>  {
  return (
    <div  className="edgtf-container ebs-my-profile-area pb-5">
      <div className="edgtf-container-inner">
        <div className="ebs-header">
          <h2>My profile</h2>
        </div>
        <div className="ebs-my-account-container">
          <div className="ebs-my-profile-section">
            <div className="row d-flex">
              <div className="col-md-3">
                <div className="ebs-my-profile-left">
                  <div className="ebs-my-profile-image">
                    <img className="ebs-image-solid" src="https://via.placeholder.com/157.png" alt="" />
                    <div className="ebs-my-profile-detail">
                      <div className="ebs-profile-name">Mr Jack Notem</div>
                      <div className="ebs-profile-status">Admin</div>
                      <div className="ebs-profile-message">
                        A small river named Duden flows by their place and supplies.
                      </div>
                    </div>
                  </div>
                  <div className="ebs-profile-social-media">
                    <div className="ebs-profile-media-icons">
                      <a href="#!"><img src={require('img/ico-facebook.svg')} alt="" /></a>
                      <a href="#!"><img src={require('img/ico-twitter.svg')} alt="" /></a>
                      <a href="#!"><img src={require('img/ico-linkedin.svg')} alt="" /></a>
                    </div>
                    <div className="ebs-profile-social-links">
                      <div className="ebs-profile-social-links-row">
                        <strong>Phone:</strong>
                        <span>(+1) 457 7845 2487</span>
                      </div>
                      <div className="ebs-profile-social-links-row">
                        <strong>Email:</strong>
                        <span>Jacknotem@support.com</span>
                      </div>
                      <div className="ebs-profile-social-links-row">
                        <strong>Website:</strong>
                        <span>www.schnitzel.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="ebs-my-profile-right">
                  <h3 className="ebs-title">Basic Information:</h3>
                  <div className="row d-flex">
                    <div className="col-sm-6">
                      <div className="ebs-profile-information">
                        <div className="ebs-info-row">
                          <strong>Age:</strong>
                          <span>27 years</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Gender:</strong>
                          <span>Male</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>First name Passsport:</strong>
                          <span>Jack</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Date of issue Passport:</strong>
                          <span>June 08, 2020</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Passport no:</strong>
                          <span>87UI87-786775GH</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Age:</strong>
                          <span>27 years</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Gender:</strong>
                          <span>Male</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>First name Passsport:</strong>
                          <span>Jack</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Date of issue Passport:</strong>
                          <span>June 08, 2020</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Passport no:</strong>
                          <span>87UI87-786775GH</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="ebs-profile-information">
                        <div className="ebs-info-row">
                          <strong>Birthday:</strong>
                          <span>August 02, 1986</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Place of birth:</strong>
                          <span>Denmark</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Last name Passport:</strong>
                          <span>Noten</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Date of Expiry Passport:</strong>
                          <span>June 08, 2020</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Spoken Languages :</strong>
                          <span>English,    Danish,    Arabic</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Birthday:</strong>
                          <span>August 02, 1986</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Place of birth:</strong>
                          <span>Denmark</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Last name Passport:</strong>
                          <span>Noten</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Date of Expiry Passport:</strong>
                          <span>June 08, 2020</span>
                        </div>
                        <div className="ebs-info-row">
                          <strong>Spoken Languages :</strong>
                          <span>English,    Danish,    Arabic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  MyProfile;