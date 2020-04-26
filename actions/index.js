export function checkDrug(drugName){
  return{
    type: "CheckDrug",
    payload: drugName
  };
}

export function checkAddiction(profile){
  return{
    type: "CheckAddiciton",
    payload: profile
  };
}
