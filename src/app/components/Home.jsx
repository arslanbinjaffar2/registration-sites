import * as React from 'react';
class Home extends React.Component {
  render() {
    return (
      <main role="main" className="container mt-5">
        <div className="row d-flex">
          <div className="col-4">
            <div className="edgtf-title-section-holder">
              <h2 className="edgtf-title-with-dots edgtf-appeared">
                Build your base		</h2>
              <span className="edge-title-separator edge-enable-separator"></span>
            </div>
          </div>
          <div className="col-8">
            <div className="edgtf-title-section-holder">
              <span className="edge-title-separator edge-disable-separator"></span>

              <h6 className="edgtf-section-subtitle" style={{color:"#898989"}}>Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi </h6>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
