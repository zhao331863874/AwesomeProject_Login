
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  ToastAndroid,
  Platform
} from 'react-native';
import {
  createBottomTabNavigator
} from 'react-navigation';
import productionBase from './productionBase'
import militaryStrength from './militaryStrength'
import ammunitionDepot from './ammunitionDepot'
import PageUtil from '../component/PageUtil';
const {setdp, setFont} = PageUtil;

/*export default class Home extends Component {
	constructor(props) {
    super(props);
    this.state = {
      ready: true
    };
  }
	static navigationOptions = {
		title: '',
		header: null
  };
  componentDidMount() {
		if(Platform.OS === 'android'){
			BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
		}
		//setTimeout(() => {this.setState({ready: true})}, 200)
  }

  componentWillUnmount() {
  	if(Platform.OS === 'android'){
    	BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    }
  }

  onBackClicked = () => {
  	if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return;
		}
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
	}

	render() {
		const { params } = this.props.navigation.state;
		console.log(this.props.navigation)
		return (
			<SimpleAppNavigator/>
	  )
	}
}*/
const SimpleAppNavigator = createBottomTabNavigator(
	{
    '生产基地': {
    	screen: productionBase,
    	navigationOptions:({navigation}) => ({
        tabBarLabel:'首页',
        tabBarIcon: (
          <Image
          	style={{width: 16, height: 16}}
            source={require('./images/home.jpg')}
          />
        )
      })
    },
    '战力获取': {
    	screen: militaryStrength,
    	navigationOptions:({navigation}) => ({
        tabBarLabel:'战力获取',
        tabBarIcon: (
          <Image
          	style={{width: 16, height: 16}}
            source={require('./images/strengthbar.jpg')}
          />
        )
      })
    },
    '弹药库': {
    	screen: ammunitionDepot,
    	navigationOptions:({navigation}) => ({
        tabBarLabel:'弹药库',
        tabBarIcon: (
          <Image
          	style={{width: 16, height: 16}}
            source={require('./images/base.jpg')}
          />
        )
      })
    }
	},
	{
    initialRouteName: '生产基地',
    swipeEnabled: true,
    animationEnabled: true,
    gesturesEnabled: true,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
    	swipeEnabled: true,
    	animationEnabled: true,
    	gesturesEnabled: true,
			showIcon: true,
			pressOpacity: 0.8,
			activeBackgroundColor: '#0f1417',
			activeTintColor: '#9ff1ed',
			style: {
				height: 45,
				backgroundColor: '#0f1417',
				zIndex: 0,
				position: 'relative'
			},
			labelStyle: {
      	fontSize: 11,
				paddingVertical: 0,
				marginTop: -4,
				color: '#7ac5c1'
			}
		}
	}
);

export default SimpleAppNavigator