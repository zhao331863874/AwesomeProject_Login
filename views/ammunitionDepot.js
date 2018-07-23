'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  BackHandler,
  AsyncStorage,
  ImageBackground,
  FlatList
} from 'react-native';
import PageUtil from '../component/PageUtil';
//const {setdp, setFont} = PageUtil;
const setdp = px => px
const setFont = px => px
export default class AmmunitionDepot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: []
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('home')
    })

    global.storage.load({
      key:'userInfo'
    }).then((result) => {

    }).catch((e) => {alert(e)})

    fetch('https://card.kong.net/api/wot/bulletrecord').then(
      response => response.json()
    ).then(
      responseJson => {
        this.setState({historyList: responseJson.record_list})
      }
    ).catch(
      error => console.error(error)
    );
  }

	render() {
		const navigate = this.props.navigation.navigate;
    let historyList = [
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
      {name: '2018年4月4日', ammunition: '9.9999'},
    ]
    return (
    	<View style={{flex: 1}}>
        <ImageBackground source={require('./images/bg.jpg')} style={{flex: 1}}>
          <View style={styles.detailContainer}>
            <View style={styles.total}>
              <Text style={styles.totalText}>累计获得：199</Text>
            </View>
            <View style={styles.ammunitionNum}>
              <View style={styles.ammunitionNumTexCont}>
                <Text style={styles.ammunitionNumTex}>持有弹药</Text>
                <Text style={styles.ammunitionNumTex}>9999.999</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  fontSize={setFont(13)}
                  title='兑换'
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <ImageBackground source={require('./images/cyrtain.jpg')} style={{flex: 1}}> 
          <View style={styles.listContainer}>
            <View style={styles.historyList}>
              <View style={[styles.historyListLeft, {marginTop: 15}]}>
                <Text style={styles.listTitle}>日期</Text>
              </View>
              <View style={[styles.historyListRight, {marginTop: 15}]}>
                <Text style={styles.listTitle}>数量</Text>
              </View>
            </View>
            <FlatList
              style={{marginTop: setdp(15)}}
              data={this.state.historyList}
              renderItem={({item}) =>  <View style={styles.historyList}>
                <View style={styles.historyListLeft}>
                  <Text style={styles.listItemText}>{item.time.substring(0, 10)}</Text>
                </View>
                <View style={styles.historyListRight}>
                  <Text style={styles.listItemText}>{item.bullet}</Text>
                </View>
              </View>}
            />
          </View>
        </ImageBackground>
    	</View>
    )
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    paddingBottom: 10
  },
  total: {
    height: setdp(30),
    borderRadius: setdp(15),
    borderWidth: 1,
    borderColor: '#1d698d',
    backgroundColor: '#0f1417',
    position: 'absolute',
    left: setdp(-15),
    top: setdp(20),
    justifyContent: 'center'
  },
  totalText: {
    color: '#3e92b7',
    fontSize: setFont(13),
    paddingLeft: setdp(25),
    paddingRight: 6,
  },
  ammunitionNum: {
    marginTop: setdp(186),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ammunitionNumTexCont: {
    backgroundColor: '#7c6c31',
    width: setdp(110),
  },
  ammunitionNumTex: {
    fontSize: setFont(12),
    color: '#f0f0e6',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: setdp(15),
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: setdp(157),
    justifyContent: 'center',
  },

  listContainer: {
    flex: 1,
    marginLeft: setdp(15),
    marginRight: setdp(15),
    borderTopWidth: 1,
    borderColor: '#36373c',
  },
  historyList: {
    flexDirection: 'row',
    height: setdp(25)
  },
  historyListLeft: {
    flex: 3,
    height: setdp(25),
  },
  historyListRight: {
    flex: 1,
    height: setdp(25),
  },
  listTitle: {
    color: '#fff',
    fontSize: setFont(12)
  },
  listItemText: {
    color: '#808186',
    fontSize: setFont(12)
  }
});