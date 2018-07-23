
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import login from './views/login';
import home from './views/home';
import setting from './views/setting';
import productionBase from './views/productionBase';

export default class App extends Component {
    render() {
        return (
            <HomeStack/>
        );
    }
}

const HomeStack = createStackNavigator({
    login: {
      screen: login,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      }
    },
    home: {
      screen: home,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      }
    },
    setting: {
      screen: setting,
      gesturesEnabled: true
    }
});
