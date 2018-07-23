'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Button,
  View,
  Animated,
  BackHandler,
  ScrollView,
  Platform,
  Easing,
  FlatList,
  PixelRatio,
  ImageBackground,
  Image,
  AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import * as WeChat from 'react-native-wechat';
import Common from '../component/Common';
import PageUtil from '../component/PageUtil';
import TouchableButton from '../component/TouchableButton';
//const {setdp, setFont} = PageUtil
const setdp = px => px
const setFont = px => px
export default class ProductionBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: new Animated.Value(1),//初始化一个动画对象
      num: '',
      name: '',
      strength: '',
      runkList: [],
    }
  }

  componentDidMount() {
    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }

    global.storage.load({
      key:'userInfo'
    }).then((result) => {
      this.setState({
        num: result.num,
        name: result.name,
        strength: result.strength
      })
    }).catch(
      e => console.warn(e)
    )

    fetch('https://card.kong.net/api/wot/toplist').then(
      response => response.json()
    ).then(
      responseJson => {
        this.setState({runkList: responseJson.toplist})
      }
    ).catch(
      error => console.error(error)
    );
  }

  componentWillUnmount() {
    if(Platform.OS === 'android'){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    }
  }

  onBackClicked = () => {
    if (this.props.navigation.state.key === '生产基地') {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return;
      }
      this.lastBackPressed = Date.now();
      Common.toastShort('再按一次退出应用');
    }
    return true;
  }

  getMilitaryStrength() {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 0, // 目标值
      duration: 800, // 动画时间
      easing: Easing.linear // 缓动函数
    }).start();
  }

  goSettingPage(){
    this.props.navigation.navigate('setting')
  }

  shareToFriends() {
    WeChat.registerApp('wx3c44607378d1ad77')
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
          WeChat.shareToTimeline({
            type: 'text', 
            description: '和我一起来玩坦克大战吧！'
          })
            .catch((error) => {
              Alert.alert(error.message);
            });
      } else {
        Alert.alert('请安装微信');
      }
    });
  }

	render() {
    let runkList = [
      {name: '张一', ammunition: '9.9999'},
      {name: '张二一', ammunition: '9.9999'},
      {name: '张三', ammunition: '9.9999'},
      {name: '张四', ammunition: '9.999'},
      {name: '张五', ammunition: '9.9999'},
      {name: '张六', ammunition: '9.2355'},
      {name: '张阿萨德', ammunition: '9.9999'},
      {name: '张二一', ammunition: '9.9999'},
      {name: '张三', ammunition: '9.9999'},
      {name: '张四', ammunition: '9.999'},
      {name: '张五', ammunition: '9.9999'},
      {name: '张六', ammunition: '9.2355'},
      {name: '张阿萨德', ammunition: '9.9999'},
    ]

		const {navigation} = this.props;
    return (
    <ScrollView style={{backgroundColor: '#23262b'}}>
    	<View>
        <ImageBackground source={require('./images/homebg1.jpg')} style={{flex: 1}}> 
          <View style={{height: setdp(360)}}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>编号：{this.state.num}</Text>
              <Text style={styles.detailText}>姓名：{this.state.name}</Text>
              <Text style={styles.detailText}>战力：{this.state.strength}</Text>
              <View style={styles.setting}>
                <Text style={styles.detailText} onPress={() => {this.goSettingPage()}}>设置</Text>
              </View>
            </View>
            <Animated.View 
              style={[styles.image, {opacity: this.state.fadeInOpacity}]}
            >
              <Text 
                onPress={this.getMilitaryStrength.bind(this)}
                style={{color: '#fff', lineHeight: setdp(50), fontSize: setFont(12)}}
              >收集弹药</Text>
            </Animated.View>
            <View style={{height: setdp(185)}}>
              <View style={styles.ammunitionCenterCont}>
                <View style={{backgroundColor: '#7b6735'}}>
                  <Text style={{color: '#fff'}}>弹药：9.7894</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonBox}>
              <TouchableButton
                text='获取战力'
                fontSize={setFont(13)}
                style={styles.leftButton}
                onPress={() => {navigation.navigate('战力获取')}}
                underlayColor='#0d97d7'
              />
              <TouchableButton
                text='邀请好友'
                fontSize={setFont(13)}
                style={styles.rightButton}
                onPress={() => {this.shareToFriends()}}
                underlayColor='#e80d0b'
              />
            </View>
          </View>
        </ImageBackground>
        <ImageBackground source={require('./images/cyrtain.jpg')} style={{flex: 1}}>
          <View style={styles.runkListContainer}>
            <View style={[styles.runkListItem, {marginTop: setdp(15)}]}>
              <View style={styles.runkListLeft}>
                <Text style={styles.listItemTitle}>排名</Text>
              </View>
              <View style={styles.runkListRight}>
                <Text style={styles.listItemTitle}>弹药</Text>
              </View>
            </View>
            <FlatList
              data={this.state.runkList}
              renderItem={({item}) =>  <View key={item.name} style={styles.runkListItem}>
                <View style={styles.runkListLeft}>
                  <Text style={styles.listItemText}>{item.fullname}</Text>
                </View>
                <View style={styles.runkListRight}>
                  <Text style={styles.listItemText}>{item.bullet}</Text>
                </View>
              </View>}
            />
          </View>
        </ImageBackground>
    	</View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: setdp(50),
    height: setdp(50),
    borderWidth: 1,
    borderRadius: setdp(25),
    borderColor: '#f1b63e',
    backgroundColor: '#f1b63e',
    position: 'absolute',
    left: '60%',
    top: setdp(150),
  },
  detailContainer: {
    marginLeft: setdp(15),
    marginRight: setdp(15),
    height: setdp(100),
    borderWidth: 1,
    borderColor: '#0073a9',
    backgroundColor: '#1d2027',
    marginTop: setdp(30),
    justifyContent: 'space-around',
    padding: setdp(10)
  },
  detailText: {
    fontSize: setFont(12),
    color: '#0073a9',
    marginLeft: setdp(20)
  },
  setting: {
    position: 'absolute',
    right: setdp(15),
    top: setdp(5)
  },
  ammunitionCenterCont: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: setdp(10),
  },
  buttonBox: {
    flexDirection: 'row',
    flex: 1
  },
  leftButton: {
    flex: 1,
    height: setdp(30),
    marginLeft: setdp(15),
    marginRight: setdp(10),
    backgroundColor: '#0073a9',
    borderWidth: 0
  },
  rightButton: {
    flex: 1,
    height: setdp(30),
    marginLeft: setdp(10),
    marginRight: setdp(15),
    backgroundColor: '#b40200',
    borderWidth: 0
  },
  runkListContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#65666b',
    marginLeft: setdp(15),
    marginRight: setdp(15),
  },
  runkListItem: {
    flexDirection: 'row',
    height: setdp(25)
  },
  runkListLeft: {
    flex: 3,
    height: setdp(25)
  },
  runkListRight: {
    flex: 1,
    height: setdp(25)
  },
  listItemText: {
    color: '#6f7075',
    fontSize: setFont(12)
  },
  listItemTitle: {
    color: '#fff',
    fontSize: setFont(12)
  }
});