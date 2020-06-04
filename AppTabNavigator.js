import React,{Component} from 'react';
//import {BottomTabNavigator} from 'react-navigation-tab';
import HomeScreen from '../screens/homeScreen';
import ExhangeScreen from '../screens/exchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen : {screen : HomeScreen,
    navigationOptions : {
        tabBarIcon : <Image
        source = {
            require("../assets/home.png")
        }
        style = {{
            width : 20,
            height : 20,
        }}
        />,
        tabBarLabel : "Home Screen"
    }
    },
    ExhangeScreen : {screen : ExhangeScreen,
        navigationOptions : {
            tabBarIcon : <Image
            source = {
                require("../assets/exchange.png")
            }
            style = {{
                width : 20,
                height : 20,
            }}
            />,
            tabBarLabel : "ExhangeScreen"
        }
        },

})