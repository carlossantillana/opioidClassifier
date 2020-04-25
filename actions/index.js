export function increment(){
  return{
    type: "Increment"
  };
}
export function decrement(){
  return{
    type: "Decrement"
  };
}
export function checkDrug(drugName){
  return{
    type: "CheckDrug",
    payload: drugName
  };
}
