// import ReactDOM from 'react-dom/client'
import React from 'react';
import useMapplicStore from './MapplicStore';
import { floorPlanDetailSelector, fetchFloorPlanDetails, clearState } from "store/Slices/FloorPlanDetailSlice";
import { useSelector, useDispatch } from "react-redux";




const SidebarMapplic = (json) => {
	const openLocation = useMapplicStore(state => state.openLocation);
	const closeLocation = useMapplicStore(state => state.closeLocation);
	const [active, setactive] = React.useState('sponsor');
	const [toggle, settoggle] = React.useState(false);
	const [data, setdata] = React.useState(null);
	const [filteredGroups, setFilteredGroups] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const { labels } = useSelector(floorPlanDetailSelector);
	const [activeIndex, setactiveIndex] = React.useState(0)


	React.useEffect(() => {
		if (typeof json === 'object' && json !== null) {
			setdata(json.json);
			return;
		}
	     fetch(json.json)
        .then(response => response.json())
        .then(data => setdata(data));
	}, [json])

	React.useEffect(() => {
		if (!data) {
			setFilteredGroups([]);
			return;
		}
	
		const filteredGroups = data.groups.map(group => {
			const children = data.locations.filter(list => list.group.includes(group.id) && list.cat_type === active);
			const filteredChildren = children.filter(child => child.title.toLowerCase().includes(search.toLowerCase()) || child.about.toLowerCase().includes(search.toLowerCase()));
			return { ...group, children: filteredChildren };
		}).filter(group => group.children.length > 0);
		setFilteredGroups(filteredGroups);
		
	}, [data, search, active]);
	
  return (
	<div className={`position-absolute ebs-mapplic-sidebar overflow-auto ${toggle ? 'active' : ''}`}>
		{!toggle && <span onClick={() => settoggle(true)} style={{lineHeight: 0, cursor: 'pointer'}} className='edgtf-btn edgtf-btn-medium edgtf-btn-solid px-2 py-2'>
			<span className="material-icons lh-1">menu</span>
		</span>}
		{toggle && <div className="text-end"> <span style={{lineHeight: 0, cursor: 'pointer', border: '1px solid #000'}} onClick={() => settoggle(false)} className='p-1 d-inline-block rounded-circle  text-black'>
			<span className="material-icons lh-1">close_fullscreen</span>
		</span></div>}
		{toggle && <div className="pt-3">
			<div className="ebs-form-control-search mb-3">
				<input style={{height: '42px',paddingLeft: '60px',paddingRight: '15px'}} type="text" placeholder={labels?.FLOOR_PLAN_SEARCH_TEXT} className="form-control w-100"  
					onChange={(e) => setSearch(e.target.value)}
				/>
				<em className="fa fa-search" style={{top: '10px', left: '18px',right: 'auto'}}></em>
			</div>
			<h5 className='mb-3'>{labels?.FLOOR_PLAN_ADVANCED_FILTERS}</h5>
			<div className="ebs-floorplan-bottom-filter pb-3 mb-3 border-bottom">
				<ul className="list-inline m-0">
					<li className="list-inline-item mb-2">
						<span onClick={() => {setactive('sponsor'); closeLocation()}} className={`d-flex  border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${active === 'sponsor' ? 'active' :''}`}>
							<i className="material-icons position-absolute">done</i>
							{labels?.FLOOR_PLAN_SPONSOR_LABEL}
						</span>
					</li>
					<li className="list-inline-item mb-2">
						<span onClick={() => {setactive('exhibitor');closeLocation()}} className={`d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${active === 'exhibitor' ? 'active' :''}`}>
							<i className="material-icons position-absolute">done</i>
							{labels?.FLOOR_PLAN_EXHIBITOR_LABEL}
						</span>
					</li>
				</ul>
			</div>
			<div className="ebs-mapplic-accordion">
				<h5 className='mb-3'>{labels?.FLOOR_PLAN_CATEGORIES_LABEL}</h5>
				{filteredGroups.filter(item => item.type === active).map((group, k) => 
				<div key={group.id}>
					<div onClick={() => setactiveIndex(activeIndex === k ? null : k)} className="ebs-category-label d-flex align-items-center">
						<div className="me-auto"><em style={{background: group.color ? group.color: '#fff'}} className="category-color"></em>	{group.name} ({group.children.length})</div>
						<i style={{color: '#888'}} className="material-icons">{activeIndex === k ? 'expand_less' : 'expand_more'}</i>
					</div>
					{activeIndex === k && <div className="ebs-location-wrapper">
						{group.children.map(list => 
							<div key={list.id} onClick={() => openLocation(list.id)} className="ebs-location-label d-flex align-items-center"><div className="me-auto pe-2">{list.title}</div> <span>{list.about ? list.about : ''}</span></div>
						)}
					</div>}
				</div>	
				)}
				{filteredGroups.length < 1 && <p className="m-0">{labels?.GENERAL_NO_RECORD}</p>}
			</div>
		</div>}

	</div>
  )
}

export default SidebarMapplic

