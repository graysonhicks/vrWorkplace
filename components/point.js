import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-vr';


export default class Point extends Component {
  render() {
    return (
        <View style={{transform: [{translate: [0,2.5,5]},]}}>
            <Text style={{ transform: [{translate: [10, 10, 100]}],
               layoutOrigin: [.5, .5], color: '#00aeff', fontSize: 24, textShadowOffset: {width: 1, height: 1}, textShadowRadius: .2, textShadowColor: '#87F'}} >+</Text>
        </View>

    );
  }
}

AppRegistry.registerComponent('Point', () => Point);
