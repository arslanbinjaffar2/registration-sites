import React from "react";
import DocumentsListing from "components/ui-components/DocumentsListing";
const Documents = ({documents, documentPage, labels}) => {
  return (
    <React.Fragment>
    <div 
      className="edgtf-parallax-section-holder">
        <DocumentsListing documents={documents} documentPage={documentPage} labels={labels} />
    </div>
    </React.Fragment>
  );
};


export default Documents;
