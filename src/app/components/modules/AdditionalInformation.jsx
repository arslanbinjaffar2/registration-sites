import React from "react";
import { connect } from "react-redux";

const AdditionalInformation = () => {
  return (
    <div>
      <h3>Addtional Infromation</h3>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { event } = state;
  return {
    event,
  };
};

export default connect(mapStateToProps)(AdditionalInformation);
