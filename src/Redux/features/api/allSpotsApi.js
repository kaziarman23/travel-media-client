import baseApi from "./baseApi";

const allSpotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpots: builder.query({
      query: () => "/allSpots",
      providesTags: ["AllSpots"],
    }),
    getAllSpotsByEmail: builder.query({
      query: (email) => `/allSpotsById?email=${email}`,
      providesTags: ["AllSpots"],
    }),
    addSpot: builder.mutation({
      query: (spot) => ({
        url: "/allSpots",
        method: "POST",
        body: spot,
      }),
      invalidatesTags: ["AllSpots"],
    }),
    deleteSpot: builder.mutation({
      query: (spotId) => ({
        url: `/allSpots/${spotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllSpots"],
    }),
  }),
});

export const {
  useGetAllSpotsQuery,
  useGetAllSpotsByEmailQuery,
  useAddSpotMutation,
  useDeleteSpotMutation,
} = allSpotsApi;
export default allSpotsApi;
