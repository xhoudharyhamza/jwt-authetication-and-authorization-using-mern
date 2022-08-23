 let reducer=(action, state)=>{
    switch (action.type) {
        case "SET_USER":
            return{
                ...state,
                user: action.payload.user,
                loggedIn:action.payload.loggedIn
            }
    
        default:
            return{
                ...state
            }
    }
}
export default reducer