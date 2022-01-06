import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const sponsorApi = createApi({
  reducerPath: 'sponsorApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL}),
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: (path) => {
       if(path.search !== ""){
          return  `/event/${path.eventUrl}/sponsors?query=${path.search}&page=${path.page}`
        }
        return `/event/${path.eventUrl}/sponsors?page=${path.page}`
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSponsorsQuery } = sponsorApi