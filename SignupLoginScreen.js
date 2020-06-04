import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class SignUpLogInScreen extends Component{
    constructor(){
        super();
        this.state = ({
            password : '',
            emailId : '',
            username : '',
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            confirmPassword : '',
            isModalVisible:'false'
        })
    }
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("Oops! Your password doesn't match...Check your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              email_id:this.state.emailId,
              password:this.state.password,
              username:this.state.username, 
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
     
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={10}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={10}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
    render(){
        return(
            <View style = {styles.container}>
               
                <Text style = {styles.mainHeader}>Barter</Text>
                 <Image
                source = {
                    require("../assets/logo.png")
                }
                style = {{
                    width : 280,
                    height : 280,
                    alignSelf : 'center'
                }}
                />
                <Text style = {styles.header}>Sign up or Log in</Text>
                <Text style = {styles.text}>Username</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Your username..."
                onChangeText={(text)=>{
                    this.setState({
                      email: text
                    })
                }}
                />
                <Text style = {styles.text}>Password</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Type your password here..."
                onChangeText={(text)=>{
                    this.setState({
                      password: text
                    })
                }}
                />
                <Text style = {styles.text}>Email address</Text>
                <TextInput
                style = {styles.textInput}
                placeholder = "Type your email here..."
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                    this.setState({
                      email: text
                    })
                }}
                />
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.userLogin(this.state.emailId, this.state.password)
                  }}
                ><Text style = {styles.buttonText}>LOGIN</Text></TouchableOpacity>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>this.state({isModalVisible : true})}
                ><Text style = {styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        )
    }}

    const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : '#f2ae1c',
    },
    header : {
        fontSize : RFValue(30),
        fontWeight : 'bold',
        color : '#333652',
        marginTop:-50,
        paddingRight : 30,
        justifyContent : 'center',
        textAlign : 'center',
    },
    textInput : {
        borderWidth : 3,
        borderColor : '#4c7031',
        width:RFValue(275),
        height:RFValue(35),
        alignSelf:'auto',
        borderColor:'#90ADC6',
        borderRadius:10,
        padding : 6,
        margin : 10,
        
    },
   text : {
        fontSize : RFValue(20),
        fontWeight : 'bold',
        color : '#282120',
   },
   button : {
    backgroundColor : '#f7f2f2',
    margin : 5,
    borderRadius : 25,
    width:RFValue(300),
   height:RFValue(50),
   justifyContent:'center',
   alignItems:'center',
   shadowOffset: {
    width: 0,
    height: 8,
    marginBottom : 28
 },
 shadowOpacity: 0.30,
 shadowRadius: 10.32,
 elevation: 16,
 padding: 10
   },
   buttonText : {
    color:'#f2ae1c',
    fontWeight:'200',
    fontSize:RFValue(20),
    padding : 3
   },
   modalButton : {
     justifyContent : 'center',
     padding : 5,
     margin : 8,
     borderRadius : 25,
     width:"75%",
     height:RFValue(35),
     alignSelf:'center',
     backgroundColor : '#74B7AC',
     shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10

   },
   modalContainer :{
    flex:1,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#282120",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
   },
   formTextInput :{
       borderWidth : 5,
        borderColor : '#4c7031',
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'rgb(76,112,49)',
        borderRadius:10,
        padding : 6,
        margin : 10, 
   },
   modalTitle : {
    justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#AA1945',
   margin:50
   },
  registerButton : {
    width:RFValue(200),
   height:RFValue(40),
   alignItems:'center',
   justifyContent:'center',
   borderWidth:3,
   borderRadius:15,
   marginTop:34,
   backgroundColor : '#B67C9A',
  },
  registerButtonText : {
    fontSize : RFValue(15),
    fontWeight : 'bold',
    color : '#E5E6E9'
  },
  cancelButton : {
    width:RFValue(200),
   height:RFValue(30),
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
   backgroundColor : '#CFD1D1'
  },
  keyboardAvoidingView : {
    flex:1,
   justifyContent:'center',
   alignItems:'center'
  },
  mainHeader : {
    textAlign : 'center',
    fontSize : RFValue(60),
    fontWeight:'200',
   marginBottom:-45,
   color  : '#333652',
   fontWeight : 'bold',
   fontFamily : 'serif'
  }
})
