import React from 'react';
import PackageTable from './PackageTable';

const PageContent = () => {
  return (
    <main className="ebs-manage-packages" role="main">
      <div className="ebs-header-packages">
         <div className="container">
           <div className="ebs-header-content">
            <h1>Get your tickets</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet.</p>
           </div>
          </div> 
      </div>
      <div className="ebs-package-content-area">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 col-lg-4 h-100">
              <PackageTable timer="true" />
            </div>
            <div className="col-md-6 col-lg-4 h-100">
              <PackageTable timer="true" />
            </div>
            <div className="col-md-6 col-lg-4 h-100">
              <PackageTable timer="true" />
            </div>
            <div className="col-md-6 col-lg-4 h-100">
              <PackageTable />
            </div>
            <div className="col-md-6 col-lg-4 h-100">
              <PackageTable />
            </div>
          </div>
        </div>
      </div> 
    </main>
  )
}

export default PageContent