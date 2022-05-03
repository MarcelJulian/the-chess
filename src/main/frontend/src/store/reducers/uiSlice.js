import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isToastShown: false,
    toastType: "success",
    toastMessage: "",
    isSettingsDialogShown: false,
    // to show loading when move sent
    isSendingMove: false
  },
  reducers: {
    showSettingsDialog: (state, _) => {
      state.isSettingsDialogShown = true;
    },
    hideSettingsDialog: (state, _) => {
      state.isSettingsDialogShown = false;
    },

    // to show loading
    sendMoveRequested: (state, _) => {
      state.isSendingMove = true;
    },
    sendMoveResponded: (state, _) => {
      state.isSendingMove = false;
    },

    showSuccessToast: (state, action) => {
      state.isToastShown = true;
      state.toastType = "success";
      state.toastMessage = action.payload;
    },
    showErrorToast: (state, action) => {
      state.isToastShown = true;
      state.toastType = "error";
      state.toastMessage = action.payload;
    },
    showRequestErrorToast: (state, action) => {
      const response = action.payload;
      state.isToastShown = true;
      state.toastType = "error";
      state.toastMessage = `Error Code: ${response.status} ${response.statusText}`;
    },
    hideToast: (state, _) => {
      state.isToastShown = false;
    }
  }
});

export const {
  showSuccessToast,
  showErrorToast,
  sendMoveRequested,
  sendMoveResponded,
  showRequestErrorToast,
  hideToast,
  hideSettingsDialog,
  showSettingsDialog
} = uiSlice.actions;

export default uiSlice.reducer;
