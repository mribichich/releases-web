import { combineReducers } from "redux";
import applications from "./applications";
import versionSelections from "./versionSelections";

export default combineReducers({
  applications,
  versionSelections
});
