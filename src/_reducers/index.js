import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {item} from "./item.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  item,
  alert
});

export default rootReducer;
