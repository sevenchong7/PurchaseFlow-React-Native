import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductList } from "../../store/action/ProductAction";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Badge, Snackbar } from "react-native-paper";
import { addToCart, removeAllItems, retrieveCartStorage, saveCart } from "./Cart";
import CartList from "./CartList";
import HTMLView from "react-native-htmlview";
import { renderNode } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const ProductDetail = ({route}) => {
    const selectedItemDetail = route.params;
    const ImageUrl = selectedItemDetail.ImagePath;
    console.log("Product Detail ID: " ,selectedItemDetail.Id)
    const [cartItem,setCartItem] = useState(0);
    const [itemCount, setItemCount] = useState(1);
    const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

    // const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    //     if (node.name === 'p') {
    //         // Extract the paragraph content
    //         const paragraphContent = defaultRenderer(node.children, parent);
      
    //         // Return a view that includes a title and the paragraph content
    //         return (
    //           <View key={index} style={styles.paragraphContainer}>
    //             <Text style={styles.title}>Title for Paragraph {index + 1}</Text>
    //             {paragraphContent}
    //           </View>
    //         );
    //     }
    // }

    const navigation = useNavigation();

    const handleNavigateBack = () => {
        // Perform navigation back to the product listing page
        navigation.goBack({reloadListing: true });
        navigation.navigate('Products', { reloadListing: true });
    };


    useEffect(() => {
        retrieveCartStorage().then((updatedCart) => {
            // Check if updatedCart is null
            if (updatedCart === null) {
                // If null, set cart item count to 0
                setCartItem(0);
                console.log("Add cart badge UI: 0");
            } else if (Array.isArray(updatedCart)) {
                // If it's an array, set cart item count to the length of the array
                setCartItem(updatedCart.length);
                console.log("Add cart badge UI:", updatedCart.length);
            } else {
                // Handle unexpected response
                console.error("Unexpected cart data:", updatedCart);
                setCartItem(0);  // Set to 0 if data is invalid
            }
        }).catch(error => {
            // Handle potential errors from retrieveCartStorage
            console.error("Error retrieving cart storage:", error);
            setCartItem(0);  // Set to 0 if there's an error
        });
    }, []);


    const addCart = (itemId) => {
        console.log("Item Id :" , itemId.Id)
        
        retrieveCartStorage().then((cart) => {
            if (!Array.isArray(cart)) {
                cart = [];
            }
    
            // Find the item in the cart by itemId
            let item = cart.find(i => i.items.Id === itemId.Id);
    
            // If item exists, increase its quantity
            if (item) {
                item.quantity = itemCount;
            } else {
                // If item does not exist, create it with quantity 1
                item = { items: itemId, quantity: itemCount };
                cart.push(item);
            }
    
            // Log the updated item
            console.log("Add Item:", item);
            console.log("Add cart:", cart);
            console.log("item count", itemCount)
    
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

    const addItemCount = () => {
        
        setItemCount(itemCount + 1);
    };
    
    

    const removeItemCount = () => {
        
        setItemCount(itemCount - 1);
    };


    return (
        <View>
            <SafeAreaView style={styles.header}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <TouchableOpacity onPress={() => handleNavigateBack()}>
                            <Ionicons name="chevron-back-outline" size={40} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:8, alignItems:'center'}}>
                        <Text style={styles.headerText}>
                            Products Details
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
            <ScrollView style={{height: '78%'}}>
                <View>
                    <View style={{backgroundColor:'white'}}>
                        <View style={{alignItems:'center',marginBottom:20}}>
                            <Image style={{width:"80%", height:300, marginTop:30,marginBottom:0}} source={{uri: ImageUrl}}/>
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={[styles.itemText,{color:'#B8860B',fontWeight:'bold'}]}>
                                {selectedItemDetail.SmName}
                            </Text>
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemText}>
                                {selectedItemDetail.SmCode}
                            </Text>
                        </View>
                        <View style={[styles.itemTextContainer, {marginBottom: 30}]}>
                            <Text style={styles.itemText}>
                                {selectedItemDetail.Price}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={{backgroundColor:'white',marginTop:10}}>
                        <View style={[styles.description,{borderBottomWidth: 1, borderColor: 'grey'}]}>
                            <Text style={{fontSize:28,fontWeight:'bold',marginBottom:10}}>
                                Description
                            </Text>
                        </View>
                        <View style={{marginLeft:20}}>
                            <HTMLView value={selectedItemDetail.Description} 
                            stylesheet={styles}
                            />
                        </View>
                    </View>
                    <View style={{backgroundColor:'white',marginTop:10}}>
                            <View style={[styles.description,{borderBottomWidth: 1, borderColor: 'grey'}]}>
                                <Text style={{fontSize:28,fontWeight:'bold',marginBottom:10}}>
                                    How To Use
                                </Text>
                            </View>
                            <View style={{marginLeft:20,marginRight:20,marginBottom:50}}>
                                <Text style={{fontSize:18}}>
                                    Take one sachet daily with approximately 200ml of room temperature water.{"\n"}
                                    To optimize nutrient absorption, drink it on an empty stomach.
                                </Text>
                            </View>
                        </View>
                </View>
            </ScrollView>
            <SafeAreaView style={styles.bottomTab}>
                <View style={{margin:10}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flexDirection:'row',flex:4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'grey'}}>
                            <TouchableOpacity onPress={() => removeItemCount()} disabled={itemCount == 1} style={{borderRadius:20,borderWidth:1}}>
                                <Text style={{fontSize:20,marginHorizontal:15,marginVertical:5}}>
                                    -
                                </Text>
                            </TouchableOpacity>
                            <View style={{paddingHorizontal:15}}>
                                <Text style={{fontSize:20,marginVertical:3}}>
                                    {itemCount}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => addItemCount()} style={{borderRadius:20,borderWidth:1}}>
                                <Text style={{fontSize:20,marginHorizontal:15,marginVertical:5}}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:6 ,justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {addCart(selectedItemDetail),onToggleSnackBar()}} style={{borderWidth:1, backgroundColor:'black',borderRadius:50}}>
                            <Text style={{color:'white',fontSize:18,marginVertical:10,marginHorizontal:30}}>
                                Update Cart Quantity
                            </Text>
                        </TouchableOpacity>
                        </View>
                        <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
                            Added To Cart
                        </Snackbar>
                    </View>
                </View>
            </SafeAreaView>
           
            
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
        fontSize: 28,
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
    },
    description:{
        margin:20,
        
        
        // borderWidth:1
    },
    p:{
        fontSize:18,
    },
    itemTextContainer: {
        margin: 5,
        marginLeft: 20
    },
    itemText:{
        fontSize: 20,

    },
    bottomTab: {
        backgroundColor:'white',
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -10 },
        borderTopWidth: 0.3,
        borderColor: 'grey',
        
        

    }
    
})


export default ProductDetail;