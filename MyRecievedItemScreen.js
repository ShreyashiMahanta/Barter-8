import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class MyReceivedItemScreen extends Component{
    constructor(props){
        super(props);
        this.state = ({
            userID : firebase.auth().currentUser.email,
            receiverID : this.props.navigation.getParam('details')["user_ID"],
            requestID : this.props.navigation.getParam('details')["request_ID"],
            receiverName : '',
            receiverContact : '',
            receiverAddress : '',
        })
        }
    displayAllTheReceivedItems = ()=>{
        db.collection('users').where('email','==',this.state.receiverID).get()
        .then(snapshot =>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverName : doc.data().first_name,
                    receiverContact : doc.data().contact,
                    receiverAddress : doc.data().address,
                })
            })
        })
}
    componentDidMount(){
        this.displayAllTheReceivedItems();
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>
                    My Received Items 
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignContent : 'center',
        backgroundColor : '#AB202A'
    },
    text : {
        fontFamily : 'sans',
        fontWeight : '300',
        textAlign : 'center',
        color : '#15141A',
        fontSize : RFValue(40)
    }
})