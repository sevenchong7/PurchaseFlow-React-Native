import * as data from '../../pages/afterLogin/SalesItemWithPricing';

export const GET_PRODUCT_LIST = "GET_PRODUCT_LIST";


export const getProductList = () => {
    try{
        return async dispatch => {
            let res = data.SalesItemWithPricing;
            if ( res ){
                dispatch({
                    type: GET_PRODUCT_LIST,
                    payload: res
                });
                // console.log(res)
            }else{
                console.log("unable to fetch!")
            };
        };

    }catch(error){
        console.log(error);
    }
}