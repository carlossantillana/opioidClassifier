export function checkDrug(drugName){
  return{
    type: "CheckDrug",
    payload: drugName
  };
}
