import React from 'react'
import moment from 'moment'
import Timeline from './timeline';
 const WorkShopTitle = ({program,showWorkShopTitle}) => {
const Starttime = moment(program.program_workshop_start_time, 'HH:mm:ss');
const endTime=moment(program.program_workshop_end_time, 'HH:mm:ss');
    return(
    <div className='d-flex align-items-start gap-5 mt-3'
             style={{
                transform: showWorkShopTitle ? "translateY(0px)" : "translateY(-200px)",
                opacity: showWorkShopTitle ? 1 : 0,
                height:showWorkShopTitle ? "auto" : 0,
                visibility: showWorkShopTitle ? "visible" : "hidden",
                transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
              }}
    >
     <Timeline workshopLength={2}/>
     <div className="d-flex border rounded-4px h-90 w-100">
                {/* <div className="col-lg-2"> */}
                    <div className='p-2 px-3  ebs-program-date d-flex flex-column align-items-center'>
                        <span className='fs-medium fw-semibold'>{Starttime.format('HH:mm')}</span>
                        <span > - </span>
                        <span className='fs-medium fw-semibold'>
                        {endTime.format('HH:mm')}
                        </span>
                        </div>
                        <div className='border-start w-100 d-flex justify-content-center  align-items-center'>
                        <div className="d-flex justify-content-between items-center align-items-center w-100 p-3">
                         <div className='d-flex flex-column  align-items-start gap-2 cusor-pointer'>
                          <h4 className='m-0 fs-large fw-semibold'>{program.program_workshop}</h4>
                         </div>
                         <div className='d-flex gap-3 align-items-center'>

                         {/* {program.workshop_id ?  */}
                         {/* <div className='border p-2 rounded-4px d-flex justify-content-center align-items-center cusor-pointer' style={{ height:"35px",width:"35px" }}>
                         <i class="fas fa-ellipsis-h"></i>
                            </div> */}
                         {/* :""} */}
                        </div>
                        </div>

                        </div>
         
            </div>
    </div>
    )
}
   

export default WorkShopTitle