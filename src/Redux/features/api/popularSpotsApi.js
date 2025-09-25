import baseApi from "./baseApi";

const popularSpotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularSpots: builder.query({
      query: () => "/popularspots",
      providesTags: ["PopularSpots"],
    }),
  }),
});

export const { useGetPopularSpotsQuery } = popularSpotsApi;
export default popularSpotsApi;
