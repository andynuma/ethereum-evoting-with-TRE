const reducer = (state={}, action) => {
  switch(action.type){
    case "SET_CONTRACT":
      return{
        currentContract: action.payload,
        isLoading: false,
        isEnd:false
      }
    case "SET_ISEND":
      return{
        ...state,
        isEnd:true
      }
    default :
      return state
  }
}

export default reducer;