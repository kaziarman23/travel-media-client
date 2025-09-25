import baseApi from "./baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/review",
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
export default reviewsApi;
