import { configureStore } from "@reduxjs/toolkit";

import botFormReducer from "./reducers/botFormSlice";

export default configureStore({
  reducer: { botForm: botFormReducer }
});
