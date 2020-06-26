import { combineReducers } from "redux";

import { alertReducer } from "./alertReducer";
import { authenticationReducer } from "./authenticationReducer";
import { registerReducer } from "./registerReducer";
import { userReducer } from "./userReducer";
import { appReducer } from "./appReducer";
import { favEventsReducer } from "./favEventsReducer";

const rootReducer = combineReducers({
  alertReducer,
  authenticationReducer,
  registerReducer,
  userReducer,
  appReducer,
  favEventsReducer
});

export default rootReducer;
