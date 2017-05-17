import React, { Component } from 'react';
import { AppRegistry, Plane, View, Text } from 'react-vr';


export default class InfoPanel extends Component {
  render() {
    return (
        <Plane dimWidth={1} dimHeight={2} style={{backgroundColor:'#FFFFFFD9', transform: [{translate: [0, 0, -5]}]}}/>

    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
