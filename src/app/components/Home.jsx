import * as React from 'react';
class Home extends React.Component {
  render() {
    return (
      <main role="main" className="mt-5">
        <div className="container">
          <div className="row d-flex mb-5">
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
          <div className="row d-flex mb-5">
            <div className="col-4">
              <figure className="pb-2">
                <img src={require('img/blog-img1.jpg')} alt="" />
              </figure>
              <h3 className="mt-4 mb-3">Conference</h3>
              <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at vel.</p>
              <div>
                <a href="#!" className="edgtf-btn edgtf-btn-small edgtf-btn-transparent edgtf-btn-custom-hover-color">READ MORE</a>
              </div>
            </div>
            <div className="col-4">
              <figure className="pb-2">
                <img src={require('img/blog-img1.jpg')} alt="" />
              </figure>
              <h3 className="mt-4 mb-3">Conference</h3>
              <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at vel.</p>
              <div>
                <a href="#!" className="edgtf-btn edgtf-btn-small edgtf-btn-transparent edgtf-btn-custom-hover-color">READ MORE</a>
              </div>
            </div>
            <div className="col-4">
              <figure className="pb-2">
                <img src={require('img/blog-img1.jpg')} alt="" />
              </figure>
              <h3 className="mt-4 mb-3">Conference</h3>
              <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at vel.</p>
              <div>
                <a href="#!" className="edgtf-btn edgtf-btn-small edgtf-btn-transparent edgtf-btn-custom-hover-color">READ MORE</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${require('img/h1-parallax1.jpg')})`,padding: '50px 0'}} className="edgtf-parallax-section-holder">
          <div className="container">
            <div className="row d-flex mb-5">
              <div className="col-4">
                <div className="edgtf-title-section-holder">
                  <h2 style={{ color: "#ffffff" }} className="edgtf-title-with-dots edgtf-appeared">
                    Build your base		</h2>
                  <span className="edge-title-separator edge-enable-separator"></span>
                </div>
              </div>
              <div className="col-8">
                <div className="edgtf-title-section-holder">
                  <span className="edge-title-separator edge-disable-separator"></span>
                  <h6 className="edgtf-section-subtitle" style={{ color: "#ffffff" }}>Lorem ipsum dolor sit amet, ut vidisse commune scriptorem. Ad his suavitate complectitur ruis dicant facilisi </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
