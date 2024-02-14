import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "../store/User/userSlice";
import slotsSlice from "../store/slots/slotsSlice";
import knowledgeSessionsSlice from "./knowledgeSessions/knowledgeSessionSlice";
import referralSlice from "../store/referral/referralSlice";
import viewsSlice from "../store/views/viewsSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  slotsData: slotsSlice,
  sessions: knowledgeSessionsSlice,
  referralDetails: referralSlice,
  views: viewsSlice,
});

const configStorage = {
  key: "root",
  storage,
  timeout: null,
  whitelist: ["user", "slotsData", "sessions", "views", "referralDetails"],
};

export default persistReducer(configStorage, rootReducer);
