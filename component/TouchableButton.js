
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class TouchableButton extends Component {
  render() {
    let textColor = this.props.textColor? this.props.textColor: '#fff'
    let fontSize = this.props.fontSize? this.props.fontSize: 14
    if (this.props.disabled) {textColor = '#6d6d6d'}
    return (
        <TouchableHighlight 
          underlayColor={this.props.underlayColor? this.props.underlayColor: '#2a2a2a'}
          activeOpacity={0.8}  
          style={[styles.defaultStyle, this.props.style, this.props.disabled? styles.disabled: null]}
          onPress={this.props.disabled? ()=> {}: this.props.onPress}
          >
            <Text style={[styles.text, {fontSize: fontSize, color: textColor}]}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    marginLeft: 15,
    marginRight: 15,
    height: 30,
    backgroundColor: '#242b35',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0684bf',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#6b6b6b'
  },
  text: {
    textAlign: 'center',
  }
})
 
module.exports = TouchableButton;
