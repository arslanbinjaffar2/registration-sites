import * as React from 'react';
const Videopopup = ({onClose,url}) => {
console.log(url);
  return (
    <div onClick={onClose} className="wrapper-popup">
      <div onClick={(e) => e.stopPropagation()} className="container-popup">
        <video controls autoPlay src={url} width='100%' height="540px"></video>
      </div>
    </div>
  );
}
export default Videopopup;
