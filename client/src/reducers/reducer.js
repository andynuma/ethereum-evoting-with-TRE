const reducer = (state={}, action) => {
  switch(action.type){
    case "SET_CONTRACT":
      return{
        currentContract: action.payload,
        isLoading: false
      }
    default :
      return state
  }
}

export default reducer;