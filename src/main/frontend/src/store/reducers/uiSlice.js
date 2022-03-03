import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isToastShown: false,
    toastType: "",
    toastMessage: ""
  },
  reducers: {
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
    hideToast: (state, _) => {
      state.isToastShown = false;
    }
  }
});

export const { showSuccessToast, showErrorToast, hideToast } = uiSlice.actions;

export default uiSlice.reducer;
