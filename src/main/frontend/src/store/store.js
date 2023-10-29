import { configureStore } from "@reduxjs/toolkit";

import botFormReducer from "./reducers/botFormSlice";
import gameReducer from "./reducers/gameSlice";
import sessionReducer from "./reducers/sessionSlice";
import settingsReducer from "./reducers/settingsSlice";
import uiReducer from "./reducers/uiSlice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    botForm: botFormReducer,
    game: gameReducer,
    session: sessionReducer,
    ui: uiReducer
  }
});
