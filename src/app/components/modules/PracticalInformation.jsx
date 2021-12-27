import React from "react";
import { connect } from "react-redux";

const PracticalInformation = () => {
  return (
    <div>
      <h3>Practical Infromation</h3>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { event } = state;
  return {
    event,
  };
};

export default connect(mapStateToProps)(PracticalInformation);
