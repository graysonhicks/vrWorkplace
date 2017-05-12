import React, { Component } from 'react';
import { AppRegistry, Plane, View, Text } from 'react-vr';


export default class InfoPanel extends Component {
  render() {
    return (
        <View style={{transform: [{translate: [0,2.5,5]},]}}>
            <Plane dimWidth={10} dimHeight={10}></Plane>
        </View>

    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
