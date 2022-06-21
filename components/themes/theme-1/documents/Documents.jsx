import React from "react";
import HeadingElement from "components/ui-components/HeadingElement";
import DocumentsListing from "components/ui-components/DocumentsListing";
const Documents = ({documents}) => {
  return (
    <div style={{padding: "80px 0",}}
      className="edgtf-parallax-section-holder">
      <div className="container">
        <HeadingElement dark={false} label={'My Documents'}  align={'center'} />
        <DocumentsListing documents={documents} />
      </div>
    </div>
  );
};


export default Documents;
