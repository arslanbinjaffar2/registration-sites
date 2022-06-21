import * as React from 'react';
const Videopopup = ({onClose,url}) => {
	React.useEffect(() => {
		document.getElementsByTagName('body')[0].classList.add('un-scroll');	
	
		return () => {
			document.getElementsByTagName('body')[0].classList.remove('un-scroll');
		}
	}, [])

  return (
    <div onClick={onClose} className="wrapper-popup">
      <div onClick={(e) => e.stopPropagation()} className="container-popup">
        <video controls playsInline  autoPlay src={url} width='100%' height="540px"></video>
      </div>
    </div>
  );
}
export default Videopopup;
