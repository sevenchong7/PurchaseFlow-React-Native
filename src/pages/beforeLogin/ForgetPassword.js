import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {users} from '../afterLogin/Users'
import { useDispatch } from "react-redux";
import { resetPw } from "../../store/action/AuthAction";


const ForgetPassword = ({navigation}) => {
    const [rUsername,setrUsername] = useState('');
    const [rPw,setrPw] = useState('');
    const [cPw,setcPw] = useState('');
    const dispatch = useDispatch();

    let resetUserPw = {
        username: rUsername,
        password: rPw,
    }

    const checkUser = () => {
        if(rUsername != ''){
            for (i = 0; i < users.length; i++ ){
                if(users.find(user => user.username == rUsername)){
                    if(rPw != '' && cPw != ''){
                        if(rPw == cPw){
                            dispatch(resetPw(resetUserPw));
                            navigation.navigate("Login")
                            
                        }else{
                            Alert.alert("The Password and Comfirm Password did not match !")
                            break;
                        }
                    }else{
                        Alert.alert("The Password & Comfirm Password connot be empty !")
                        break;
                    }

                }else{
                    Alert.alert("The Username does not exists ");
                    break;
                }
            }
        }else{
            Alert.alert("Please Enter the Username !")
        }
    }

    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={styles.userInput}>
                <TextInput style={styles.text} placeholder="Username" value={rUsername} onChangeText={setrUsername}/>
            </View>
            <View style={styles.userInput}>
                <TextInput style={styles.text} placeholder="Password" value={rPw} onChangeText={setrPw}/>
            </View>
            <View style={styles.userInput}>
                <TextInput style={styles.text} placeholder="Comfirm Password" value={cPw} onChangeText={setcPw}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => checkUser()}>
                <Text style={{fontSize:16,margin:10,color:'white'}}>
                    Reset Password
                </Text>
            </TouchableOpacity>
        </View>
    )

   

}

const styles = StyleSheet.create({
    userInput:{
        margin:10,
        flexDirection: "row",
        padding: 10, 
        width:200,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        color: "000",
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:20
    },
    button:{
        margin:10,
        borderRadius:10,
        borderWidth:1,
        width: 150,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'blue'
    }
})

export default ForgetPassword;