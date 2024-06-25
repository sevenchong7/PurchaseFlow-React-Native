import * as user from '../../pages/afterLogin/Users';

export const GET_USER = "GET_USER";
export const RESET_PW = "RESET_PW";

export const getUser = () => {
    try{
        return async dispatch => {
            const res = user;
            if( res.users ){
                dispatch({
                    type: GET_USER,
                    payload: res.users,
                });
                // console.log(res.users)
            }else{
                console.log("unable to fetch")
            }
            
        };
        
    }catch(error){
        console.log(error)
    };
}

export const resetPw = (user) => dispatch => {
    dispatch({
        type: RESET_PW,
        payload: user,
    })
}