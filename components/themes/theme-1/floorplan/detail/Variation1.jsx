import React, {useRef, useState} from "react";
import Mapplic from 'components/mapplic/Mapplic';

const Variation1 = () => {
  return (
    <div  className="edgtf-container ebs-default-padding">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="ebs-breadcrumbs mb-5" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a style={{color: '#888'}} href="#">Home</a></li>
            <li className="breadcrumb-item"><a style={{color: '#888'}} href="#">Program</a></li>
            <li className="breadcrumb-item active" aria-current="page">Floor plan</li>
          </ol>
        </nav>
        <Mapplic />
      </div>
    </div>
  );
};

export default Variation1;
