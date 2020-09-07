import * as React from 'react';
const Videopopup = ({onClose,url}) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (
    <div onClick={onClose} className="wrapper-popup">
      <div onClick={(e) => e.stopPropagation()} className="container-popup">
        {match ?
        <iframe
          src={`https://www.youtube.com/embed/${match[7]}?rel=1&autoplay=1`}
          frameBorder="0"
          autoPlay
          allowFullScreen
          title="video"
          width="100%"
          height="560"
        /> : <p style={{padding: '20px',fontSize: '16px',margin: '0'}}><strong>Video not Found</strong></p>
         }
      </div>
    </div>
  );
}
export default Videopopup;
