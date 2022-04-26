import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./reducers/boardSlice";
import botFormReducer from "./reducers/botFormSlice";
import gameReducer from "./reducers/gameSlice";
import sessionReducer from "./reducers/sessionSlice";
import uiReducer from "./reducers/uiSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    botForm: botFormReducer,
    game: gameReducer,
    session: sessionReducer,
    ui: uiReducer
  }
});
