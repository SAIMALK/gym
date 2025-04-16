import { AUTHOR_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorDetails: builder.query({
      query: (authorId) => ({ 
        url: `${AUTHOR_URL}/${authorId}`
     }),
      keepUnusedDataFor: 5,
    }),
    createRev: builder.mutation({
      query: (data) => ({
        url: `${AUTHOR_URL}/${data.authorId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Author'],
    }),
  }),
});
export const {useGetAuthorDetailsQuery, useCreateRevMutation} = authorApiSlice;
