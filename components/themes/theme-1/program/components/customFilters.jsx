import React from 'react'
import ReactSelect from 'react-select';
import moment from 'moment';
const CustomFilters = ({filters,customStyles,siteLabels,programs,showFilter,
    eventsiteSettings,setShowFilter,handleResetFilters,setValue,value,selectedTrack,
    tracks,onTrackChange,onDateChange,selectedDate,selectedLocation,onLocationChange}) => {
        const locationOptions = [...new Set(
            Object.values(programs).flat().filter((item) => item?.location).map((item) => item.location)
          )].map((location) => ({ value: location, label: location }));
          const trimmerselectedLocation= selectedLocation ? {...selectedLocation,label:selectedLocation?.label?.length>20?`${selectedLocation?.label?.substring(0,20)}....`:selectedLocation?.label}:{value:0,label:"select location"}
  return (
    <div>
{filters && <div className="ebs-program-top-new bg-white shadow-black">
        <div className="container">
          <div className="d-flex justify-content-between align-items ">
       
              {Object.keys(programs).length > 0 && <div className="">
                <ReactSelect
                  styles={customStyles}
                  placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                  components={{ IndicatorSeparator: null }}
                  onChange={(date) => { onDateChange(date) }}
                  className='custom-date-select'
                  value={selectedDate}
                  options={Object.keys(programs).reduce((ack, key) => ([...ack, { value: key, label: moment(key).format('DD-MM-YYYY')}]), [{ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY }])}
                />
              </div>}
              <div onClick={()=>setShowFilter(!showFilter)} style={{ background:`${showFilter?"#313131":""}`,color:`${showFilter?"white":""}`,width: "48px",height: "42px"}} className='border py-2 px-12 rounded-1 cursor-pointer border-black-color'>
              <span className="material-symbols-outlined">tune</span>
          </div>
            
        
          </div>
          {/* filters */}
         {showFilter && <div className="d-flex justify-content-start mt-3 gap-4 flex-wrap">
               {/* {eventsiteSettings?.agenda_search_filter === 1 &&  */}
               <div>
              <div style={{minWidth:"280px", maxWidth: 440 }} className="ebs-form-control-search-new border-black-color">
                <input className="form-control border-black-color" placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} defaultValue={value} type="text"  
                value={value} onChange={(e) => setValue(e.target.value)} />
              <span className="material-symbols-outlined fa">search</span>
              </div>
              </div>
              {/* } */}
                  {tracks.length > 0 &&
                      <div className="">
                        <ReactSelect
                          styles={customStyles}
                          placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                          components={{ IndicatorSeparator: null }}
                          onChange={(track) => { onTrackChange(track)}}
                          className='custom-track-select'
                          value={selectedTrack}
                          options={tracks.reduce((ack, item,index, array) =>{
                            // Add the current track to the accumulator
                            ack = [...ack, { value: item.name, label: item.name }];                          
                             // If the track has sub-tracks, recursively process them
                            if (item.sub_tracks && item.sub_tracks.length > 0) {
                              ack = ack.concat(item.sub_tracks.reduce((subAck, subItem) => {
                                // Extract the name and color from the sub-track object
                                const { info } = subItem;
                                const nameInfo = info.find((infoItem) => infoItem.name === 'name');
                                // const colorInfo = info.find((infoItem) => infoItem.name === 'color');

                                // Add the sub-track to the accumulator
                                subAck = [...subAck, {
                                  value: nameInfo.value,
                                  label: `${nameInfo.value}`
                                }];

                                return subAck;
                              }, []));
                            }
                            return ack;
                            
                          },[{ value: 0, label: siteLabels.EVENTSITE_SELECT_TRACK }]) }
                          
                        />
                  </div>}
                      <div className="">
                        <ReactSelect
                          styles={customStyles}
                          placeholder="Select Location"
                          components={{ IndicatorSeparator: null }}
                          onChange={(location) => { onLocationChange(location)}}
                          className='custom-track-select'
                          value={trimmerselectedLocation}
                          options={locationOptions}
                          
                        />
                  </div>
             <div className='d-flex gap-1 align-items-center justify-content-end ms-auto ebs-reset-btn' onClick={handleResetFilters}>
              <span className="material-symbols-outlined">restart_alt</span>
              <span className='fs-xsmall fw-normal'>Reset filters</span>
            </div>
          </div>}
        </div>
      </div>}
    </div>
  )
}

export default CustomFilters