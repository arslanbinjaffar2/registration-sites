import * as React from 'react';
const Videopopup = ({ onClose, url }) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.getElementsByTagName('body')[0].classList.add('un-scroll');
      return () => {
        document.getElementsByTagName('body')[0].classList.remove('un-scroll');
      }
    }
  }, [])

  return (
    <div onClick={onClose} className="wrapper-popup">
      <div onClick={(e) => e.stopPropagation()} className="container-popup">
        <div className="ebs-video-wrapper">
          <video controls playsInline  autoPlay src={url} width='100%' height="540px"></video>
        </div>
      </div>
    </div>
  );
}
export default Videopopup;
