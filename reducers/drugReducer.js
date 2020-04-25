import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  drugName: '',
  isOpioid:  false,
};
export default function(state=INITIAL_STATE, action){
  console.log(action.type)
  switch (action.type) {
    case "CheckDrug":
      console.log(action.payload)
      Actions.isOpioid()
      return state;
        break;
  default:
  return state;
  }
  return isOpioid;
}
