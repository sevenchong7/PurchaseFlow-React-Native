import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, View } from "react-native"
import { removeAllItems, removeProduct, retrieveCartStorage, saveCart } from "./Cart";
import { useEffect, useState } from "react";
import { SalesItemWithPricing } from "./SalesItemWithPricing";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SwipeListView } from "react-native-swipe-list-view";


const CartList = () => {
    const [data, setData] = useState([]); 


    const navigation = useNavigation();

    const handleNavigateBack = () => {
        // Perform navigation back to the product listing page
        navigation.goBack();
    };

    
    useEffect( ()  =>  {
        retrieveCartStorage().then((res)=> {
            if(res != null ){
                setData(res);
                
                // setCartItem(res)
                
                console.log("cart Item: ",res)
            }else{
                console.log("no cart Item : ",res)
            }
            
        })
    },[])

    // useEffect(() => {
    //     retrieveCartStorage
    // })


    const CartItem =  ({item}) => {
        const [itemCount, setItemCount] = useState(item.quantity);
        const [totalPrice, setTotalPrice] = useState(0);
        const ImageUrl = item.items.ImagePath;
        // console.log("data in render: " , item.items.ImagePath)

        useEffect(() => {
            setItemCount(item.quantity);
            setTotalPrice(item.quantity * item.items.Price)
        },[])


        const addItemCount = (itemId) => {
            console.log("Item ID: ", itemId.Id);
    
            retrieveCartStorage().then((cart) => {
                if (!Array.isArray(cart)) {
                    cart = [];
                }
    
            // Find the item in the cart by itemId
            let item = cart.find(i => i.items.Id === itemId.items.Id);
    
            // If item exists, increase its quantity
            if (item) {
                setTotalPrice((item.quantity + 1) * item.items.Price);
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
                    // setCartItem(updatedCart.length);
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
            let item = cart.find(i => i.items.Id === itemId.items.Id);
    
            // If item exists, increase its quantity
            if (item) {
                setItemCount(item.quantity - 1)
                setTotalPrice((item.quantity-1) * item.items.Price);
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
                    // setCartItem(updatedCart.length);
                    console.log("Updated remove cart count badge UI:", updatedCart.length);
                });
            });
        });
    };

        return (
            <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,marginTop:10,backgroundColor:'white'}}>
                <View style={{flex:2,margin:10}}> 
                    <Image style={{height:170}} source={{uri:ImageUrl}} />
                </View>
                <View style={{flex:3,margin:10}}>
                    <View>
                        <Text style={{color:'#B8860B', fontSize:21,fontWeight:'bold'}}>{item.items.SmName}</Text>
                        <Text style={{fontWeight:600, marginTop:10}}>{item.items.SmCode}</Text>
                        <Text style={{marginTop:10,color:'red'}}>Price: {SalesItemWithPricing.currencySymbol} {parseFloat(item.items.Price).toFixed(2)}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => removeItemCount(item)} disabled={itemCount == 1} style={[styles.box,{borderTopLeftRadius:10,borderBottomLeftRadius:10}]}>
                                    <Text style={styles.text}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.box}>
                                    <Text style={[styles.text,{marginHorizontal:20}]}>{itemCount}</Text>
                                </View>
                                <TouchableOpacity onPress={() => addItemCount(item)} style={[styles.box,{borderTopRightRadius:10,borderBottomRightRadius:10}]}>
                                    <Text style={styles.text}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, marginLeft: 20,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'red'}}>
                                    {SalesItemWithPricing.currencySymbol} {parseFloat(totalPrice).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const renderHiddenItem = (item) => ( 
		<View style={styles.hiddenContainer}> 
			{/* <TouchableOpacity 
				style={[styles.hiddenButton, styles.closeButton]} 
				onPress={() => closeRow(rowMap, rowData.item.key)} 
			> 
				<Text style={styles.buttonText}>Close</Text> 
			</TouchableOpacity>  */}
			<TouchableOpacity 
				style={[styles.hiddenButton, styles.deleteButton]} 
				onPress={() => deleteItem(item)} 
			> 
			<Text style={styles.buttonText}>Delete</Text> 
			</TouchableOpacity> 
		</View> 
	); 

    	// Function to close a swiped row 
	const closeRow = (rowMap, rowKey) => { 
		if (rowMap[rowKey]) { 
			rowMap[rowKey].closeRow(); 
		} 
	}; 

	// Function to delete an item from the list 
	const deleteItem = ({item}) => { 

        removeProduct(item).then(() => {
            retrieveCartStorage().then((res)=> {
                if(res != null ){
                    setData(res);
                    
                    // setCartItem(res)
                    
                    console.log("After Delete cart Item: ",res)
                }else{
                    console.log("After Delete no cart Item : ",res)
                }
            })          
        })
        // closeRow(rowMap, rowKey); 
		// const newData = [...this.state.itemList]; 
		// const prevIndex = this.state.itemList 
		// 	.findIndex(item => item.key === rowKey); 
		// newData.splice(prevIndex, 1); 
		// this.setState({ Data: newData }); 
	}; 


    return(
        <View>
            <SafeAreaView style={styles.header}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,alignItems:'center', marginBottom:-25}}>
                        <TouchableOpacity onPress={() => handleNavigateBack()}>
                            <Ionicons name="chevron-back-outline" size={40} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:8, alignItems:'center'}}>
                        <Text style={styles.headerText}>
                            My Cart
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        
                    </View>
                </View>
            </SafeAreaView>
            <View>

                <SwipeListView data={data} 
                renderItem={({item}) => <CartItem item = {item}/>} 
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75} 
                rightOpenValue={-210} 
                previewRowKey={'0'} 
                previewOpenValue={-40} 
                previewOpenDelay={3000} />
                {/* onRowDidOpen={onRowOpen}  */}


                {/* <FlatList data={data} 
                renderItem={({item}) => <CartItem item = {item}/>} 
                keyExtractor={item => item.Id}/> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contatiner:{
        flex:1,
    },
    btn:{
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        width:200,
        borderRadius:10

    },
    text:{
        margin:10,
    },
    box:{
        borderWidth:1,
        borderColor:'grey'
    },
    header:{
        backgroundColor: 'white',
        // height:10,
        width: '100%',
        // alignItems:'flex-end',
        // marginVertical: -8,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 8,
        borderColor: '#ddd',
        borderBottomWidth: 0.5,
        shadowOpacity: 0.3,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
        borderColor: 'grey',
        zIndex:999,
        elevation: 3, 
    },
    headerText:{
        marginBottom:-20,
        fontSize: 28,
        // margin:10,
        fontWeight:'500',
        color: '#B8860B',
        justifyContent:'center',
        alignItems:'center'
        // justifyContent:'center',
        // alignItems:'center'

    },
    itemContainer: { 
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: '#FFF', // White 
		borderBottomColor: '#E0E0E0', // Lighter Gray 
		borderBottomWidth: 1, 
		height: 80, 
		borderRadius: 8, 
		shadowColor: '#000', 
		shadowOffset: { width: 0, height: 2 }, 
		shadowOpacity: 0.2, 
		shadowRadius: 3, 
		elevation: 3, 
		marginBottom: 10, 
	}, 
	itemText: { 
		color: '#333', // Dark Gray 
		fontSize: 16, 
		fontWeight: 'bold', 
	}, 
	hiddenContainer: { 
		flexDirection: 'row', 
		justifyContent: 'flex-end', 
		alignItems: 'center', 
		backgroundColor: '#FFF', 
        height:'90%',
        margin:10,
        marginTop:20
	}, 
	hiddenButton: { 
		justifyContent: 'center', 
		alignItems: 'center',
        height:'100%',
        width:200
	}, 
	closeButton: { 
		backgroundColor: 'green', // Blue 
		borderRadius: 20, 
	}, 
	deleteButton: { 
		backgroundColor: '#E74C3C', // Red 
		borderRadius: 20, 
	}, 
	buttonText: { 
		color: '#FFF', 
		fontSize: 16, 
		fontWeight: 'bold', 
	},  
})

export default CartList;
