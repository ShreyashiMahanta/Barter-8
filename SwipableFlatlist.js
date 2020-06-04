import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Animated,
    Dimensions,
    StyleSheet
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipableFlatList extends Component{
    constructor(props){
        super(props);
        this.state = {
        allNotifications : this.props.allNotifications,
    }
    }
    updateMarkedAsRead = (notification)=>{
        db.collection('all_notification').doc(notification.doc_ID).update({
            "notification_status" : "read",
        })
        updateMarkedAsRead = (notification)=>{
            db.collection('all_notification').doc(notification.doc_ID).update({
                "notification_status" : "read",
            })
        }
      }
      onSwipeValueChange = swipeData=>{
        var allNotifications = this.state.allNotifications
        const {key,value} = swipeData
        if(value < -Dimensions.get('window').width){
            const newData = [...allNotifications]
            const prevIndex = allNotifications.findIndex(item =>item.key === key)
            this.updateMarkedAsRead(allNotifications[pressIndex])
            newData.splice(prevIndex,1)
            this.setState({
                allNotifications : newData
            })
        }
    }
    renderItem = data =>{
        <Animated.View>
        <ListItem
        leftElement = {
            <Icon
            name = "Item"
            type = 'font-awesome'
            color = '#7EC8E3'
            />
        }
        title = {data.item.item_name}
        titleStyle = {{color : 'black',fontWeight : 'bold'}}
        subtitle = {data.item.message}
        bottomDivider
        />
    </Animated.View>
   
renderHiddenItem
}
}

