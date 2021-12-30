import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL}),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (path) => `/event/${path.eventUrl}/news?page=${path.page}`,
    }),
    getNewsSingle: builder.query({
      query: (path) => `/event/${path.eventUrl}/news/${path.id}/detail`,
      transformResponse: (response) => response.data
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsQuery, useGetNewsSingleQuery } = newsApi