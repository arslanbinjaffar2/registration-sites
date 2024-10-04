import moment from "moment";



export const getProgramsByTrack = (programs, track) => {
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
        if (program.workshop_id > 0) {
          const find = worshopProgramsByTracks(program.workshop_programs, track);
          if (find.length > 0) {
            ack.push({ ...program, 'workshop_programs': find });
          }
        }
        else if (program.program_tracks.length > 0 ) {
          const find = program.program_tracks.find((item) => (item.name === track));
          if (find !== null && find !== undefined) {
            ack.push(program);
          }
        }
        else if (program.program_tracks.length === 0) {
          // Include programs with empty program_tracks
          ack.push(program);
        }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;   
  
  }
  export const getProgramsByLocation = (programs, location) => {
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
          if(program.location==location){
            console.log(location,"location")
            ack.push({...program})
          }
        //  else if(program.workshop_id > 0){
        //   const find = worshopProgramsByLocation(program, location);
        //   if (find.length > 0) {
        //     ack.push({ ...program, 'workshop_programs': find });
        //   }
        //  }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;
  
  }
  export const worshopProgramsByTracks = (programs, track) => {
    const items = programs.reduce((ack, program) => {
      if (program.program_tracks.length > 0) {
        const find = program.program_tracks.find((item) => (item.name === track));
        if (find !== null && find !== undefined) {
          ack.push(program);
        }
      }
      return ack;
    }, []);
    return items
  }
  export const worshopProgramsByLocation = (programs, location) => {
    const items = programs.reduce((ack, program) => {
        const find = program.workshop_programs.find((item) => (item.name === location));
        if (find !== null && find !== undefined) {
          ack.push(program);
        }
      return ack;
    }, []);
    return items
  }
  
  
  export const searchThroughProgram = (programs, searchText) => {
    const regex = new RegExp(searchText, 'i'); // create a case-insensitive regex
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
        let add = false;
  
        // Search in program_workshop
        if (program.program_workshop && regex.test(program.program_workshop)) {
          add = true;
        }
  
        // Search in topic
        if (program.topic && regex.test(program.topic)) {
          add = true;
        }
  
        // Search in description
        // if (program.description && regex.test(program.description)) {
        //   add = true;
        // }
  
        // Search in location
        // if ( program.workshop_id > 0  && program.location && regex.test(program.location)) {
        //   add = true;
        // }
        // if( program.program_workshop && regex.test(program.program_workshop)){
        //   add=true
        // }
        // Search in program_tracks
        // if (program.program_tracks && program.program_tracks.length > 0) {
        //   const trackSearch = program.program_tracks.filter((track) => regex.test(track.name));
        //   if (trackSearch.length > 0) {
        //     add = true;
        //   }
        // }
        // Search in program_speakers
        // if (program.program_speakers && program.program_speakers.length > 0) {
        //   const speakerSearch = program.program_speakers.filter((speaker) => {
        //     return regex.test(speaker.first_name) || regex.test(speaker.last_name) ||
        //       (speaker.info && (regex.test(speaker.info.company_name) || regex.test(speaker.info.title)));
        //   });
        //   if (speakerSearch.length > 0) {
        //     add = true;
        //   }
        // }
  
        // Search in workshop programs
        if (program.workshop_id > 0) {
          const search = searchThroughworshopPrograms(program.workshop_programs, searchText);
          if (search.length > 0) {
            ack.push({ ...program, 'workshop_programs': search });
          }
        }
      
  
        if (add) {
          ack.push(program);
        }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;
  }
  
 export const searchThroughworshopPrograms = (programs, searchText) => {
    const regex = new RegExp(searchText, 'i'); // create a case-insensitive regex
    // const items = programs.reduce((ack, program) => {
    //   let add = false;
    //   console.log(searchText,"searchtext")
    //   // Search in topic
    //   console.log(program.topic,"programaaaaaaaaaaaaaaa searchtext")
    //   console.log(regex,"regex searchtext")
    //   if (program.topic && regex.test(program.topic)) {
    //     add = true;
    //   }
  
    //   // Search in description
    //   // if (program.description && regex.test(program.description)) {
    //   //   add = true;
    //   // }
  
    //   // // Search in location
    //   // if (program.location && regex.test(program.location)) {
    //   //   add = true;
    //   // }
  
    //   // Search in program_tracks
    //   // if (program.program_tracks && program.program_tracks.length > 0) {
    //   //   const trackSearch = program.program_tracks.filter((track) => regex.test(track.name));
    //   //   if (trackSearch.length > 0) {
    //   //     add = true;
    //   //   }
    //   // }
  
    //   // Search in program_speakers
    //   // if (program.program_speakers && program.program_speakers.length > 0) {
    //   //   const speakerSearch = program.program_speakers.filter((speaker) => {
    //   //     return regex.test(speaker.first_name) || regex.test(speaker.last_name) ||
    //   //       (speaker.info && (regex.test(speaker.info.company_name) || regex.test(speaker.info.title)));
    //   //   });
    //   //   if (speakerSearch.length > 0) {
    //   //     add = true;
    //   //   }
    //   // }
  
    //   if (add) {
    //     ack.push(program);
    //   }
    //   return ack;
    // }, []);
    const items=programs.filter((program)=>{
     return regex.test(program.topic)
    })
    return items;
  }
  
  
  export const getProgramthroughWorkshopSessions=(programs,sessions)=>{
    const regex = new RegExp(sessions, 'i'); // create a case-insensitive regex
    const newObject = {};
    Object.keys(programs).forEach((date) => {
      const items = programs[date].reduce((ack, program) => {
        let add = false;
  
        // Search in program_workshop
        if (program.program_workshop && regex.test(program.program_workshop)) {
          add = true;
        }
        if (add) {
          ack.push(program);
        }
        return ack;
      }, []);
      if (items.length > 0) {
        newObject[date] = items;
      }
    });
    return newObject;
  }



  export function BgStyles(moduleVariation,padding=0){
    const bgStyle = (moduleVariation && moduleVariation.background_color !== "") ? { backgroundColor: moduleVariation.background_color,padding:padding} : {}
  
    return bgStyle
  }


  export const customStyles = {
    control: base => ({
      ...base,
      height: 38,
      minHeight: 38,
      backgroundColor: '#FBFDFF',
      borderColor: '#E9EDF0',
      width: '100%',
      maxWidth: '100%',
    })
  };



  export function workshopTitlesOptions(programs) {
    const temp = [
      {
        value: 0,
        label: "Select Sessions",
      },
    ];
    Object.keys(programs).forEach((key) => {
      if (Array.isArray(programs[key])) {
        const program = programs[key].map((item) => {
          if (item.workshop_id > 0) {
            temp.push({
              value: item.program_workshop,
              label: item.program_workshop,
            });
          }
        });
      }
    });
    return temp;
  }


  export function DateOptions(programs,label){
    return Object.keys(programs).reduce(
      (ack, key) => [
        ...ack,
        { value: key, label: moment(key).format("D MMM") },
      ],
      [{ value: 0, label }]
    )
  }


  export const colorPalette = [
    "#5AB879", // Color 1
    "#306ADF", // Color 2
    "#C2335A", // Color 3
    "#F3C048", // Color 4
    "#48F3C0", // Color 5
    "#F348D6", // Color 6
    "#D648F3", // Color 7
    "#D6F348", // Color 8
    "#F3D648", // Color 9
    "#48D6F3", // Color 10
  ];


export const otherProgramTitleColor = "#C0C0C0";
  