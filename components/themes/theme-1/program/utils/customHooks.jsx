import  { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setProgramDetail } from 'store/Slices/ProgramListingSlice';

export const useDimention = () => {
    const [width,setWidth]=useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
  return {
    width:width
  }
  
}


export const useDebounce = (value) => {
  const [search, setSearch] = useState('')
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return{
    search:search
  }
}



export const useProgramId=()=>{
  const dispatch=useDispatch()
  const [programsState,setProgramsState]=useState({
    id:0,
    programArray:[]
  })
  const handleItemClick = (item, programArray) => {
    setProgramsState({...programsState, id: item.id, programArray });
    dispatch(setProgramDetail({id:item.id}))
  };
  return{
    handleItemClick,
    programsState,
    setProgramsState
  }
}



export const useFilteredProgramByDate=(programs,selectedDate,setProgramLoc)=>{
  useEffect(() => {
    let programsObj = programs;
    if (selectedDate !== "All" && selectedDate !== "") {
      programsObj = { [selectedDate]: programs[selectedDate] };
      setProgramLoc(programsObj);
    } else if (selectedDate == "All") {
      setProgramLoc(programs);
    }
  }, [selectedDate]);
}