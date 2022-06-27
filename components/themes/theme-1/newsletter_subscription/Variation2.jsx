import * as React from 'react';
import HeadingElement from 'components/ui-components/HeadingElement';
const SubNewsletter2 = () =>  {

    return (
      <div className="module-section">
        <div  style={{padding: '80px 0',backgroundColor: '#F2F2F2' }} className="">
        <div className="container">
        <HeadingElement dark={false} label={"Subscribe to our newsletter "}  align={'center'} />
        </div>
          <div className="ebs-sub-newsletter-sec ebs-dark-variation">
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-4">
                  <input style={{color: '#313131',padding: 15, backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Email" />
                </div>
                <div className="col-md-4">
                  <input style={{color: '#313131',padding: 15, backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Full name" />
                </div>
                <div className="col-md-4">
                  <input style={{color: '#313131',padding: 15, backgroundColor: '#fff'}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Company" />
                </div>
                <div className="col-md-12 mb-5">
                  <label className="ebs-accept-terms">
                    <span className="ebs-custom-check">
                      <input type="checkbox"  />
                      <i className="material-icons"></i>
                      </span>
                    <p>I agree to receive email communications from Digital Tech Summit, including upcoming promotions and discounted tickets, news, and access to exclusive invite-only events, and I have consulted the Privacy Policy. </p>
                    <p>You can sign up at any time by clicking the <strong>Sign up</strong>  link from all newsletters. </p>
                  </label>
                </div>
                <div className="col-md-12 text-center">
                <button style={{border: '2px solid #313131', color: '#313131',  fontWeight: 500}}  className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Subscribe </button> 
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }


export default SubNewsletter2;
