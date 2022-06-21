import * as React from 'react';

const Popup =  (props) => {
    return (
        <div id="loader-wrapper" className="fixed ebs-popup-container">
            <div className="ebs-popup-wrapper" style={{ maxWidth: props?.width ? props?.width : '620px' }}>
                <span onClick={props.onClick} className="ebs-close link"><i className="material-icons">cancel</i></span>
                {props.title && <header className="ebs-header">
                    <h3 className='link'>{props.title}</h3>
                </header>}
                {props.children}
            </div>
        </div>
    );
}

export default Popup;

