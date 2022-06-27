import React from "react";
import DocumentsListing from "components/ui-components/DocumentsListing";
const Documents = ({documents}) => {
  return (
    <React.Fragment>
    <div 
      className="edgtf-parallax-section-holder">
        <DocumentsListing documents={documents} />
    </div>
    </React.Fragment>
  );
};


export default Documents;
