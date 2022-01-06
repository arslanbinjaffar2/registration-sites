import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cmsPageApi = createApi({
  reducerPath: "cmsPageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  endpoints: (builder) => ({
    getCmsPages: builder.query({
      query: (path) => `/event/${path.eventUrl}/page/${path.pageId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCmsPagesQuery } = cmsPageApi;
