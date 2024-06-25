import { GET_PRODUCT_LIST } from "../action/ProductAction";




const initialState = {
    productsList: [],
    favorite: [],
}

function productReducer(state = initialState, action){
    switch( action.type ){
        case GET_PRODUCT_LIST:
            return { ...state, productsList: action.payload };
        default:
            return state;
    }
}



export default productReducer

