import baseApi from "./baseApi";

const bestSpotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBestSpots: builder.query({
      query: () => "/bestSpots",
      providesTags: ["BestSpots"],
    }),
  }),
});

export const { useGetBestSpotsQuery } = bestSpotsApi;
export default bestSpotsApi;
