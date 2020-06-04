import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import firebase from 'firebase';
import  {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomSideBarMenu extends Component{
    state = {
        userID : firebase.auth().currentUser.email,
        image : '#',
        name : "",
        docID : "" 
    }
    selectThePicture = ()=>{
        const{cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
            mediaType : ImagePicker.mediaTypeOptions.al,
            allowsEditing : true,
            aspect : [4,3],
            quality : 1,
        })
    
        if(!cancelled){
            this.uploadImage(
                uri,this.state.userID
            )
        }
    }
     uploadImage = async (uri,imageName)=>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/"+ imageName)
        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName)
        })
     }
     fetchImage = (imageName)=>{
        var storageRef = firebase.storage().ref().child("user_profiles/" + imageName)
        storageRef.getDownloadURL()
        .then((url)=>{
            this.setState({
                image : url
            })
        })
     .catch((error)=>{
        this.setState({
            image : "#"
        })
    })
}
    getUserProfile = () =>{
        db.collection(users).where("email_Id","==",this.state.userID).get()
        .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.setState({
                    name : doc.data().first_name + " "+doc.data().last_name,
                    docID : doc.ID,
                    image : doc.data().image
                })
            })
        })
    }
    componentDidMount(){
        this.fetchImage(this.state.userID)
        this.getUserProfile()
    }

    render(){
        return(
            <View style = {{flex : RFValue(1)}}>
                <View style = {{flex : 0.8,backgroundColor : '#211522'}}>
                    <Avatar
                    rounded
                    source = {{
                        uri : this.state.image
                    }}
                    size = "large"
                    onPress = {()=>{
                        this.selectThePicture()
                        showEditButton
                    }}
                    />
                    <Text style = {styles.text}>{this.state.name}</Text>
                    <DrawerItems
                {...this.props}
                />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    text : {
        fontSize : RFValue(20),
        fontWeight : '250',
        fontFamily : 'sans',
        color : '#613659',
        paddingTop : 10
    }
})