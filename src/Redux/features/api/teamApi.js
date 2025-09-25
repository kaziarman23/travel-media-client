import baseApi from "./baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => "/team",
      providesTags: ["Team"],
    }),
  }),
});

export const { useGetTeamQuery } = teamApi;
export default teamApi;
