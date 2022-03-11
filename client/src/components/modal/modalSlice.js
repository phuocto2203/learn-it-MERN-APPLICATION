import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showCreatePostModal: false,
    showEditPostModal: false,
    postID: '', //post id to match on db for updating
    isPostsUpdated: false, // check if there is any updated posts on dashboard
  },
  reducers: {
    setShowCreateModal: (state, action) => {
      state.showCreatePostModal = action.payload;
    },
    setShowEditModal: (state, action) => {
      state.showEditPostModal = action.payload;
    },
    savePostId: (state, action) => {
      state.postID = action.payload;
    },
    clearPostId: (state) => {
      state.postID = '';
    },
    setPostsUpdated: (state, action) => {
      state.isPostsUpdated = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setShowCreateModal, setShowEditModal, savePostId, clearPostId, setPostsUpdated} =
  actions;
export default reducer;
