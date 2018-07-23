
'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  PixelRatio,
  Dimensions,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen'
import Storage from 'react-native-storage';
import Toast from 'react-native-root-toast';
import Common from '../component/Common';
import PageUtil from '../component/PageUtil';
import TouchableButton from '../component/TouchableButton';
import * as WeChat from 'react-native-wechat';
//const {setdp, setFont} = PageUtil
const setdp = px => px
const setFont = px => px
export default class App extends Component {
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
    	inviteCode: '',
      isChecked: true,
      checkboxValue: '√',
      status: true
    };
  }

  async componentDidMount() {
    WeChat.registerApp('wx3c44607378d1ad77')
    this.timer=setTimeout(() => {
       SplashScreen.hide();
    }, 2000);
    /*WeChat.shareToTimeline({
      type: 'text', 
      description: 'hello, wechat'
    })*/
    
   /* WeChat.isWXAppSupportApi().then(res => alert(res))
    WeChat.sendAuthRequest('snsapi_userinfo').then(res => alert(res))
    WeChat.shareToTimeline({
      type: 'imageUrl',
      title: 'web image',
      description: 'share web image to time line',
      mediaTagName: 'email signature',
      messageAction: undefined,
      messageExt: undefined,
      imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
    }).then((success)=>{
      console.log(success)
    }).catch((error)=>{
      console.log(error)
    })*/
  }

  getAccessToken(responseCode){
    // ToastUtil.showShort(responseCode, true);
    let appid = 'wx3c44607378d1ad77'
    let secretID = 'a8d15f28be193dfe5be41aeb97cdd6d8'
    var AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+secretID+'&code='+responseCode+'&grant_type=authorization_code';
    fetch(AccessTokenUrl, {
      method:'GET',
      timeout: 2000,
      headers:{
        'Content-Type':'application/json; charset=utf-8',
      },
    })
      .then((response)=>response.json())
      .then((responseData)=>{
          console.log('responseData.refresh_token=',responseData);
          this.getRefreshToken(responseData.refresh_token);
      })
      .catch((error)=>{
          if(error){
              console.log('error=',error);
          }
      })
  }

  getRefreshToken(refreshtoken){
    let appid = 'wx3c44607378d1ad77'
    var getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appid+'&grant_type=refresh_token&refresh_token='+refreshtoken;
    // console.log('getRefreshTokenUrl=',getRefreshTokenUrl);
    fetch(getRefreshTokenUrl,{
      method:'GET',
      timeout: 2000,
      headers:{
          'Content-Type':'application/json; charset=utf-8',
      },
      })
      .then((response)=>response.json())
      .then((responseData)=>{
          console.log('responseData.accesstoken=',responseData);
          this.getUserInfo(responseData);
      })
      .catch((error)=>{
          if(error){
              alert('error=',error);
          }
      })
  }

  getUserInfo(responseData){
    const navigate = this.props.navigation.navigate;
    let getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+responseData.access_token+'&openid='+responseData.openid;
    fetch(getUserInfoUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type':'application/json; charset=utf-8',
      },
    })
    .then((response)=>response.json())
    .then((responseData)=>{
      alert(JSON.stringify({
        nickname:responseData.nickname,
        province:responseData.province,
        openid:responseData.openid
      }))
      this.getKongUserInfo()
      //Common.toastShort([responseData.nickname,responseData.province,responseData.city,responseData.openid],true) 
    })
    .catch((error)=>{
      if(error){
        alert('error='+error);
      }
    })
  }

  checkPhoneNum(phoneNum){
    let patt = /^(1|[1-9][0-9]*|-[0-9]*)$/
    if(!patt.test(phoneNum)) {
      phoneNum = phoneNum.substr(0, (phoneNum.length - 1))
    }
    return phoneNum
  }

  phoneNumChange(phoneNum) {
    this.setState({phoneNum: this.checkPhoneNum(phoneNum)}, () => {
      this.checkStatus()? this.setState({status: false}): this.setState({status: true})
    })
  }

  setCheckBoxvalue(){
    if (this.state.isChecked) {
      this.setState({
        isChecked: false,
        checkboxValue: '',
        status: true
      })
    } else {
      this.setState({
        isChecked: true,
        checkboxValue: '√'
      }, () => {
        this.checkStatus()? this.setState({status: false}): this.setState({status: true})
      })
    }
  }

  setInviteCode(inviteCode) {
    console.log(inviteCode)
    this.setState({inviteCode: this.checkPhoneNum(inviteCode)}, () => {
      this.checkStatus()? this.setState({status: false}): this.setState({status: true})
    })
  }

  checkStatus() {
    let {phoneNum, inviteCode, isChecked} = this.state
    if (phoneNum && inviteCode && isChecked) {
      return true
    }
    return false
  }

  goNextPage(){
    this.setState({status: true})
    let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(this.state.phoneNum)) {
      Common.toastShort('请输入正确的手机号', () => this.setState({status: false}));
    } else {
      this.getKongUserInfo()
    }
  }

  getKongUserInfo() {
    const navigate = this.props.navigation.navigate;
    fetch('https://card.kong.net/api/wot/userinfo').then(
      response => response.json()
    ).then(
      responseJson => {
        let userInfo = {
          num: responseJson.ce,
          name: responseJson.fullname,
          strength: '16553',
          ammunitions: responseJson.bullet,
          phoneNum: '13511111111',
        }

        let storage = new Storage({
          size: 1000,
          storageBackend: AsyncStorage,
          defaultExpires: null,
          enableCache: false,
        })

        global.storage = storage
        
        global.storage.save({
          key:'userInfo',
          data: userInfo,
          expires: null
        })

        navigate('home')
      }
    ).catch(
      error => console.error(error)
    );
  }

  wxLogin() {
    let scope = 'snsapi_userinfo'
    //发送授权请求
    WeChat.sendAuthRequest(scope)
    .then(responseCode => {
      //返回code码，通过code获取access_token
      this.getAccessToken(responseCode.code);
    })
    .catch(err => {
      Alert.alert('登录授权发生错误：', err.message, [
        {text: '确定'}
      ]);
    })
  }
	render() {
		const navigate = this.props.navigation.navigate;
    return (
    	<View style={{backgroundColor: '#1d2027', flex: 1}}>
    		<TextInput
          style={[styles.input, styles.inputFirst]}
          onChangeText={(phoneNum) => {this.phoneNumChange(phoneNum)}}
          value={this.state.phoneNum}
          placeholder='请输入手机号'
          placeholderTextColor= '#5b5e65'
          keyboardType='numeric'
          maxLength={11}
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.input}
          onChangeText={(inviteCode) => {this.setInviteCode(inviteCode)}}
          value={this.state.inviteCode}
          placeholder='请输入邀请码'
          placeholderTextColor= '#5b5e65'
          maxLength={6}
          keyboardType='numeric'
          underlineColorAndroid='transparent'
        />
        <View
          style={{flexDirection: 'row', marginTop: setdp(20), justifyContent: 'center'}}>
          <View style={styles.checkbox}>
            <Text style={styles.checkboxText} 
            isChecked={this.state.isChecked} 
            onPress={this.setCheckBoxvalue.bind(this)}>{this.state.checkboxValue}</Text>
          </View>
          <View style={styles.checkboxlabel}>
            <Text style={styles.checkboxlabelText}>已同意《用户协议》</Text>
          </View>
        </View>

        <View style={{marginLeft: setdp(15), marginRight: setdp(15), marginTop: setdp(180)}}>
          <TouchableButton
            textColor='#0684bf'
            fontSize={setFont(13)}
            text='下一步'
            disabled={this.state.status}
            onPress={() => {this.goNextPage()}}
            underlayColor='#242b35'
          />
        </View>
        <View style={styles.wxIconContainer}>
          <TouchableHighlight onPress={this.wxLogin.bind(this)} style={styles.wxIcon}>
            <Image
              style={styles.wxIcon}
              source={require('./images/wx.png')}
            />
          </TouchableHighlight>
          <Text style={styles.wxLabel}>微信登陆</Text>
        </View>
    	</View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    marginLeft: setdp(15),
    marginRight: setdp(15),
    height: setdp(40),
    lineHeight: 40,
    color: '#5b5e65',
    borderColor: '#fff',
    borderBottomWidth: 1,
    fontSize: setFont(12)
  },
  inputFirst: {
    marginTop: setdp(110),
    marginBottom: setdp(10)
  },

  checkbox: {
    width: setdp(20),
    height: setdp(20),
    borderWidth: 1,
    borderColor: '#027da7',
    marginLeft: setdp(15),
  },
  checkboxText: {
    color: '#027da7',
    textAlign: 'center',
    flex: 1,
  },
  checkboxlabel: {
    flex: 1,
    height: setdp(20),
    marginLeft: setdp(10),
  },
  checkboxlabelText: {
    fontSize: setFont(12),
    lineHeight: setdp(20),
    color: '#027da7',
  },
  wxIconContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  wxIcon: {
    width: 40,
    height: 40,
  },
  wxLabel: {
    fontSize: 10,
    color: '#fff'
  }
});

console.disableYellowBox = true;