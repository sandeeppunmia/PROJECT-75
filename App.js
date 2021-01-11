import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
import LoginScreen from './screens/LoginScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  ReadStoryScreen:{
    screen:ReadStoryScreen
  },
  WriteStoryScreen:{
    screen:WriteStoryScreen
  }},
  {
    defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName=navigation.state.routeName;
      if(routeName==="ReadStoryScreen"){
        return(
          <Image
            source={require("./assets/read.png")}
            style={{width:40,height:40}}
          />
        )
      }
      else if(routeName==="WriteStoryScreen"){
        return(
          <Image
            source={require("./assets/write.png")}
            style={{width:40,height:40}}
          />
        )
      }
    }
  })
})

const SwitchNavigator = createSwitchNavigator({
  LoginScreen:{
    screen:LoginScreen
  },
  TabNavigator:{
    screen:TabNavigator
  }
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});