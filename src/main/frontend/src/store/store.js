import { configureStore } from "@reduxjs/toolkit";

import botFormReducer from "./reducers/botFormSlice";
import sessionReducer from "./reducers/sessionSlice";

export default configureStore({
  reducer: { botForm: botFormReducer, session: sessionReducer }
});
