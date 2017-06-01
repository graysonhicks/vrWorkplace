import React, { Component } from 'react';
import { AppRegistry, Text, View, Pano, asset } from 'react-vr';


export default class Panorama extends Component {

  render() {

    return (
        <Pano source={asset(this.props.source)} onLoad={this.props.sceneOnLoad} onLoadEnd={this.props.sceneOnLoadEnd}/>
    );
  }
}

AppRegistry.registerComponent('Panorama', () => Panorama);
