import React from "react";
import { connect } from "react-redux";

const EventInformation = () => {
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

export default connect(mapStateToProps)(EventInformation);
