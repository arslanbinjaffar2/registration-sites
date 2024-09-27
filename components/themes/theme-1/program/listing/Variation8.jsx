import React, { useState,useEffect} from 'react';
import moment from 'moment';
import TracksPopup from '../components/TrackPopup';
import ReactSelect from 'react-select';
import {Table} from 'react-bootstrap'
import {searchThroughProgram,getProgramthroughWorkshopSessions} from './Variation3'
const Variation9 = ({programs, eventUrl, tracks, showWorkshop, siteLabels, agendaSettings,eventsiteSettings}) => {
  const [programsLoc, setProgramsLoc] = useState(programs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('')
  const onDateChange = (date) => {
    setSelectedDate(date);
  }
  
  const onSessionChange = (session) => {
    setSelectedSession(session);
  }
  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== null && selectedDate.value !== 0) {
      programsObj = { [selectedDate[value]]: programs[selectedDate.value] };
    }
    if(selectedSession !== null &&  selectedSession.value!==0){
        programsObj = getProgramthroughWorkshopSessions(programsObj, selectedSession.value);;
    }
 
    if (search !== '') {
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedSession, search]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
  }, []);
   function workshopTitles(){
  const temp=[
    {
        value:0,
        label:"Select Sessions"
    }
  ]
   Object.keys(programs).forEach((key)=>{
    if (Array.isArray(programs[key])) {
        const program=programs[key].map((item)=>{
            if(item.workshop_id>0 ){
                temp.push({
                    value:item.program_workshop,
                    label:item.program_workshop
                })
            }
        })
    }
    })
    return temp
   }
    return (
        <div className="ebr_program-variation8-container">
       <div style={{padding: '60px 0 40px 0'}} className="module-section">
        <div className="container">
        <div className="ebs-variation8-filter-container d-flex justify-content-start gap-3">
        {eventsiteSettings?.agenda_search_filter === 1 && 
               <div>
              <div style={{minWidth:"280px", maxWidth: 440 }} className="ebs-form-control-search-new border-black-color">
                <input className="form-control  custom-filter-select text-white ebs-form-control-search-new" 
                placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} 
                defaultValue={value} type="text"  
                value={value} onChange={(e) => setValue(e.target.value)}
                       />
              <span className="material-symbols-outlined fa">search</span>
              </div>
              </div>
               } 
                  <ReactSelect
                  placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                  components={{ IndicatorSeparator: null }}
                  className='custom-filter-select'
                  onChange={(date) => { onDateChange(date) }}
                  value={selectedDate}
                  options={Object.keys(programs).reduce((ack, key) =>
                     ([...ack, { value: key, label: moment(key).format('DD-MM-YYYY')}]),
                      [{ value: 0, label: siteLabels.EVENTSITE_SELECT_DAY }])}
                    />
                 <ReactSelect
                  placeholder={"Session"}
                  
                  components={{ IndicatorSeparator: null }}
                  className='custom-filter-select'
                  onChange={(session) => { onSessionChange(session)}}
                  value={selectedSession}
                  options={workshopTitles()}
                    />
              
        </div>
        <div className="ebs-variation-table-container">
        <Table responsive="sm" className='bg-transparent'>
        <thead>
          <tr>
            <th>DATE</th>
            <th>TIME</th>
            <th>TITLE</th>
            <th>LOCATION</th>
            <th>TRACKS</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(programsLoc).length >0 && programsLoc && Object.keys(programsLoc).map((key,k)=>{
            return(
                <>
                {programsLoc[key].map((item)=>{
                    return(
                        <>
                        {item.workshop_id>0?
                            <tr >
                            <td>{item.date}</td>
                            <td>{moment(`${item.date} ${item.start_time}`).format(
                        "HH:mm"
                      )} -  {moment(`${item.date} ${item.end_time}`).format(
                        "HH:mm"
                      )}</td>
                            <td>{item.program_workshop}</td>
                            <td>{`${item.location.length>25?item.location.substring(0,25)+"....":item.location}`}</td>
                            <td>  <div className='tracks_container d-flex algin-items-center gap-2'>
                                {item?.program_tracks && item?.program_tracks.length>0 && item.program_tracks.slice(0,3).map((track)=>{
                                    return(
                                    <span className="d-inline-block"
                                    key={track.id+track.name}
                                    data-title={track.name}
                                    style={{
                                        backgroundColor: `${track.color ? track.color : "#000"}`,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                    }}
                                    ></span>
                                    )
                                })
                                }
                                    <TracksPopup
                                            item={item}
                                        />
                                </div>
                            </td>
                         </tr>
                            :

                            <tr >
                            <td>{item.date}</td>
                            <td>{moment(`${item.date} ${item.start_time}`).format(
                        "HH:mm"
                      )} -  {moment(`${item.date} ${item.end_time}`).format(
                        "HH:mm"
                      )}</td>
                            <td>{item.topic}</td>
                            <td>{`${item.location.length>25?item.location.substring(0,25)+"....":item.location}`}</td>
                            <td>  <div className='tracks_container d-flex algin-items-center gap-2'>
                                {item?.program_tracks && item?.program_tracks.length>0 && item.program_tracks.slice(0,3).map((track)=>{
                                    return(
                                    <span className="d-inline-block"
                                    key={track.id+track.name}
                                    data-title={track.name}
                                    style={{
                                        backgroundColor: `${track.color ? track.color : "#000"}`,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                    }}
                                    ></span>
                                    )
                                })
                                }
                                    <TracksPopup
                                            item={item}
                                        />
                                </div>
                            </td>
                         </tr>
                        }
                        </>
                        )
                    })}
                </>
            )
        })}
       
        </tbody>
      </Table>
      </div>

       </div>
       </div>
       </div>
    )
}

export default Variation9





