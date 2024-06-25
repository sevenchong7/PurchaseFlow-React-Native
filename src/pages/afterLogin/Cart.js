import AsyncStorage from '@react-native-async-storage/async-storage';
import { isArray } from '../api/get-provider/GetCommon';

var key = "Cart"; 

export const retrieveCartStorage = async () => {
    var result = await AsyncStorage.getItem(key).then(res => {
        return (JSON.parse(res));
    });
    // console.log("retrieve :"+result);
    return result;
}


//! Before add to cart, get saved products > checking products - if exists, increase quantity else save new items 
//* Add to Cart Function
export const addToCart = async (item) => {
    let valid = true;
    // console.log("addToCart(item) ",item);

    await AsyncStorage.getItem(key).then(res => {
        let savedItems = JSON.parse(res);
        // console.log("save Item : " + res);

        try {
            let array = [];
            
            if (res != null && isArray(savedItems)) {
                array = savedItems;
                

                for (var i in array) {
                    if (array[i].Id == item.Id) {
                        valid = false;
                        array[i].quantity = item.quantity;
                        

                    }
                }

                saveCart(array)
            }

            if (valid) {
                array.push(item)
                saveCart(array)
            }

        } catch (err) {
            console.log(err)
        }
    });
}


//* AsyncStorage - Save
export const saveCart = async (element) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(element));
        // console.log(JSON.stringify(element));
    } catch (error) {
        // Error saving data
        console.log(error)
    }
};

//* Remove Selected Item
export const removeProduct = async (item) => {
    let boo = true;

    await AsyncStorage.getItem(key).then(res => {
        let savedItems = JSON.parse(res);

        try {
            let array = [];
            array = savedItems;

            //todo - check merchantId > check the productId

            for (var i in array) {
                if (array[i].items.Id == item.items.Id) {
                    boo = false;
                    array.splice(i, 1);
                }
            }

            saveCart(array)

        } catch (err) {
            console.log(err)
        }
    });
}

//* Clear All Cart
export const removeAllItems = async () => {
    await AsyncStorage.removeItem(key);
} 

