import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
} from 'react-vr';

import Button from './components/MenuButton/index.js'

export default class vrWorkplace extends React.Component {
  render() {
    return (
      <View>

        <Pano source={asset('office.jpg')}/>
        <Button text="Hello" />



      </View>
    );
  }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
