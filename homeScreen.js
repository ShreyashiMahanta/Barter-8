import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Flatlist
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {CardItem,ListItem} from 'react-native-elements';
import NotificationScreen from './screens/notificationScreen';
import {Input} from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";

export default class HomeScreen extends Component{
    constructor(){
        super();  
        this.state = ({
            itemName : "",
            itemDescription : "",
            userId : "",
            requestedItem : ""
        })
    }
    fetchAllRequest = ()=>{
        this.requestRef = db.collection("item").where("user_ID","==",this.state.userID).get()
        .then((snapshot)=>{
            var requestedItem = []
            snapshot.doc.map((doc)=>{
                var itemName = doc.data()
                itemName["doc_ID"] = doc.ID
                requestedItem.push(itemName)
            })
            this.setState({
                requestedItem : requestedItem
            })
        })
    }
    keyExtractor = (item,index)=>index.toString()
    renderItem = ({item,i})=>(
        <ListItem
        key = {i}
        title = {item.item_name}
        subtitle = {"Requested by : " +item.requested_by + "/nStatus"+item.request_status} 
        leftElement = {
            <Icon
            name = "Items"
            type = "font-awesome"
            color = "red"
            />
            }
            textStyle ={{
                color : '#2F2440',
                fontWeight : 'bold',
            }}
            bottomDivider
            />
    )
    render(){
        return(
            <View style = {{
                flex : 1,
                justifyContent : 'center',
                alignItem : 'center',
                backgroundColor : '#BA0F30'
                }}>
                    <NotificationScreen/>
                <Text style = {{
                    textAlign : 'center',
                    fontSize : 50,
                    fontWeight : '300',
                    color : '#2F2440',
                    justifyContent : 'center',
                    alignItem : 'center'
                }}>Requested Items</Text>
                <Flatlist
                keyExtractor = {this.keyExtractor}
                data = {this.fetchAllRequest}
                renderItem = {this.renderItem}
                />
            </View>
        )
    }

}