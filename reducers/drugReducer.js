import {Actions} from 'react-native-router-flux';
let isOpioid= false;
let inputDrug = "";
export default function(state=isOpioid, action){
  console.log("in reducer")
   Actions.isOpioid()
  // switch (action.type) {
  //   case "isOpioid": isOpioid=true;
  //   console.log("test")
  //   Actions.checkDrug()
  //     break;
  //   case "isNotOpioid": isOpioid=false;
  //     break;
  // }
  return isOpioid;
}
