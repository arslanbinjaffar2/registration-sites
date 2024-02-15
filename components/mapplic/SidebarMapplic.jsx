// import ReactDOM from 'react-dom/client'
import React from 'react';
import useMapplicStore from './MapplicStore'

const SidebarMapplic = (json) => {
	const openLocation = useMapplicStore(state => state.openLocation);
	const closeLocation = useMapplicStore(state => state.closeLocation);
	const [active, setactive] = React.useState('sponsor');
	const [toggle, settoggle] = React.useState(false);
	const [data, setdata] = React.useState(null);
	const [filteredGroups, setFilteredGroups] = React.useState([]);
	const [search, setSearch] = React.useState('');

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
	
		const filteredGroups = search ?
			data.groups.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) :
			data.groups;
	
		setFilteredGroups(filteredGroups);
	}, [data, search]);
	
  return (
	<div className={`position-absolute ebs-mapplic-sidebar overflow-auto ${toggle ? 'active' : ''}`}>
		{!toggle && <span onClick={() => settoggle(true)} className='edgtf-btn edgtf-btn-medium edgtf-btn-solid px-3 py-2 lh-1'>
			<span className="material-icons lh-1">menu</span>
		</span>}
		{toggle && <span onClick={() => settoggle(false)} className=''>
			<span className="material-icons">close_fullscreen</span>
		</span>}
		{toggle && <div className="pt-3">
			<div className="ebs-form-control-search mb-3">
				<input style={{height: '42px',paddingLeft: '60px',paddingRight: '15px'}} type="text" placeholder="Search" className="form-control w-100"  
					onChange={(e) => setSearch(e.target.value)}
				/>
				<em className="fa fa-search" style={{top: '10px', left: '18px',right: 'auto'}}></em>
			</div>
			<h5 className='mb-3'>Advance filters</h5>
			<div className="ebs-floorplan-bottom-filter pb-3 mb-3 border-bottom">
				<ul className="list-inline m-0">
					<li className="list-inline-item mb-2">
						<span onClick={() => {setactive('sponsor'); closeLocation()}} className={`d-flex  border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${active === 'sponsor' ? 'active' :''}`}>
							<i className="material-icons position-absolute">done</i>
							Sponsor
						</span>
					</li>
					<li className="list-inline-item mb-2">
						<span onClick={() => {setactive('exhibitor');closeLocation()}} className={`d-flex border rounded-pill px-3 py-2 align-items-center rounded-half position-relative ${active === 'exhibitor' ? 'active' :''}`}>
							<i className="material-icons position-absolute">done</i>
							Exhibitor
						</span>
					</li>
				</ul>
			</div>
			<div className="ebs-mapplic-accordion">
				<h5 className='mb-3'>Categories</h5>
				{filteredGroups.filter(item => item.type === active).map(item => 
				<div key={item.id}>
					<div className="ebs-category-label">
						<em style={{background: item.color ? item.color: '#fff'}} className="category-color"></em>	{item.name} ({data && data.locations.filter(list => list.group.includes(item.id) && list.cat_type === active).length})
					</div>
					<div className="ebs-location-wrapper">
						{data && data.locations.filter(list => list.group.includes(item.id) &&  list.cat_type === active).map(list => 
							<div key={list.id} onClick={() => openLocation(list.id)} className="ebs-location-label d-flex align-items-center"><div className="me-auto pe-2">{list.title}</div> <span>{list.about ? list.about : ''}</span></div>
						)}
					</div>
				</div>	
				)}
			</div>
		</div>}

	</div>
  )
}

export default SidebarMapplic

