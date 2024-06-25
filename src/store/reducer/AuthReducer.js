import { GET_USER, RESET_PW } from '../action/AuthAction';

const initialState = {
    users: [],
};

function authReducer ( state = initialState, action ){
    switch( action.type ){
        case GET_USER:
            return { ...state, users: action.payload};
        case RESET_PW:
            return { ...state, users: state.users.map( user => {
                if( user.username == action.payload.username ){
                    return action.payload
                };
                return user;
            }
            )};
        default:
            return state;
    }
    
}

export default authReducer;