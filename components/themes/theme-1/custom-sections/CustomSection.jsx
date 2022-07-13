import React from "react";
import { connect } from "react-redux";
import Image from 'next/image'

const CustomSection = ({ data }) => {
  return (
    <React.Fragment>
      <div className="ebs-default-padding clearfix" dangerouslySetInnerHTML={{__html:data}}>
      </div>
    </React.Fragment>
  )
  // return (
  //   <div style={{ paddingTop: "80px" }} className="edgtf-container pb-5">
  //     <div className="edgtf-container-inner container">
  //       <div className="ebs-custom-section-html">
  //         <section>
  //           <figure className="image" style={{ float: "left" }}>
  //             <img
  //               alt=""
  //               src="https://via.placeholder.com/350.png"
  //               width="350"
  //               height="350"
  //             />
  //             <figcaption>Caption</figcaption>
  //           </figure>
  //           1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
  //           vitae facere debitis pariatur eos nisi inventore quis modi, atque
  //           earum magnam dolor provident possimus cumque. Tenetur mollitia
  //           maiores natus eveniet fugit dolore quae culpa, commodi itaque? Ullam
  //           ad nemo quae quis a, voluptatibus neque sed quod? Cumque incidunt
  //           dolores velit? Lorem ipsum dolor sit amet consectetur adipisicing
  //           elit. Ipsa vitae facere debitis pariatur eos nisi inventore quis
  //           modi, atque earum magnam dolor provident possimus cumque. Tenetur
  //           mollitia maiores natus eveniet fugit dolore quae culpa, commodi
  //           itaque?
  //           <br />
  //           <br />
  //           Ullam ad nemo quae quis a, voluptatibus neque sed quod? Cumque
  //           incidunt dolores velit? Lorem ipsum dolor sit amet consectetur
  //           adipisicing elit. Ipsa vitae facere debitis pariatur eos nisi
  //           inventore quis modi, atque earum magnam dolor provident possimus
  //           cumque. Tenetur mollitia maiores natus eveniet fugit dolore quae
  //           culpa, commodi itaque? Ullam ad nemo quae quis a, voluptatibus neque
  //           sed quod? Cumque incidunt dolores velit?
  //         </section>
  //       </div>
  //     </div>
  //   </div>
  // );
};

function mapStateToProps(state) {
  const { event } = state;
  return {
    event,
  };
}

export default connect(mapStateToProps)(CustomSection);
