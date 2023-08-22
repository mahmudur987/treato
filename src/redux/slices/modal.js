import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   activeModal: null,
   closable: true,
}

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      openModal(
         state,
         action,
      ) {
         state.activeModal = action.payload.type
         state.closable = action.payload.closable
         state.onModalClose = action.payload.onModalClose
      },
      closeModal(state) {
         state.activeModal = null
         state.closable = true
         if (state.onModalClose) {
            state.onModalClose()
            state.onModalClose = null
         }
      },

   },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
