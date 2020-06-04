import React,{Component} from 'react';
import SwipableFlatList from '../components/SwipableFlatlist';
import {View, Text, StyleSheet} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default class NotificationScreen extends Component{
   
    render(){
        return(
            <View style = {styles.view}>
                <Text styles = {styles.text}>Notifications</Text>
                <SwipableFlatList/>
                <Icon
                name = "Bell"
                type = 'font-awesome'
                color = 'blue'
                onPress = {()=>
                props.navigation.navigate('notification')
                }
                />
                <Badge
                value = {this.state.value}
                containerStyle = {{position : 'absolute',top : -4,right : -4}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#003B73'
    },
    text : {
        color : '#BFD7ED',
        backgroundColor : '#60A3D9',
        fontSize : RFValue(50),
        fontWeight : '300',
        textAlign : 'center',
        padding : 4
    }
})