import ActiveLink from "components/atoms/ActiveLink";
import React, { Suspense, useEffect,useState, useMemo, useRef } from "react";
import TruncateMarkup from 'react-truncate-markup';
import Image from 'next/image'
import HeadingElement from 'components/ui-components/HeadingElement';
import { floorPlanListingSelector, fetchFloorPlans, clearState } from "store/Slices/FloorPlanListingSlice";
import {
  incrementFetchLoadCount
} from "store/Slices/GlobalSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";


const Variation1 = () => {
  const [toggle, settoggle] = useState(false);
  const { event } = useSelector(eventSelector);
  const eventUrl = event.url;
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedfilter, setSelectedfilter] = useState('sponsors');
  const [filteredFloorPlans, setFilteredFloorPlans] = useState([]);
  const dispatch = useDispatch();
  const { floorPlans,categories,sponsorCount,exhibitorCount, labels, loading, error} = useSelector(floorPlanListingSelector);

  useEffect(() => {
  //   if(checkModuleTopStatus < 0 && checkModuleHomeStatus < 0){
  //   router.push(`/${eventUrl}`);
  // }
    if(floorPlans === null){
      dispatch(fetchFloorPlans(eventUrl));
    }else{
      dispatch(incrementFetchLoadCount());
    }

    return () => {
      dispatch(clearState());
    }

  }, []);

  useEffect(() => {
    floorPlans === null ? setFilteredFloorPlans([]) : setFilteredFloorPlans(floorPlans);
  },floorPlans);

  function generateDetailUrl(id) {
    return `/${eventUrl}/floorplan/${id}`;
  }

  function selectCategory(category) {
    console.log('select: ',category);
    if (isSelected(category.id)) {
      setSelectedCategories(selectedCategories.filter(id => id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category.id]);
    }
    console.log('selected: ',selectedCategories);
  }

  function isSelected(id) {
    return selectedCategories.some(selectedId => selectedId === id);
  }

  useEffect(() => {
    setFilteredCategories(categories);
    const filtered= categories.filter(category => category.cat_type === selectedfilter);
    setFilteredCategories(filtered);
  },[selectedfilter,categories]);

  return (
    <div  className="edgtf-container ebs-default-padding">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="ebs-breadcrumbs mb-5" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a style={{color: '#888'}} href="#">Home</a></li>
            <li className="breadcrumb-item"><a style={{color: '#888'}} href="#">Program</a></li>
            <li className="breadcrumb-item active" aria-current="page">Floor plan</li>
          </ol>
        </nav>
        <div className="mb-4">
          <div className="row align-items-center">
            <div className="col-md-5">
              <h3>Floor plan</h3>
            </div>
            <div className="col-md-7 d-flex justify-content-end align-items-center">
              <div className="ebs-form-control-search">
                <input style={{height: '50px',paddingLeft: '60px',paddingRight: '15px'}} type="text" placeholder="Search" className="form-control w-100"  />
                <em className="fa fa-search" style={{top: '15px', left: '18px',right: 'auto'}}></em>
              </div>
              <button onClick={() => settoggle(!toggle)} className="edgtf-btn edgtf-btn-medium edgtf-btn-solid px-3 ms-3 lh-1 py-2">
                <em className="material-icons lh-1">tune</em>
              </button>
            </div>
          </div>
        </div>
        {toggle && <div>
          <div className="ebs-floorplan-filter border rounded-2 mb-4">
            <div className="ebs-floorplan-top-filter border-bottom py-3 px-4">
              <h4 className="m-0 mb-2">Advance filters</h4>
                <ul className="list-inline m-0">
                  <li className={`list-inline-item ${selectedfilter === 'sponsors' ? 'active':''}`}>
                    <div className="d-flex" onClick={() => setSelectedfilter('sponsors')}>
                      <em className="material-icons">{selectedfilter === 'sponsors' ? 'radio_button_checked':'radio_button_unchecked'} </em>
                      <span className="ms-2">Sponsors ({sponsorCount})</span>
                    </div>
                  </li>
                  <li className={`list-inline-item ms-4 ${selectedfilter === 'exhibitors' ? 'active':''}`}>
                    <div className="d-flex" onClick={() => setSelectedfilter('exhibitors')}>
                      <em className="material-icons">{selectedfilter === 'exhibitors' ? 'radio_button_checked':'radio_button_unchecked'} </em>
                      <span className="ms-2">Exhibitors ({exhibitorCount})</span>
                    </div>
                  </li>
                </ul>
            </div>
            <div className="ebs-floorplan-bottom-filter py-3 px-4 pb-2">
              <ul className="list-inline m-0">
                {filteredCategories.map(category =>
                  <li className="list-inline-item mb-2" onClick={()=>selectCategory(category)}><span className={`d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${isSelected === true && 'active'}`}>{isSelected === true && <i className="material-icons position-absolute">done</i>}  {category.info[0].value} ({ category.pins_count })</span></li>
                )}
              </ul>
            </div>
          </div>
          <div className="mb-4 d-flex align-items-center ebs-floorplan-selected-filter">
            <h5 className="m-0 text-nowrap">Selected filters:</h5>
            <div className="ps-3">
              <ul className="list-inline m-0">
                <li className="list-inline-item my-1">
                  <div className="d-flex align-items-center">
                    <span className="btn-category d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative" >Category Unassigned (4)</span> <span className="btn-remove lh-1 ms-2"><em className="material-icons">highlight_off</em></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>}
        <div className="ebs-floorplan-filtered-list">
        {filteredFloorPlans.map(floorPlan =>
            <div key={floorPlan.id} className="mb-3 ebs-list-item">
              <a href={generateDetailUrl(floorPlan.id)} className="d-flex align-items-center border p-3 rounded-2">
                <div className="me-auto">
                  <h4 className="m-0">{floorPlan.floor_plan_name} {floorPlan.version_number}</h4>
                  <p className="m-0">Category Unassigned (2)</p>
                </div>
                <i className="material-icons">chevron_right</i>
              </a>
            </div>  
          )}
          {/* {[...Array(20)].map(item =>
            <div key={item} className="mb-3 ebs-list-item">
              <a href="" className="d-flex align-items-center border p-3 rounded-2">
                <div className="me-auto">
                  <h4 className="m-0">Floor Plan New wXh QR-12343</h4>
                  <p className="m-0">Category Unassigned (2)</p>
                </div>
                <i className="material-icons">chevron_right</i>
              </a>
            </div>  
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Variation1;
