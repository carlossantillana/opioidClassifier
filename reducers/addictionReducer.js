import {Actions} from 'react-native-router-flux';

const INITIAL_STATE = {
  drugName: "",
  county: "",
  gender: "",
  age: 0,
};
export default function(state=INITIAL_STATE, action){
  switch (action.type) {
    case "CheckAddiciton":
      state = action.payload;
      let drug = action.payload.drugName
      Actions.addictionRisk({drug: drug, age: action.payload.age, county: action.payload.county, gender: action.payload.gender})
      return state;
        break;
  default:
    return state;
  }
}
