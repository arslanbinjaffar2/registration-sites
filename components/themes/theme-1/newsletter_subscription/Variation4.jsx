import * as React from 'react';
import HeadingElement from 'components/ui-components/HeadingElement';
const SubNewsletter4 = () =>  {
  
    return (
      <div className="module-section">
        <div  style={{  padding: '80px 0', backgroundColor: '#F2F2F2' }} className="">
        <div className="container-fluid">
        <HeadingElement dark={false} label={"Subscribe to our newsletter "}  align={'left'} />
        </div>
          <div className="ebs-sub-newsletter-sec ebs-dark-variation">
            <div className="container-fluid">
              <div className="ebs-contain-fluid d-flex">
                <div className="ebs-left-fluid">
                  <div className="row d-flex">
                  <div className="col-md-4">
                  <input style={{color: '#313131',padding: 15,backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Email" />
                    </div>
                    <div className="col-md-4">
                      <input style={{color: '#313131',padding: 15,backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Full name" />
                    </div>
                    <div className="col-md-4">
                      <input style={{color: '#313131',padding: 15,backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Company" />
                    </div>
                  </div>
                </div>
                <div className="ebs-right-fluid">
                <button style={{border: '2px solid #313131', color: '#313131',  fontWeight: 500}}  className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Subscribe </button> 
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-md-12 mb-5">
                  <label className="ebs-accept-terms">
                    <span className="ebs-custom-check">
                      <input type="checkbox"  />
                      <i className="material-icons"></i>
                      </span>
                    <p>I agree to receive email communications from Digital Tech Summit, including upcoming promotions and discounted tickets, news, and access to exclusive invite-only events, and I have consulted the Privacy Policy. You can sign up at any time by clicking the <strong>Sign up</strong>  link from all newsletters. </p>
                  </label>
                </div>
              
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }


export default SubNewsletter4;
