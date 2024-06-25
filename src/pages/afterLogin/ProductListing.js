import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getProductList } from "../../store/action/ProductAction";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Badge } from "react-native-paper";
import { addToCart, removeAllItems, retrieveCartStorage, saveCart } from "./Cart";
import CartList from "./CartList";
import { useFocusEffect, useRoute } from "@react-navigation/native";




const ProductListing = ({navigation}) => {
    const dispatct =  useDispatch();
    const [header, setHeader] = useState("Health");
    // const [showAdd , setshowAdd] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [itemCount, setItemCount] = useState(1);
    useEffect(() => {dispatct(getProductList())},[]);
    const [cartItem,setCartItem] = useState(0);
    const productList = useSelector(state => state.productReducer.productsList);
    
    const route = useRoute();

    useEffect(() => {
        if (route.params?.reloadListing) {
            // Trigger the reload effect (e.g., fetch updated cart data)
            retrieveCartStorage().then((updatedCart) => {
                // Update cart item count based on retrieved data
                if (updatedCart === null) {
                    setCartItem(0);
                    console.log("Add cart badge UI: 0");
                } else if (Array.isArray(updatedCart)) {
                    setCartItem(updatedCart.length);
                    console.log("Add cart badge UI:", updatedCart.length);
                } else {
                    console.error("Unexpected cart data:", updatedCart);
                    setCartItem(0);
                }
            }).catch(error => {
                console.error("Error retrieving cart storage:", error);
                setCartItem(0);
            });
        }
    }, [route.params?.reloadListing]);

    useFocusEffect(
        React.useCallback(() => {
            // Here you can place the logic to reload the cart data or any other effect
            retrieveCartStorage().then((updatedCart) => {
                // Your existing logic for setting the cart item count
                if (updatedCart === null) {
                    setCartItem(0);
                    console.log("Add cart badge UI: 0");
                } else if (Array.isArray(updatedCart)) {
                    setCartItem(updatedCart.length);
                    console.log("Add cart badge UI:", updatedCart.length);
                } else {
                    console.error("Unexpected cart data:", updatedCart);
                    setCartItem(0);
                }
            }).catch(error => {
                console.error("Error retrieving cart storage:", error);
                setCartItem(0);
            });
        }, [])
    );
    
    

    const passItem = (item) => {
        navigation.navigate("Product Detail" , item);
        
    };
    
    const removeCart = () => {
        removeAllItems();
        setItemCount(1);
        setCartItem(0);
        setSelectedItem('');
    }

    const addCart = (itemId) => {
        
        retrieveCartStorage().then((cart) => {
            if (!Array.isArray(cart)) {
                cart = [];
            }
    
            // Find the item in the cart by itemId
            let item = cart.find(i => i.items.Id === itemId.Id);
    
            // If item exists, increase its quantity
            if (item) {
                setItemCount(item.quantity);
            } else {
                // If item does not exist, create it with quantity 1
                item = { items: itemId, quantity: 1 };
                cart.push(item);
            }
    
            // Log the updated item
            console.log("Add Item:", item);
    
            // Save updated cart
            saveCart(cart).then(() => {
                // Update UI
                retrieveCartStorage().then((updatedCart) => {
                    setCartItem(updatedCart.length);
                    console.log("Add cart badge UI:", updatedCart.length);
                });
            });
        });

        retrieveCartStorage().then((res)=>{
            console.log(res)
        })
    }

    const addItemCount = (itemId) => {
        console.log("Item ID: ", itemId.Id);
    
        retrieveCartStorage().then((cart) => {
            if (!Array.isArray(cart)) {
                cart = [];
            }
    
            // Find the item in the cart by itemId
            let item = cart.find(i => i.items.Id === itemId.Id);
    
            // If item exists, increase its quantity
            if (item) {
                setItemCount(item.quantity + 1);
                item.quantity += 1;
            } else {
                // If item does not exist, create it with quantity 1
                item = { items: itemId, quantity: 1 };
                cart.push(item);
            }

            console.log("add Item  quantity",item.quantity)
    
            // Log the updated item
            // console.log("Updated add Item count :", item);
    
            // Save updated cart
            saveCart(cart).then(() => {
                // Update UI
                retrieveCartStorage().then((updatedCart) => {
                    setCartItem(updatedCart.length);
                    console.log("Updated add cart count badge UI:", updatedCart.length);
                });
            });
        });
    };
    
    

    const removeItemCount = (itemId) => {
        console.log("Item ID: ", itemId);
    
        retrieveCartStorage().then((cart) => {
            if (!Array.isArray(cart)) {
                cart = [];
            }
    
            // Find the item in the cart by itemId
            let item = cart.find(i => i.items.Id === itemId.Id);
    
            // If item exists, increase its quantity
            if (item) {
                setItemCount(item.quantity - 1)
                item.quantity -= 1;
            } else {
                // If item does not exist, create it with quantity 1
                item = { items: itemId, quantity: 1 };
                cart.push(item);
            }
    
            // Log the updated item
            console.log("Remove Item count:", item);
    
            // Save updated cart
            saveCart(cart).then(() => {
                // Update UI
                retrieveCartStorage().then((updatedCart) => {
                    setCartItem(updatedCart.length);
                    console.log("Updated remove cart count badge UI:", updatedCart.length);
                });
            });
        });
    };
    
    



    const renderItem = ({item}) => {
        const ImageUrl = item.ImagePath
        // console.log(showAdd);
        return (
            <View style={styles.ListItem}>
                <TouchableOpacity onPress={() => (passItem(item))}>
                    <View style={styles.Listcontent}>
                        <Image style={{width:"100%", height:200}} source={{uri:ImageUrl}}/>
                    </View>
                </TouchableOpacity>
                
                
                    <View style={{alignItems:'flex-end', marginRight:10}}>
                    {item.Id != selectedItem.Id ? 
                        <TouchableOpacity onPress={ () => ( 
                        setSelectedItem(item), addCart(item, itemCount) )}>
                            <MaterialIcons name="add-circle" size={40} color="#B8860B" />
                        </TouchableOpacity> : 
                        <View style={{flexDirection:'row'}}>
                           <View style={{borderWidth:1, borderTopLeftRadius:10 , borderBottomLeftRadius:10, borderTopColor:'#B8860B',borderLeftColor:'#B8860B',borderBottomColor:'#B8860B',borderRightColor:'grey'}}>
                            <TouchableOpacity onPress={() => 
                                removeItemCount(item)} disabled={itemCount==1}>
                                <Text style={{marginLeft:15,marginRight:15,marginTop:10,marginBottom:10}}>
                                    -
                                </Text>
                            </TouchableOpacity>
                           </View>
                           <View style={{marginLeft:1,marginRight:1,borderWidth:1,justifyContent:'center',borderLeftColor:'grey',borderRightColor:'grey',borderTopColor:'#B8860B',borderBottomColor:'#B8860B'}}>
                            <Text style={{marginLeft:30,marginRight:30}}>
                                
                                {itemCount}
                            </Text>
                           </View>
                           <View style={{borderTopRightRadius:10,borderBottomRightRadius:10,borderWidth:1,borderTopColor:'#B8860B',borderBottomColor:'#B8860B',borderRightColor:'#B8860B',borderLeftColor:'grey'}}>
                                <TouchableOpacity onPress={() => addItemCount(item)}>
                                    <Text style={{marginLeft:15,marginRight:15,marginTop:10,marginBottom:10}}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                           </View>

                        </View> }
                    </View> 
                    
               
                <View style={styles.Listcontent}>
                    <Text style={{color: "#B8860B" , fontSize: 18,fontWeight:'bold' }}>
                        {item.SmName}
                    </Text>
                </View>
                <View style={styles.Listcontent}>
                    <Text style={{fontWeight:'400'}}>
                        {item.SmCode}
                    </Text>
                </View>
                <View style={styles.Listcontent}>
                    <Text style={{color: 'red' , fontSize:16, marginBottom:20, fontWeight:'300'}}>
                        Price : {productList.currencySymbol} {parseFloat(item.Price).toFixed(2)}
                    </Text>
                </View>
            </View>
        ) 
    }
    // console.log("check selected Item : ",selectedItem.Price);

    return (
        <View style={{flex:1}}>
            <SafeAreaView style={styles.header}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:8, alignItems:'center'}}>
                        <Text style={styles.headerText}>
                            Products
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => navigation.navigate("My Cart")}>
                            <View style={{flexDirection: 'row',justifyContent:'flex-end',marginRight:10}}>
                                <Ionicons name="cart-outline" size={45} color='black' style={{position:'absolute'}} />
                                <Badge size={25}>{cartItem}</Badge>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.ListContainer}>
                <View style={{flexDirection:'row', borderBottomWidth:0.3,borderColor:'grey', margin:10}}>
                    <TouchableOpacity onPress={()=> setHeader("Health")}>
                        <View style={[styles.ListHeader,{ backgroundColor: header == "Health" ? "#B8860B": 'white'}]}> 
                            <Text style={[styles.ListText, {color: header == "Health" ? "white": "black"}]}>
                                Health
                            </Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => setHeader("Test")}>
                        <View style={[styles.ListHeader, {backgroundColor: header == "Test" ? "#B8860B": 'white'}]}>
                            <Text style={[styles.ListText,  {color: header == "Test" ? "white": "black"}]}>
                                Test
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeCart() }>
                        <View style={styles.ListHeader}>
                            <Text style={styles.ListText}>
                                Remove All Cart
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height: '84%'}}>
                    <FlatList data={productList.nodes} 
                    renderItem={renderItem}
                    keyExtractor={item => item.Id}
                    numColumns={2}
                    contentContainerStyle={{}}/>
                </View>
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
    },
    header:{
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        // marginVertical: 8,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 8,
        // borderColor: '#ddd',
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
        borderBottomWidth: 0.3,
        borderColor: 'grey',
    },
    headerText:{
        fontSize: 32,
        fontWeight:'500',
        color: '#B8860B',
        marginBottom:20,
        // justifyContent:'center',
        // alignItems:'center'

    },
    ListContainer:{
       marginTop: 20,
    //    borderWidth: 1,
       backgroundColor:'white',
       
       
       

    },
    ListItem:{
        borderWidth:0.2,
        borderColor:'grey',
        backgroundColor: 'white',
        width: "45%",
        marginLeft:10,
        marginRight:10,
        marginTop:20,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: { width: 5, height: 5 },
        
        
        // maxWidth: '40%',
        

    },
    ListText:{
        fontSize: 20,
        marginBottom:15,
        marginTop:15,
        marginLeft: 30,
        marginRight: 30
        
    },
    Listcontent:{
        margin: 5
    }
    
})

export default ProductListing;