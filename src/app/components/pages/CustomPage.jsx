import React from "react";
import CustomSection from "../modules/CustomSection";
const CustomPage = ({ match }) => {
  return (
    <div>
      <CustomSection pageId={match.params.id} />
    </div>
  );
};

export default CustomPage;
