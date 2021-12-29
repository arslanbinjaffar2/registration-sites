import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const speakerApi = createApi({
  reducerPath: 'speakerApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL}),
  endpoints: (builder) => ({
    getSpeakers: builder.query({
      query: (path) => {
       if(path.search !== ""){
          return  `/event/${path.eventUrl}/speakers?query=${path.search}&page=${path.page}`
        }
        return `/event/${path.eventUrl}/speakers?page=${path.page}`
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSpeakersQuery } = speakerApi