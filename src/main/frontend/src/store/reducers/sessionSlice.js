import { createSlice } from "@reduxjs/toolkit";

export const botFormSlice = createSlice({
  name: "session",
  initialState: {
    accessToken: "",
    username: "",
    isSignedIn: false
  },
  reducers: {
    signIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.isSignedIn = true;
    },
    signOut: (state, _) => {
      state.accessToken = "";
      state.username = "";
      state.isSignedIn = false;
    }
  }
});

export const { signIn, signOut } = botFormSlice.actions;

export default botFormSlice.reducer;
