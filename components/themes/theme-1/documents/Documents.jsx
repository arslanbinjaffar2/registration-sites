import React from "react";
import DocumentsListing from "components/ui-components/DocumentsListing";
const Documents = ({documents, documentPage, labels, eventTimezone, moduleHeadings}) => {
  return (
    <React.Fragment>
    <div 
      className="edgtf-parallax-section-holder">
        <DocumentsListing documents={documents} moduleHeadings={moduleHeadings} documentPage={documentPage} page={'general'} labels={labels} eventTimezone={eventTimezone} />
    </div>
    </React.Fragment>
  );
};


export default Documents;
