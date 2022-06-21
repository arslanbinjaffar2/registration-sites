import React from 'react';
import Header from "components/modules/Header";

const MasterLayoutRoute = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default MasterLayoutRoute