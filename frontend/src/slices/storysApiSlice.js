import { STORYS_URL , UPLOAD_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const storysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorys: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: STORYS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Story'],
    }),
    getStoriesByAuthorId: builder.query({
      query: (authorId) => ({
        url: `${STORYS_URL}/author/${authorId}`, // Assuming there's an endpoint for fetching stories by author ID
      }),
      keepUnusedDataFor: 5,
    }),
    getStoryDetails: builder.query({
      query: (storyId) => ({
        url: `${STORYS_URL}/${storyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createStory: builder.mutation({
      query: () => ({
        url: `${STORYS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Story'],
    }),
    updateStory: builder.mutation({
      query: (data) => ({
        url: `${STORYS_URL}/${data.storyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Storys'],
    }),
    uploadStoryCover: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST', 
        body: data,
      }),
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `${STORYS_URL}/${storyId}`,
        method: 'DELETE',
      }),
      providesTags: ['Story'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${STORYS_URL}/${data.storyId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Story'],
    }),
    deleteComment: builder.mutation({
      query: ({ storyId, commentId }) => ({
        url: `${STORYS_URL}/${storyId}/reviews/${commentId}`,
        method: "DELETE",
  }),
  invalidatesTags: ["Story"],
}),

    getTopStorys: builder.query({
      query: () => `${STORYS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetStorysQuery,
  useGetStoryDetailsQuery,
  useGetStoriesByAuthorIdQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useUploadStoryCoverMutation,
  useDeleteStoryMutation,
  useCreateReviewMutation,
  useDeleteCommentMutation,
  useGetTopStorysQuery,
} = storysApiSlice;
