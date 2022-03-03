import { configureStore } from "@reduxjs/toolkit";

import botFormReducer from "./reducers/botFormSlice";
import sessionReducer from "./reducers/sessionSlice";
import uiReducer from "./reducers/uiSlice";

export default configureStore({
  reducer: { botForm: botFormReducer, session: sessionReducer, ui: uiReducer }
});
