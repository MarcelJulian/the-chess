import { createSlice } from "@reduxjs/toolkit";

export const InputStatus = {
  IDLE: 0,
  SEND_MOVE: 1,
  MOVE_SENT: 2,
  MOVE_REJECTED: 3,
  RECORD: 4,
  TRANSCRIBE: 5,
  CONFIRM_MOVE: 6,
  CONFIRM_COMMAND: 7,
  TRANSCRIBE_ERROR: 8
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDarkMode: false,
    isToastShown: false,
    toastType: "success",
    toastMessage: "",
    isSettingsDialogShown: false,

    inputStatus: InputStatus.IDLE,
    transcribedData: null,

    // used in GameControlCard
    isDrawOffered: false
  },
  reducers: {
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    showSettingsDialog: (state, _) => {
      state.isSettingsDialogShown = true;
    },
    hideSettingsDialog: (state, _) => {
      state.isSettingsDialogShown = false;
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
    },
    setInputStatus: (state, action) => {
      state.inputStatus = action.payload;
    },
    setTranscribedData: (state, action) => {
      state.transcribedData = action.payload;
    },
    setIsDrawOffered: (state, action) => {
      state.isDrawOffered = action.payload;
    }
  }
});

export const {
  setIsDarkMode,
  showSuccessToast,
  showErrorToast,
  showRequestErrorToast,
  hideToast,
  hideSettingsDialog,
  showSettingsDialog,
  setInputStatus,
  setTranscribedData,
  setIsDrawOffered
} = uiSlice.actions;

export default uiSlice.reducer;
