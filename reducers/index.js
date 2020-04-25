import {combineReducers} from 'redux';
import countReducer from './countReducer.js';
import drugReducer from './drugReducer.js';

const allReducers= combineReducers({
  count: countReducer,
  isOpioid: drugReducer,

});
export default allReducers;
