import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpLogInScreen from './screens/SignupLoginScreen';
import ExchangeScreen from './screens/exchangeScreen';
import HomeScreen from './screens/homeScreen';
import {createAppContainer,switchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppTabNavigator from './components/AppTabNavigator';
import MyReceivedItemScreen from './screens/MyRecievedItemScreen';
import RequestStatusScreen from './screens/RequestStatusScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpLogInScreen/>
      <AppTabNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabNavigator = createBottomTabNavigator({
  HomeScreen: HomeScreen,
  ExchangeScreen: ExchangeScreen,
  MyReceivedItemScreen : MyReceivedItemScreen,
  RequestStatusScreen : RequestStatusScreen,
})
const AppContainer = createAppContainer({switchNavigator})