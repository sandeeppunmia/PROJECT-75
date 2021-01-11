import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Alert} from 'react-native';
import * as firebase from 'firebase';
import db from '../config'

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }

    Login=async(email,password)=>{
        if(email && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("WriteStoryScreen")
                }
            }catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert("User doesn't exist")
                        console.log("User doesn't exist")
                        break;
                    case 'auth/invalid-email':
                        Alert.alert("Incorrect Email")
                        console.log("Invalid email")
                        break;
                }
            }
        }else{
            Alert.alert("Enter Email and password")
        }
    }

render(){
    return(
        <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
                <View>
                    <Image
                      source={require("../assets/storylogo.jpg")}
                      style={{width:200,height:200}}/>
                      <Text style={{textAlign:'center',fontSize:30}}>Story Hub</Text>
                </View>
                <View>
                    <TextInput
                      style={styles.loginBox}
                      placeholder='abc@example.com'
                      keyboardType='email-address'
                      onChangeText={(text)=>{
                          this.setState({
                              emailId:text
                          })
                      }}/>

                    <TextInput
                      style={styles.loginBox}
                      placeholder='Enter Password'
                      secureTextEntry={true}
                      onChangeText={(text)=>{
                          this.setState({
                              password:text
                          })
                      }}/>
                </View>
                <View>
                    <TouchableOpacity 
                       styles={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5}}
                       onPress={()=>{
                           this.Login(this.state.emailId,this.state.password)
                       }}>
                           <Text style={{textAlign:'center'}}>Login</Text>
                       </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
   }
 }

 const styles=StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    }
})