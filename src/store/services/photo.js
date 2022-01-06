import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const photoApi = createApi({
  reducerPath: "photoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: (path) => `/event/${path.eventUrl}/photos?page=${path.page}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhotosQuery } = photoApi;
