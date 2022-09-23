import React, {useState} from 'react'
import moment from 'moment'
import ProgramItem from "components/themes/theme-1/program/components/ProgramItem";

const WorkShop = ({item, eventUrl, showWorkshop}) => {
  const [open, setOpen] = useState(showWorkshop);
  console.log(item.workshop_programs)
  return (
    <div className="ebs-program-parent ebs-program-workshop">
    <div onClick={()=>{setOpen(!open)}} className="ebs-workshop-header">{item.program_workshop}<i className="material-icons">{open ? 'expand_less' : 'expand_more'}</i></div>
          {open && item.workshop_programs.map((program,i) =>
                <ProgramItem key={i} eventUrl={eventUrl} program={program}/>           
          )}
    </div>
  )
}

export default WorkShop