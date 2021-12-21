import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

 class Map extends Component {
  render() {
    return (
          <div style={{paddingTop: '80px'}} className='edgtf-container'>
            <div className="edgtf-container-inner">
              <div className="edgtf-title-section-holder text-center pb-3">
                <h2 className="edgtf-title-with-dots edgtf-appeared">Map</h2>
                <span className="edge-title-separator edge-enable-separator" />
                <h6 style={{marginBottom: 0}} className="edgtf-section-subtitle">The key locations of your event </h6>
                <p style={{marginTop: 0, fontSize: 14, color: '#555'}} className="edgtf-section-subtitle">Press Room, Main Conference Venue, Hotel 1</p>
              </div>
            </div>
            <div className="ebs-google-map">
             <iframe title="google map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13603.145696954229!2d74.3470055!3d31.5300254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1640081607060!5m2!1sen!2s" width="600" height="450" allowfullscreen="" loading="lazy" />
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

export default connect(mapStateToProps)(withRouter(Map));