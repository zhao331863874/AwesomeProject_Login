'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  Dimensions,
  BackHandler,
  TouchableHighlight,
  Image
} from 'react-native';
import TouchableButton from '../component/TouchableButton';
import PageUtil from '../component/PageUtil';
//const {setdp, setFont} = PageUtil;
const setdp = px => px
const setFont = px => px
export default class MilitaryStrength extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strengthTastShow: 'flex',
      dailyTastShow: 'none',
      trengthTastTextColor: '#cfd2d7',
      dailyTastTextColor: '#70737a',
      tastList: [],
      dailyTastList: []
    };
  }

  choseTask(flag){
    if (flag === 'strengthTast') {
      this.setState({
        strengthTastShow: 'flex',
        dailyTastShow: 'none',
        trengthTastTextColor: '#cfd2d7',
        dailyTastTextColor: '#70737a'
      })
    } else {
      this.setState({
        strengthTastShow: 'none',
        dailyTastShow: 'flex',
        trengthTastTextColor: '#70737a',
        dailyTastTextColor: '#cfd2d7'
      })
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('home')
    })

    fetch('https://card.kong.net/api/wot/tasklist').then(
      response => response.json()
    ).then(
      responseJson => {
        this.setState({tastList: responseJson.tasklist})
      }
    ).catch(
      error => console.error(error)
    );

    fetch('https://card.kong.net/api/wot/mytasklist/finished').then(
      response => response.json()
    ).then(
      responseJson => {
        this.setState({dailyTastList: responseJson.tasklist})
      }
    ).catch(
      error => console.error(error)
    );
      //https://card.kong.net/api/wot/bulletrecord
  }

	render() {
    let tastList = [
      {title: '每日登陆', text: '去登陆获取战力', status: '0'},
      {title: '每日登陆', text: '去登陆获取战力', status: '1'},
      {title: '每日登陆', text: '去登陆获取战力', status: '0'},
      {title: '每日登陆', text: '去登陆获取战力', status: '1'},
      {title: '每日登陆', text: '去登陆获取战力', status: '0'},
      {title: '每日登陆', text: '去登陆获取战力', status: '1'},
    ]

    let dailyTast = [
      {title: '邀请好友', text: '去登陆获取战力', status: '0'},
      {title: '每日登陆', text: '去登陆获取战力', status: '1'},
    ]
		const navigate = this.props.navigation.navigate;
    return (
    	<View style={styles.container}>
        <Image
          style={styles.banner}
          source={require('./images/strenth.jpg')}
        />
        <View style={styles.nav}>
          <TouchableHighlight 
            activeOpacity={0.6} 
            underlayColor='#1d2027' 
            onPress={this.choseTask.bind(this, 'strengthTast')}
            style={styles.strengthTast}
          >
            <Text 
              style={{lineHeight: setdp(30),
                color: this.state.trengthTastTextColor,
                fontSize: setFont(12)
              }}>战力任务</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#1d2027' 
            onPress={this.choseTask.bind(this, 'dailyTast')}
          >
            <Text
              style={{lineHeight: setdp(30),
                color: this.state.dailyTastTextColor,
                fontSize: setFont(12)
              }}>每日游戏任务</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          style={{display: this.state.strengthTastShow}}
          data={this.state.tastList}
          renderItem={
            ({item}) => <View key={item.title} style={styles.strengthTastItem}>
              <Image
                style={styles.itemIcon}
                source={require('./images/medal.gif')}
              />
              <View style={styles.taskItemText}>
                <Text style={styles.listItemTitle}>{item.taskname}</Text>
                <Text style={styles.listItemText}>{item.award_desc}</Text>
              </View>
              <View style={styles.button}>
                <TouchableButton
                  textColor='#0684bf'
                  fontSize={setFont(13)}
                  text={item.status === '0'? '去绑定': '已完成'}
                  disabled={item.status === '0'? false: true}
                  onPress={() => {alert(0)}}
                  underlayColor='#242b35'
                />
              </View>
            </View>
          }
        />

        <FlatList
          style={{display: this.state.dailyTastShow}}
          data={this.state.dailyTastList}
          renderItem={
            ({item}) => <View key={item.title} style={styles.strengthTastItem}>
              <Image
                style={styles.itemIcon}
                source={require('./images/medal.gif')}
              />
              <View style={styles.taskItemText}>
                <Text style={styles.listItemTitle}>{item.taskname}</Text>
                <Text style={styles.listItemText}>{item.award_desc}</Text>
              </View>
              <View style={styles.button}>
                <Image
                  style={styles.itemIconFinished}
                  source={item.status == '0'? require('./images/finished.jpg'): null}
                />
              </View>
            </View>
          }
        />
    	</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d2027',
    flex: 1
  },
  banner: {
    width: Dimensions.get('window').width,
    height: setdp(140),
  },
  nav: {
    flexDirection: 'row',
    height: setdp(30),
    marginTop: setdp(10),
    marginBottom: 5,
    backgroundColor: '#1d2027',
  },
  strengthTast: {
    marginLeft: setdp(15),
    marginRight: setdp(30)
  },
  strengthTastItem: {
    backgroundColor: '#1d2027',
    height: setdp(102),
    borderTopWidth: 1,
    borderColor: '#363a3d',
    marginLeft: setdp(15),
    marginRight: setdp(15),
    flexDirection: 'row'
  },
  itemIcon: {
    width: setdp(31),
    height: setdp(41),
    marginLeft: setdp(28),
    marginTop: setdp(30)
  },
  itemIconFinished: {
    width: setdp(58),
    height: setdp(44),
    position: 'absolute',
    right: 0
  },
  taskItemText: {
    marginTop: setdp(30),
    marginLeft: setdp(13)
  },
  button: {
    width: setdp(90),
    height: setdp(30),
    marginTop: setdp(32),
    position: 'absolute',
    right: 0,
  },
  listItemTitle: {
    color: '#cfd2d7',
    fontSize: setFont(12)
  },
  listItemText: {
    color: '#737479',
    fontSize: setFont(12)
  }
});

