import React, { useState, useEffect } from 'react';
import HeadingElement from "@/ui-components/HeadingElement";
import ProgramItem from './components/ProgramItem';
import WorkShop from './components/WorkShop';
import ReactSelect from 'react-select';
const customStyles = {
  control: base => ({
    ...base,
    height: 60,
    minHeight: 60,
    backgroundColor: '#F4F4F4',
    borderColor: '#ced4da',
    width: '100%',
    maxWidth: '100%'
  })
};
const ProgramListing = ({programs, eventUrl, tracks, showWorkshop, siteLabels}) => {
 const [programsLoc, setProgramsLoc] = useState(programs);
 const [selectedDate, setSelectedDate] = useState(null);
 const [selectedTrack, setSelectedTrack] = useState(null);
 const [value, setValue] = useState('');
 const [search, setSearch] = useState('')


  const onDateChange = (date)=>{
      setSelectedDate(date);
  }

  const onTrackChange = (track) =>{
    setSelectedTrack(track);
  }

  useEffect(() => {
    let programsObj = programs;
    if(selectedDate !== null && selectedDate.value !== 0){
      programsObj = {[selectedDate[value]]:programs[selectedDate.value]};
    }
    if(selectedTrack !== null && selectedTrack.value !== 0){
      programsObj = getProgramsByTrack(programsObj, selectedTrack.value);
    }
    if(search !== ''){
      programsObj = searchThroughProgram(programsObj, search.toLowerCase());
    }
    setProgramsLoc(programsObj);
  }, [selectedDate, selectedTrack, search]);
  

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);



  return (
    <div data-fixed="false" style={{ padding: "80px 0" }} className="module-section ebs-program-listing-wrapper ebs-transparent-box">
      <div className="container">
        <HeadingElement dark={false} label={'Schedule Programs'} desc={''} align={'center'} />
      </div>
      <div className="ebs-program-top">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-5">
              <div style={{maxWidth: 440}} className="ebs-form-control-search pb-3"><input className="form-control" placeholder={siteLabels.EVENTSITE_PROGRAM_SEARCH} defaultValue={value} type="text" onChange={(e) => setValue(e.target.value)} />
                <em className="fa fa-search"></em>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row flex-row justify-content-end">
                <div className="col-md-5 col-6">
                  <ReactSelect
                    styles={customStyles}
                    placeholder={siteLabels.EVENTSITE_SELECT_DAY}
                    components={{ IndicatorSeparator: null }}
                    onChange={(date)=>{onDateChange(date)}}
                    options={Object.keys(programs).reduce((ack, key)=>([...ack, {value:key,label:key}]),[{value:0, label:siteLabels.EVENTSITE_SELECT_DAY}])}
                  />
                </div>
                <div className="col-md-5 col-6">
                  <ReactSelect
                    styles={customStyles}
                    placeholder={siteLabels.EVENTSITE_SELECT_TRACK}
                    components={{ IndicatorSeparator: null }}
                    onChange={(track)=>{onTrackChange(track)}}
                    options={tracks.reduce((ack, item)=>([...ack, {value:item.name,label:item.name}]),[{value:0, label:siteLabels.EVENTSITE_SELECT_TRACK}])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="ebs-main-program-listing">
            {programsLoc && Object.keys(programsLoc).map((key ,k ) => (
                <div className="ebs-program-parent" key={k}>
                  {programsLoc[key][0] && <div className="ebs-date-border">{programsLoc[key][0].heading_date}</div>}
                  {programsLoc[key].map((item,i) =>(
                      item.workshop_id > 0  ? 
                      <WorkShop item={item} key={i} eventUrl={eventUrl} showWorkshop={showWorkshop} />:
                      <ProgramItem program={item} key={i} eventUrl={eventUrl} />
                  ))}
                  
                </div>

              ))}
          </div>
        </div>
    </div>
  )
}

export default ProgramListing


const getProgramsByTrack = (programs, track) =>{
  const newObject = {};
  Object.keys(programs).forEach((date)=>{
    const items = programs[date].reduce((ack, program)=>{
                        if(program.workshop_id > 0){
                          const find = worshopProgramsByTracks(program.workshop_programs, track);
                          if(find.length > 0){
                            ack.push({...program, 'workshop_programs': find });
                          }
                        }
                        else if(program.program_tracks.length > 0){
                          const find = program.program_tracks.find((item)=>(item.name === track));
                          if(find !== null && find !== undefined){
                              ack.push(program);
                          }
                        }  
                        return ack;         
                  }, []);
    if(items.length > 0){
      newObject[date]=items;
    }
  });
  return newObject;

}

const worshopProgramsByTracks = (programs, track) => {
    const items = programs.reduce((ack, program)=>{
      if(program.program_tracks.length > 0){
        const find = program.program_tracks.find((item)=>(item.name === track));
        console.log(program.program_tracks.find((item)=>(item.name === track)));
        if(find !== null && find !== undefined){
            ack.push(program);
        }
      }  
      return ack;         
  }, []);
  return items
}



const searchThroughProgram = (programs, searchText) =>{
  const newObject = {};
  Object.keys(programs).forEach((date)=>{
    const items = programs[date].reduce((ack, program)=>{
                        if(program.workshop_id > 0){
                          const search = searchThroughworshopPrograms(program.workshop_programs, searchText);
                          if(search.length > 0){
                            ack.push({...program, 'workshop_programs': search });
                          }
                        } 
                        else {
                          let add = false;
                        
                          if(program.topic.toLowerCase().indexOf(searchText) !== -1 ||
                            program.description.toLowerCase().indexOf(searchText) !== -1 ||
                            program.location.toLowerCase().indexOf(searchText) !== -1
                          ){
                            add = true;
                          }

                          if(program.program_tracks.length > 0){
                            const trackSearch = program.program_tracks.filter((track)=>(track.name.toLowerCase().indexOf(searchText) !== -1));
                            if(trackSearch.length > 0){
                              add = true;
                            }
                          }

                          if(program.program_speakers.length > 0){
                            const trackSearch = program.program_speakers.filter((speaker)=>((speaker.first_name.toLowerCase().indexOf(searchText) !== -1 ||
                             speaker.last_name.toLowerCase().indexOf(searchText) !== -1 ||
                              (speaker.info && speaker.info.company_name.toLowerCase().indexOf(searchText) !== -1) ||
                              (speaker.info && speaker.info.title.toLowerCase().indexOf(searchText) !== -1) )));
                            if(trackSearch.length > 0){
                              add = true;
                            }
                          }

                          if(add){
                            ack.push(program);
                          }
                          
                      }
                        return ack;  
                      
                  }, []);
    if(items.length > 0){
      newObject[date]=items;
    }
  });
  return newObject;
}

const searchThroughworshopPrograms = (programs, searchText) => {
  const items = programs.reduce((ack, program)=>{
    let add = false;                    
    if(program.topic.toLowerCase().indexOf(searchText) !== -1 ||
      program.description.toLowerCase().indexOf(searchText) !== -1 ||
      program.location.toLowerCase().indexOf(searchText) !== -1
    ){
      add = true;
    }

    if(program.program_tracks.length > 0){
      const trackSearch = program.program_tracks.filter((track)=>(track.name.toLowerCase().indexOf(searchText) !== -1));
      if(trackSearch.length > 0){
        add = true;
      }
    }

    if(program.program_speakers.length > 0){
      const trackSearch = program.program_speakers.filter((speaker)=>((speaker.first_name.toLowerCase().indexOf(searchText) !== -1 ||
        speaker.last_name.toLowerCase().indexOf(searchText) !== -1 ||
        (speaker.info && speaker.info.company_name.toLowerCase().indexOf(searchText) !== -1) ||
        (speaker.info && speaker.info.title.toLowerCase().indexOf(searchText) !== -1) )));
      if(trackSearch.length > 0){
        add = true;
      }
    }

    if(add){
      ack.push(program);
    }     
    return ack;         
}, []);
return items
}