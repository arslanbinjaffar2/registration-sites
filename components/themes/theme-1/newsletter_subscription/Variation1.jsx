import * as React from 'react';
import HeadingElement from 'components/ui-components/HeadingElement';
const SubNewsletter1 = (props) =>  {

    const _parallax = React.useRef(null);
    React.useEffect(() => {
      window.addEventListener("scroll",scollEffect);
      return () => {
        window.removeEventListener("scroll",scollEffect);
      }
    }, [])
    
     function scollEffect () {
      const scrolled = window.pageYOffset;
      const itemOffset = _parallax.current.offsetTop;
      const itemHeight = _parallax.current.getBoundingClientRect();
      if (scrolled < (itemOffset - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
      const _scroll = (scrolled - itemOffset) + itemHeight.height;
      _parallax.current.style.backgroundPosition = `50%  -${(_scroll * 0.1)}px`;
    };
    // if (props.moduleVariation.background_image !== '') {
    //   return (

    //     <div ref={_parallax} style={{ backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + '/assets/variation_background/' + props.moduleVariation.background_image}`, backgroundPosition: "center top", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
    //       {props.children}
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div ref={_parallax} style={{  backgroundPosition: "center top", backgroundSize: 'cover' }} className="edgtf-parallax-section-holder ebs-bg-holder ebs-default-padding">
    //       {props.children}
    //     </div>
    //   );
    // }

  }
    
    const _bgimage = `${process.env.NEXT_APP_EVENTCENTER_URL}/assets/variation_background/${props.moduleVariation.background_image}`;
    
    const bgStyle = (props.moduleVariation && props.moduleVariation.background_image !== "") ? { backgroundImage: `url(${_bgimage})`, padding: "100px 0" } : { padding: "80px 0", backgroundPosition: "center", backgroundSize: 'cover' }
  
    return (
          <div className="module-section">
            <div ref={_parallax} style={bgStyle} className="edgtf-parallax-section-holder ebs-bg-holder">
                <div className="container">
                  <HeadingElement dark={true} label={"Subscribe to our newsletter "}  align={'center'} />
                </div>
                <div className="ebs-sub-newsletter-sec">
                  <div className="container">
                    <div className="row d-flex">
                      <div className="col-md-4">
                        <input style={{color: '#fff',padding: 15}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Email" />
                      </div>
                      <div className="col-md-4">
                        <input style={{color: '#fff',padding: 15}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Full name" />
                      </div>
                      <div className="col-md-4">
                        <input style={{color: '#fff',padding: 15}} className="wpcf7-form-control wpcf7-text" type="text" placeholder="Company" />
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
                      <button style={{border: '2px solid #fff', color: '#fff',  fontWeight: 500,  backgroundColor: 'transparent'}}  className="edgtf-btn edgtf-btn-huge edgtf-btn-custom-border-hover edgtf-btn-custom-hover-bg edgtf-btn-custom-hover-color">Subscribe </button> 
                      </div>
                    </div>
                  </div>
                </div>
                </div>
          </div>
    );
  }


export default SubNewsletter1;
