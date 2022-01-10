import React from "react";

const attendeeDetail = ({ attendees }) => {
  return (
    <div data-fixed="true" className="">
      <div style={{
        backgroundImage: `url(${require("img/h1-parallax1.jpg")})`,
        height: 390,
        }}
      className="edgtf-title edgtf-standard-type edgtf-has-background edgtf-content-left-alignment edgtf-title-large-text-size edgtf-animation-no edgtf-title-image-not-responsive edgtf-title-with-border">
        <div className="edgtf-title-holder">
          <div className="edgtf-container clearfix">
            <div className="edgtf-container-inner">
              <div className="edgtf-title-subtitle-holder" >
                <div className="edgtf-title-subtitle-holder-inner">
                  <h1 style={{ color: 'white' }}><span>Featured Speakers</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
      </div>
    </div>
    <div className="single-team-member">
      <div className="edgtf-container-inner clearfix">
        <div className="edgtf-team-single-holder">
          <div className="edge-team-single-holder">
            <div className="edge-grid-row">
              <div className="edge-grid-col-12 edgtf-team-list-single-image">
              <img src="https://via.placeholder.com/1000.jpeg" alt="" width="800" height="800" /> </div>
              <div className="edge-grid-col-12 edgtf-team-list-single-info">
                <h2 className="edge-name">Natalie Brown</h2>
                <div className="edge-info-row">
                  <p className="info">CEO &amp; Founder</p>
                </div>
                <div className="edge-grid-row edge-info">
                  <div className="edge-grid-col-12">
                    <div style={{paddingBottom: 10}} className="edge-team-single-content">
                      <h4 className="info">ABOUT </h4>
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. <br /> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? </p>
                    </div>
                    <div style={{marginBottom: 20}} className="edge-info-row">
                      <h4 style={{textTransform: 'uppercase',marginBottom: 10}} className="info">Email </h4>
                      <p><a style={{color: '#000'}} href="mailto:Alvaro@gmail.com">Alvaro@gmail.com</a></p>
                    </div>
                    <div style={{marginBottom: 20}} className="edge-info-row">
                      <h4 style={{textTransform: 'uppercase',marginBottom: 10}} className="info">Phone </h4>
                      <p><a style={{color: '#000'}} href="tel:+78-54-897666">+78-54-897666</a></p>
                    </div>
                    <div style={{marginBottom: 20}} className="edge-info-row">
                      <div className="social-icons">
                        <a style={{fontSize: '30px'}} target="_blank" href="#!"><span data-icon="&#xe0aa;"></span></a>
                        <a style={{fontSize: '30px'}} target="_blank" href="#!"><span data-icon="&#xe0ab;"></span></a>
                        <a style={{fontSize: '30px'}} target="_blank" href="#!"><span data-icon="&#xe0b1;"></span></a>
                        <a style={{fontSize: '30px'}} target="_blank" href="#!"><span data-icon="&#xe0b7;"></span></a>
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
    <div style={{paddingBottom: 80}} className="edgtf-full-width">
      <div className="edgtf-container-inner">
        <div className="edgtf-title-section-holder pb-1">
          <h2 className="edgtf-title-with-dots edgtf-appeared">Programes</h2>
          <span className="edge-title-separator edge-enable-separator"></span>
          <h6>Reminder for developer: Needed to implement programme sections variations</h6>
        </div>
      </div> 
    </div>
  </div>
  );
};

export default attendeeDetail;
