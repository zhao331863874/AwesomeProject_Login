
'use strict';
import React, { Component } from 'react';
import {
  PixelRatio,
  Dimensions
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
let fontScale = PixelRatio.getFontScale(); //返回字体大小缩放比例
let pixelRatio = PixelRatio.get();//当前设备的像素密度
const defaultPixel = 2;//iphone6的像素密度
//px转换成dp
const w2 = 750 / pixelRatio;
const h2 = 1334 / pixelRatio;
//const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
const scale = Math.min(deviceWidth / w2);
export default class PageUtil extends Component {
  static setdp = pxsize => Math.round(pxsize * scale + 0.5);

  static setFont = pxsize => Math.round((pxsize * scale + 0.5) * pixelRatio / fontScale) / defaultPixel /2
}