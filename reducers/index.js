import {combineReducers} from 'redux';
import drugReducer from './drugReducer.js';

const allReducers= combineReducers({
  isOpioid: drugReducer,

});
export default allReducers;
