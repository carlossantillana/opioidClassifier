import {combineReducers} from 'redux';
import drugReducer from './drugReducer.js';
import addictionReducer from './addictionReducer.js';

const allReducers= combineReducers({
  isOpioid: drugReducer,
  checkAddiction: addictionReducer
});
export default allReducers;
