
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  BackHandler,
  Linking,
  View
} from 'react-native';
import Common from '../component/Common'
import TouchableButton from '../component/TouchableButton';
import PageUtil from '../component/PageUtil';
//const {setdp, setFont} = PageUtil;
const setdp = px => px
const setFont = px => px
export default class Setting extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#1d2027',
    },
  };

	constructor(props) {
    super(props);
    this.state = {
    	phoneNum: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('home')
      return true;
    })

    global.storage.load({
      key:'userInfo'
    }).then((result) => {
      console.log(result)
    }).catch(e => console.warn(e))
  }

  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
  }

  onBackClicked = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return;
    }
    this.lastBackPressed = Date.now();
    Common.toastShort('再按一次退出应用');
    return true;
  }

  checkPhoneNum(phoneNum){
    let patt = /^(1|[1-9][0-9]*|-[0-9]*)$/
    if(!patt.test(phoneNum)) {
      phoneNum = phoneNum.substr(0, (phoneNum.length - 1))
    }
    return phoneNum
  }

	render() {
		const navigate = this.props.navigation.navigate;
    return (
    	<View style={{backgroundColor: '#1d2027', flex: 1}}>
    		<View style={styles.item}>
          <Text style={styles.labelText}>姓名</Text>
          <Text style={styles.valueText}>玩家一</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.labelText}>手机号</Text>
          <Text style={styles.valueText}>13645644565</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.labelText}>版本号</Text>
          <Text style={styles.valueText}>0.0.1</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.labelText}>联系我们</Text>
          <Text style={styles.valueText} onPress={() => Linking.openURL('tel:010-8888888')}>010-8888888 ></Text>
        </View>

        <View style={{marginLeft: 15, marginRight: 15, marginTop: 200}}>
          <TouchableButton
            textColor='#0684bf'
            fontSize={setFont(13)}
            text='退出登录'
            onPress={() => navigate('login', {a: 1})}
            underlayColor='#242b35'
          />
        </View>
    	</View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    height: setdp(36),
    borderBottomWidth: 1,
    borderColor: '#a6a5a5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: setdp(15),
    marginRight: setdp(15),
    marginTop: setdp(10),
    paddingLeft: setdp(10),
    paddingRight: setdp(10)
  },
  labelText: {
    color: '#9c9595',
    fontSize: setFont(12),
    lineHeight: setdp(36),
  },
  valueText: {
    color: '#9c9595',
    fontSize: setFont(12),
    lineHeight: setdp(36),
  }
});

console.disableYellowBox = true;