import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const objectToArray =(obj) =>{
  var arr = [];
  for (const [key, value] of Object.entries(obj)) {
      arr.push(value);
  }
  return arr;
}


// Define a service using a base URL and expected endpoints
export const programApi = createApi({
  reducerPath: 'programApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL}),
  endpoints: (builder) => ({
    getPrograms: builder.query({
      query: (path) => {
       if(path.search !== ""){
          return  `/event/${path.eventUrl}/programs?query=${path.search}&page=${path.page}`
        }
        return `/event/${path.eventUrl}/programs?page=${path.page}`
      },
      transformResponse: (response) => {
       const data = objectToArray(response.data)
       const meta =  response.meta
       const links = response.links
        return  {data,meta,links};
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProgramsQuery } = programApi