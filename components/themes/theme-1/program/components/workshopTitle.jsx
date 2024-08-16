import React, { Fragment, useState } from 'react'
import moment from 'moment'
import Timeline from './timeline';
 const WorkShopTitle = ({program,setShowProgramDetail,agendaSettings}) => {
const Starttime = moment(program.program_workshop_start_time, 'HH:mm:ss');
const endTime=moment(program.program_workshop_end_time, 'HH:mm:ss');
const [showWorkShopDetail,setShowWorkShopDetail]=useState(false)
    return(
        <>
             <div className="ebs-program-child-new bg-white">
            <div className="d-flex border rounded-4px h-100 border-black-color" >
                    {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(program.hide_time) === 0 && 
                    <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center'>
                        <span className='fs-medium fw-semibold'>{Starttime.format('HH:mm')}</span>
                        <span className='fs-medium fw-semibold'>
                        {endTime.format('HH:mm')}
                        </span>
                        </div>}
                        <div className='border-start border-black-color w-100 d-flex justify-content-center  align-items-center flex-wrap'>
                        <div className="d-flex justify-content-between items-center align-items-center w-100 p-3 flex-wrap">
                         <div className={`d-flex flex-column  align-items-start  cusor-pointer ${program.program_speakers.length>0?"gap-2":"gap-0"}`}>
                         {program.topic && 
                         <h4 className='m-0 fs-large fw-semibold'>{program.program_workshop.substring(0,70)}{program.topic.length>70?".....":""}</h4>}
                        
                         </div>
                         <div className='d-flex gap-3 align-items-center'>
                         <div onClick={()=>setShowWorkShopDetail(!showWorkShopDetail)} className='border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
                            <i className={`${showWorkShopDetail?"fa fa-minus":"fa fa-plus"}`} /> </div>
                        
                        </div>
                        </div>

                        </div>
            </div>
           
        </div>
    <div className={`d-flex  gap-lg-5 gap-3 ${showWorkShopDetail && "mt-3 "}`}
       style={{ 
        display:`${showWorkShopDetail?"block":"none"}`,
        // transform: showDetail ? "translateY(0px)" : "translateY(-200px)",
        opacity: showWorkShopDetail ? 1 : 0,
        height:showWorkShopDetail ? "auto" : 0,
        visibility: showWorkShopDetail ? "visible" : "hidden",
        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
            //  style={{
            //     transform: showWorkShopTitle ? "translateY(0px)" : "translateY(-200px)",
            //     opacity: showWorkShopTitle ? 1 : 0,
            //     height:showWorkShopTitle ? "auto" : 0,
            //     transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
            //   }}
    >
       <div className={`d-flex flex-column w-100 timeline-container  ${program.workshop_programs.length>0?" gap-3":""}`}>
      {program.workshop_programs.map((item,i)=>(
        <Fragment key={item.id}>
        <SingleProgram 
        item={item} i={i} lastItem={program.workshop_programs.length-1} agendaSettings={agendaSettings} setShowProgramDetail={setShowProgramDetail}/>
        </Fragment>
      ))}
       </div>

    </div>
    </>

    )
}
   

export default WorkShopTitle




function  SingleProgram({item,agendaSettings,i}){
    return(
        <div className='d-flex justify-content-center align-items-center ebs-list-workshop'>
       <Timeline/>
        <div  className="d-flex border rounded-4px  w-100 bg-white border-black-color" >

        {/* <div className="col-lg-2"> */}
        {parseInt(agendaSettings.agenda_display_time) === 1 && parseInt(item.hide_time) === 0 && 
                   <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center justify-content-center'>
                       <span className='fs-medium fw-semibold'>{moment(`${item.date} ${item.start_time}`).format('HH:mm')}</span>
                       <span className='fs-medium fw-semibold'>
                       {moment(`${item.date} ${item.end_time}`).format('HH:mm')}
                       </span>
                       </div>}
                <div className='border-start w-100 d-flex justify-content-center  align-items-center border-black-color'>
                <div className="d-flex justify-content-between items-center align-items-center w-100 p-3">
                 <div className='d-flex flex-column  align-items-start gap-2 cusor-pointer'>
                  <h4 className='m-0 fs-large fw-semibold'>{item.topic}</h4>
                 </div>
                 {/* <div className='d-flex gap-3 align-items-center'>
                 <div onClick={()=>{
                    handleProgramId(item.id)
                    setShowProgramDetail(true)} 
                    }
                    className='border-black-color border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                    
                    
                    </div> */}
                </div>

                </div>
    </div>
                    </div>
    )
}