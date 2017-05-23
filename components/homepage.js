import React, { Component } from 'react';
import { AppRegistry, Text, View, Animated } from 'react-vr';

import Welcome from './welcome.js';
import Menu from './menu.js';

const Easing = require('Easing');

export default class Homepage extends Component {
    constructor(props) {
        super();

    }
    
  render() {

    return (
    <View>
        <Welcome />
        <Menu workplaces={this.props.workplaces} onNavigationClick={this.props.onNavigationClick} menuCoordinates={this.props.menuCoordinates}/>
    </View>
    );
  }


}

AppRegistry.registerComponent('Homepage', () => Homepage);
