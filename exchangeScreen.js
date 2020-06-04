import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class ExchangeScreen extends Component{
    constructor(){
        super();  
        this.state = ({
            itemName : "",
            itemDescription : "",
            userId : ""
        })
    }
 /*   getValue = (itemName) =>{
        this.setState({ itemName:itemName });
        if (itemName.length > 2) {
            itemName,
            "f8648c6bb2c9f86c9e4525dfb216e927"
          this.setState({
            dataSource: books.data,
            showFlatlist: true,
          });
        }
        
    }*/
    addItem = (itemName,itemDescription)=>{
        db.collection('item').add({
           "item_name" : itemName,
           "item_description" : itemDescription,
           "user_Id" : userId
        })
        this.setState({
            itemName :'',
            itemDescription : ''
        })
    
        return Alert.alert("Item added!!")
      }
    
    return(){
        render(
            <View style = {styles.view}>
                <Text style = {styles.mainHeader}>EXCHANGE</Text>
                <Image
                source = {
                    require("../assets/exchangeIcon.png")
                }
                style = {{
                    width : 280,
                    height : 280,
                    alignSelf : 'center'
                }}
                />
                <Text style = {styles.header}>Exchange your items here.</Text>
                <TextInput
                placeholder = "Your item name"
                style = {styles.textInput}
                onChangeText={(text)=>{
                    this.setState({
                      text: text
                    })
                }}
                />
                <TextInput
                placeholder = "Describe your item"
                style = {[
                    styles.textInput
                ],{
                    height : 80
                }}
                onChangeText={(text)=>{
                    this.setState({
                      text: text
                    })
                }}
                />
                <TouchableOpacity style = {styles.button}>
                    <Text 
                    style = {styles.buttonText}
                    onPress = {()=>{
                        this.addItem(this.state.itemName,this.state.itemDescription)
                    }}
                    >Add item</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : '#1f5c70'
    },
    mainHeader : {
    textAlign : 'center',
    fontSize : RFValue(60),
    fontWeight:'200',
   color  : '#E5DDC8',
   fontWeight : 'bold',
   fontFamily : 'serif' 
    },
    header : {
    textAlign : 'center',
    fontSize : RFValue(30),
    fontWeight:'bold',
   color  : '#DB1F48',
   fontFamily : 'serif' 
    },
    textInput : {
        borderWidth : 3,
        borderColor : '#4c7031',
        width:RFValue(260),
        height:RFValue(35),
        alignSelf:'center',
        borderColor:'#fba01d',
        borderRadius:10,
        padding : 6,
        margin : 10,  
    },
    button : {
    justifyContent : 'center',
     padding : 5,
     margin : 8,
     borderRadius : 25,
     width:"75%",
     height:RFValue(35),
     alignSelf:'center',
     backgroundColor : '#fba01d',
     shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10

    },
    buttonText : {
     fontSize : 15,
    fontWeight : 'bold',
    color : '#1f5c70'
    }
})