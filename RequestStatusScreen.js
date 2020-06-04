import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import ExchangeScreen from './exchangeScreen';
import { RFValue } from "react-native-responsive-fontsize";

export default class RequestStatusScreen extends Component{
    constructor(){
        super();
        this.state = ({
            userName : '',
            userID : firebase.auth().currentUser.email,
            receiverID : this.props.navigation.getParam('details')["user_ID"],
            requestID : this.props.navigation.getParam('details')["request_ID"],
            itemName : this.props.navigation.getParam('details')["item_name"],
        })
        this.requestRef= null
    }
    isExchangeRequestActive = ()=>{
        this.requestRef = db.collection("requested_items")
        .snapshot((snapshot)=>{
            var isExchangeRequestActive = snapshot.docs.map(document => document.data());
            this.setState({
                isExchangeRequestActive : true
            });
        })
    }
    componentDidMount(){
        this.isExchangeRequestActive()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
      notification = ()=>{
          var message = this.state.userName + " has received the item."
          db.collection('all_notification').add({
            "targeted_userID" : this.state.userID,
            "donor_ID" : this.state.userID,
            "request_ID" : this.state.requestID,
            "item_name" : this.state.itemName,
            "date" : firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status" : "Unread",
            "message" : message,
        })
      }
      render(){
          if(this.isExchangeRequestActive === true){
      return(
        <View style = {styles.view}>
            <Image
            source = {
                require("../assets/itemReceived.jpg")
            }
            style = {{
                width : 280,
                height : 280,
                alignSelf : 'center'
            }}
            />
            <TouchableOpacity styles = {styles.button}
             onPress = {()=>{
                this.isExchangeRequestActive();
                this.notification();
                this.props.navigation.navigate('MyReceivedItemScreen')
            }}
            >
                <Text style = {styles.buttonText}>
                I received the item</Text>
            </TouchableOpacity>
        </View>
      )
      }
      else{
          return(
             <ExchangeScreen/> 
          )
      }
    }
}

const styles = StyleSheet.create({
    view : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#C15B78'
    },
    button : {
        backgroundColor : '#EBF5F7',
        margin : 5,
        borderRadius : 25,
        width:RFValue(400),
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
        backgroundColor : '#5BB0BA',
        fontSize : RFValue(15),
        fontFamily : 'sans-serif',
        fontWeight : '280',
    },

})