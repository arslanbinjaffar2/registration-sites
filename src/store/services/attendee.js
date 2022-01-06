import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const attendeeApi = createApi({
  reducerPath: 'attendeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL}),
  endpoints: (builder) => ({
    getAttendees: builder.query({
      query: (path) => {
       if(path.search !== ""){
          return  `/event/${path.eventUrl}/attendees?query=${path.search}&page=${path.page}`
        }
        return `/event/${path.eventUrl}/attendees?page=${path.page}`
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAttendeesQuery } = attendeeApi