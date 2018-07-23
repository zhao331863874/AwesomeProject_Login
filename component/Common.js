import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Alert,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native'
import Toast from 'react-native-root-toast'
export default class Common extends PureComponent {
	static invoke = (url, callBack) => {
		fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origim': '*',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
    })
    .catch((error) => {
      Alert.alert('错误提示', error)
    });  callBack(responseJson)
	}

  static toastShort = (content, onhideFun) => {
    let toast
    if (toast !== undefined) {
      Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHidden: typeof onhideFun === 'function'? onhideFun: null
    });
  };
}