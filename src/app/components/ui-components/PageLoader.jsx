import * as React from 'react';

const PageLoader = ({ className, fixed, title, description }) => {
    return (
        <div id="loader-wrapper" className={`${className && className} ${fixed && 'popup-fixed'}`}>
            {className ? (
                <div className="wrapper_laoder">
                    <h2>{title}</h2>
                    <p>{description} </p>
                    <div id="loader"></div>
                </div>
            ) : (
                <div id="loader"></div>
            )}
        </div>
    );
}

export default PageLoader;

