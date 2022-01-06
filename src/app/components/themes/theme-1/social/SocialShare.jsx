import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, PinterestIcon} from "react-share";

 class SocialShare extends Component {
  render() {
    return (
      <div style={{paddingTop: '80px'}} className='edgtf-container pb-5'>
        <div className="edgtf-container-inner">
          <div className="edgtf-title-section-holder text-center pb-1">
            <h2 className="edgtf-title-with-dots edgtf-appeared">Share on social media</h2>
            <span className="edge-title-separator edge-enable-separator" />
          </div>
          <div className="ebs-social-share text-center pb-3">
            <FacebookIcon size={48} round={true} title="Facebook" />
            <LinkedinIcon size={48} round={true} title="Facebook" />
            <TwitterIcon size={48} round={true} title="Facebook" />
            <PinterestIcon size={48} round={true} title="Facebook" />
            <EmailIcon size={48} round={true} title="Facebook" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { event } = state;
  return {
    event,
  };
}

export default connect(mapStateToProps)(withRouter(SocialShare));