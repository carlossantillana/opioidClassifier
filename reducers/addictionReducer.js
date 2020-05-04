import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  drugName: "",
  city: "",
  currentState: "",
  history: "",
  age: 0,
};
export default function(state=INITIAL_STATE, action){
  switch (action.type) {
    case "CheckAddiciton":
      state = action.payload;
      let drug = action.payload.drugName
      Actions.addictionRisk({drug: drug})
      return state;
        break;
  default:
    return state;
  }
}
