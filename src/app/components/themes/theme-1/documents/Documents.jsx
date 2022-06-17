import React from "react";
import HeadingElement from "@/ui-components/HeadingElement";
import DocumentsListing from "@/ui-components/DocumentsListing";
import PageHeader from "@/modules/PageHeaders/PageHeader";
const Documents = ({documents}) => {
  return (
    <React.Fragment>
    <PageHeader type={'simple'}>
      <HeadingElement dark={false} label={'My Documents'}  align={'center'} />
    </PageHeader>
    <div 
      className="edgtf-parallax-section-holder">
      <div className="container">
        <DocumentsListing documents={documents} />
      </div>
    </div>
    </React.Fragment>
  );
};


export default Documents;
