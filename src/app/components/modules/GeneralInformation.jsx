import React from "react";
import { connect } from "react-redux";

const GeneralInformation = () => {
  return (
    <div>
      <h3>General Infromation</h3>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { event } = state;
  return {
    event,
  };
};

export default connect(mapStateToProps)(GeneralInformation);
