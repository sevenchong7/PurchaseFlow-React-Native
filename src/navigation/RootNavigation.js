import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/beforeLogin/Login";
import ForgetPassword from "../pages/beforeLogin/ForgetPassword";
import ProductListing from "../pages/afterLogin/ProductListing";
import Favorite from "../pages/afterLogin/Favorite";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CartList from "../pages/afterLogin/CartList";
import ProductDetail from "../pages/afterLogin/ProductDetail";
import test from "../pages/afterLogin/test";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const AfterLogin = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ProductListing} options={{tabBarIcon: ({color,size})=> {return <Ionicons name="cart-outline" size={size} color={color} />},headerShown:false}}/>
            <Tab.Screen name="Favorite" component={Favorite} options={{
                    tabBarIcon: ({color,size}) => {return <MaterialIcons name='favorite' size={size} color={color}/>}
                }}/>
        </Tab.Navigator>
    )
    
}

const StackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Products">
            <Stack.Screen name="Products" component={AfterLogin} options={{headerShown:false}}/>
            <Stack.Screen name="My Cart" component={CartList} options={{headerShown:false}}/>
            <Stack.Screen name="Product Detail" component={ProductDetail} options={{headerShown:false}}/> 
        </Stack.Navigator>
    )
} 

export default RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
                <Stack.Screen name="AfterLogin" component={StackScreen} options={{headerShown:false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}