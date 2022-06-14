import React, {useState} from 'react'
import moment from 'moment'
import ProgramItem from './ProgramItem';

const WorkShop = ({item}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="ebs-program-parent ebs-program-workshop">
    <div className="ebs-workshop-header">{item.program_workshop}<i className="material-icons" onClick={()=>{setOpen(!open)}}>expand_more</i></div>
          {open && item.workshop_programs.map((program,i) =>
                <ProgramItem key={i} program={program}/>           
          )}
    </div>
  )
}

export default WorkShop