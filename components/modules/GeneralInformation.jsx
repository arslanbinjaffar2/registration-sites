import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
const GeneralInformation = () => {
  return (
    <div style={{padding: "80px 0",}}
      className="edgtf-parallax-section-holder">
      <div className="container">
        <HeadingElement dark={false} label={'Addtional Infromation'}  align={'center'} />
        <div className="ebs-inner-page-wrapper">
          <ul>
            <li>
              <a href="#!">Easily create and share</a>
              <ul>
                <li><a href="#!">Send Polished survey and forms</a></li>
                <li><a href="#!">Analyze response with with automatic summaries</a></li>
              </ul>
            </li>
            <li><a href="#!">Attendee Detail</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default GeneralInformation;



