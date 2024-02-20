import React, { useEffect,useState } from "react";
import { floorPlanListingSelector, fetchFloorPlans, clearState } from "store/Slices/FloorPlanListingSlice";
import { eventSelector } from "store/Slices/EventSlice";
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "components/atoms/ActiveLink";



const Variation1 = (props) => {
  const [toggle, settoggle] = useState(false);
  const { event } = useSelector(eventSelector);
  const eventUrl = event.url;
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedfilter, setSelectedfilter] = useState('sponsors');
  const [search, setSearch] = useState('');
  const [filteredFloorPlans, setFilteredFloorPlans] = useState([]);
  const dispatch = useDispatch();
  const { floorPlans,categories,sponsorCount,exhibitorCount, labels, loading, error} = useSelector(floorPlanListingSelector);
  const [breadCrumbs, setbreadCrumbs] = useState([
    {name:event.labels?.FLOOR_PLAN_HOMEPAGE, url:`/${eventUrl}`, type:"link"},
    {name:props?.moduleName, type:"name"},
  ]);

  useEffect(() => {
    dispatch(fetchFloorPlans(eventUrl));
    return () => {
      dispatch(clearState());
    }
  }, []);

  useEffect(() => {
    filterFloorPlans();
  },[floorPlans]);

  function filterFloorPlans(){
    const searchFiltered = search ? floorPlans.filter(floorPlan => floorPlan.floor_plan_name.toLowerCase().includes(search.toLowerCase())) : floorPlans;
    if(selectedCategories.length < 1){
      setFilteredFloorPlans(searchFiltered);
      return;
    }
    // filter and keep all the floor plans which have any of the selected categories.id in floorPlan.categories.id
    const filtered = searchFiltered.filter(floorPlan => {
      return floorPlan.categories.some(category => selectedCategories.some(sCategory => sCategory.id === category.id));
    });
    setFilteredFloorPlans(filtered);
  }

  function generateDetailUrl(id) {
    return `/${eventUrl}/floorplan/${id}`;
  }

  function selectCategory(category) {
    if (isSelected(category.id)) {
      setSelectedCategories(selectedCategories.filter(sCategory => sCategory.id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function isSelected(id) {
    return selectedCategories.some(category => category.id === id);
  }

  function filterCategories() {
    const filtered= categories.filter(category => category.cat_type === selectedfilter);
    setFilteredCategories(filtered);
  }

  useEffect(() => {
    filterCategories();
  },[categories]);

  useEffect(() => {
    setSelectedCategories([]);
    filterCategories();
  },[selectedfilter]);

  useEffect(() => {
    filterFloorPlans();
  },[selectedCategories]);

  useEffect(() => {
    filterFloorPlans();
  },[search]);

  return (
    <div  className="edgtf-container ebs-default-padding">
      <div className="container">
        {/* Breadcrumb */}
        {event.eventsiteSettings.show_eventsite_breadcrumbs ? (
          <nav className="ebs-breadcrumbs mb-5" aria-label="breadcrumb">
            <ol className="breadcrumb">
              {breadCrumbs.map((crumb, i) => (
                <li className="breadcrumb-item" key={i}>
                  {crumb.type === "name" ? crumb.name : <ActiveLink href={crumb.url} ><span style={{color: '#888'}}>{crumb.name}</span></ActiveLink>}
                </li>
              ))}
              </ol>
          </nav>
        ):''}
        
        <div className="mb-4">
          <div className="row align-items-center">
            <div className="col-md-5">
              <h3>Floor plan</h3>
            </div>
            <div className="col-md-7 d-flex justify-content-end align-items-center">
              <div className="ebs-form-control-search">
                <input style={{height: '50px',paddingLeft: '60px',paddingRight: '15px'}} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder={labels?.FLOOR_PLAN_SEARCH_TEXT} className="form-control w-100"  />
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
              <h4 className="m-0 mb-2">{labels?.FLOOR_PLAN_ADVANCED_FILTERS}</h4>
                <ul className="list-inline m-0">
                  <li className={`list-inline-item ${selectedfilter === 'sponsors' ? 'active':''}`}>
                    <div className="d-flex" onClick={() => setSelectedfilter('sponsors')}>
                      <em className="material-icons">{selectedfilter === 'sponsors' ? 'radio_button_checked':'radio_button_unchecked'} </em>
                      <span className="ms-2">{labels?.FLOOR_PLAN_SPONSOR_LABEL} ({sponsorCount})</span>
                    </div>
                  </li>
                  <li className={`list-inline-item ms-4 ${selectedfilter === 'exhibitors' ? 'active':''}`}>
                    <div className="d-flex" onClick={() => setSelectedfilter('exhibitors')}>
                      <em className="material-icons">{selectedfilter === 'exhibitors' ? 'radio_button_checked':'radio_button_unchecked'} </em>
                      <span className="ms-2">{labels?.FLOOR_PLAN_EXHIBITOR_LABEL} ({exhibitorCount})</span>
                    </div>
                  </li>
                </ul>
            </div>
            <div className="ebs-floorplan-bottom-filter py-3 px-4 pb-2">
              <ul className="list-inline m-0">
                {filteredCategories.map(category =>
                  <li key={category.id + category.cat_type} className="list-inline-item mb-2" onClick={()=>selectCategory(category)}><span className={`d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${isSelected(category.id) && 'active'}`}>{isSelected(category.id) && <i className="material-icons position-absolute">done</i>}  {category.info[0].value} ({ category.pins_count })</span></li>
                )}
              </ul>
              {filteredCategories.length < 1 && <p className="m-0">{labels?.FLOOR_PLAN_NO_DATA_FOUND_TEXT}</p>}
            </div>
          </div>
          <div className="mb-4 d-flex align-items-center ebs-floorplan-selected-filter">
            <h5 className="m-0 text-nowrap">{labels?.FLOOR_PLAN_SELECTED_FILTERS}:</h5>
            <div className="ps-3">
              <ul className="list-inline m-0">
                <li className="list-inline-item my-1">
                  <div className="d-flex align-items-center flex-wrap">
                    {selectedCategories.map(category =>
                    <React.Fragment key={category.id}>
                      <span className="btn-category d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative" >{category.info[0].value} ({category.pins_count})</span> <span onClick={()=>selectCategory(category)} className="btn-remove lh-1 mx-2"><em className="material-icons">highlight_off</em></span>
                    </React.Fragment>
                    )}
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
                  {/* <p className="m-0">Category Unassigned (2)</p> */}
                </div>
                <i className="material-icons">chevron_right</i>
              </a>
            </div>  
          )}
          {(filteredFloorPlans.length < 1 && loading !== true) && <p>{labels?.FLOOR_PLAN_NO_RECORD_FOUND}</p>}
        </div>
      </div>
    </div>
  );
};

export default Variation1;
