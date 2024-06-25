import { useEffect, useState } from "react";
import { ImageBackground, Image, SafeAreaView, TextInput, View, StyleSheet, TouchableOpacity, Alert,Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../store/actions/AuthAction";
import { ThemeProvider } from "@rneui/themed";
// import {theme} from '../theme/Theme'
import userdata from '../afterLogin/Users';
import { getUser } from "../../store/action/AuthAction";

const Login = ({navigation}) => {
    

    const [userName, setUsername] = useState(0); //variable input
    const [passWord, setPassword] = useState(0);
    const [OTP , setOTP] = useState(0);
    const [OTP_view ,setOTPView] = useState(0);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    },[]);
    
     const users  = useSelector(state => state.authReducer.users);

    //  console.log(users);

   useEffect(() => { 
    setOTPView( randomStr() ) 
    }, []) //1st time load

   function reGetOPT(){//funtion 
    setOTPView(randomStr());
   };

   let user = {
        username : userName,
        password : passWord
   }

   

    function check_user(){//function

        

        for (i = 0 ; i <= users.length; i++){//loop to get array data
            if ( users.find(user=>user.username===userName) && 
            users.find(user=>user.password===passWord)){//compare the data and input
                if( OTP == OTP_view ){//compare the OTP_generate and input

                    // navigation.navigate('PurSectionList');
                    // navigation.reset({
                    //     index: 0 ,
                    //     routes: [{ name: 'PurSectionList' }]
                    // })
                    // Alert.alert('Login In Successful', 'Successful Login', [ //Alert
                    //     {
                    //       text: 'Cancel',//1st button to Cancel
                    //       onPress: () => console.log('Cancel Pressed'),
                    //       style: 'cancel',
                    //     },
                    //     {text: 'OK', onPress: () => console.log('OK Pressed')},//2nd btn to OK
                    //   ]);
                    
                //    dispatch(login(user));
                   navigation.reset({
                    index: 0,
                    routes: [{name: "AfterLogin"}]
                   })

                

                }else{
                    reGetOPT();// wrong OTP refresh the OTP again 
                    Alert.alert('Wrong OTP', 'Please try to re-enter the OTP', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                      break;
                }
                
                
            }   
            else {
                Alert.alert('Wrong Username or Password', 'Please try to re-enter the Username or Password', [ //wrong pw or username
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                  break;
            };
        };
    };


    return (//UI
            <View style= {styles.container}> 
            <ImageBackground source={require("../../assets/bg_login.jpg")} style={styles.bg_img} >
                
                <SafeAreaView style= {styles.content_container}>
                    <Image style={styles.logo} source={require('../../assets/icon_login_logo.png')}/>
                    <View style={styles.userInput}>
                        <Image style={styles.user_logo} source={require("../../assets/user.png")}/>
                        <TextInput style={styles.textField} placeholder="Username" onChangeText={setUsername} value={userName}/>
                    </View>
                    <View style={styles.userInput}>
                        <Image style={styles.user_logo} source={require("../../assets/lock.png")}/>
                        <TextInput  style={styles.textField} placeholder="Password" onChangeText={setPassword} value={passWord}/>
                    </View>
                    <View style={styles.OTP_input}>
                        <View style={styles.OTPInput}>
                            <Image style={[styles.user_logo,{marginLeft:20}]} source={require("../../assets/security_pin.png")} />
                            <TextInput style={styles.OTP} placeholder="Security Pin" onChangeText={setOTP} value={OTP} autoCapitalize='none'/>
                        </View>
                        <TouchableOpacity style={styles.OTP_view} onPress={()=>reGetOPT()}> 
                                <Text style={styles.OTP_text}>{OTP_view}</Text>
                        </TouchableOpacity>
                        
    
                    </View>
                     {/* btn use touchable */}
                    <TouchableOpacity style={styles.btn_container} onPress={()=>check_user()}> 
                        <Text>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
                        <Text style={{textDecorationLine:'underline',color:'red',fontSize:18}}>Forget Password?</Text>
                    </TouchableOpacity>
                    
                    
                </SafeAreaView>
            </ImageBackground>
        </View>
        
    );

};

function randomStr() { //generate random 4 alphanumeric 
    let ans = '';
    var arr = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    for (let i = 4; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans;
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        
    },
    content_container:{
        marginTop: "30%",
        justifyContent:"center",
        alignItems: "center",
    },
    bg_img:{
        position: 'absolute',
        height: "100%",
        width:"100%"
    },
    logo :{
        justifyContent: "center",
        alignItems:"center",
        maxWidth: "80%",
        height: 100,
        marginBottom:10
        
    },
    textField:{
        flex:1,
        height: 50,
        fontSize:20,
        // color: 'red'

    },
    OTP_input:{
        flexDirection: "row",
        maxWidth:'80%',
        // height:50,
        
        
    },
    OTP:{
        flex:1,
        height: 50,
        fontSize : 18
    },
    OTP_view:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        height:70,
        width:"38%",
        borderRadius:20,
        backgroundColor:'grey',
        

    },
    userInput:{
        margin:10,
        flexDirection: "row",
        padding: 10, 
        maxWidth:"80%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        color: "000",
        
    },
    user_logo:{
        height:30,
        width:30,
        margin:10
    },
    btn_container:{
        margin:20,
        justifyContent:"center",
        alignItems: "center",
        height:50,
        width:"50%",
        fontWeight:'bold',
        textAlign:'center',
        backgroundColor:"rgba(255,255,255,0.5)",
        color:"black",
        borderRadius:10,
        borderWidth:1
    },
    OTPInput:{
        marginTop: 10 ,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: "row",
        width:"60%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        color: "000",
        height:70
        
        
    },
    OTP_text:{
        letterSpacing:5,
        fontWeight:'bold',
        fontSize:20,
        color:'white'
    }
        
});

export default Login;