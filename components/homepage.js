import React, { Component } from 'react';
import { AppRegistry, Text, View, Animated } from 'react-vr';

import Welcome from './welcome.js';
import Menu from './menu.js';

var AnimatedWelcome = Animated.createAnimatedComponent(Welcome);


export default class Homepage extends Component {
    constructor(props) {
        super();

        this.state = {
            welcomeAnimationOpacity: new Animated.Value(0),
            menuAnimationOpacity: new Animated.Value(0)
        };

    }
    componentDidMount(){
        Animated.sequence([
            Animated.timing(this.state.welcomeAnimationOpacity, {
                toValue: 1,
                duration: 2500
            }),
            Animated.timing(this.state.welcomeAnimationOpacity, {
                toValue: 0,
                duration: 2500
            }),
            Animated.timing(this.state.menuAnimationOpacity, {
                toValue: 1,
                duration: 2500
            })
        ]).start();

    }


  render() {

    return (
    <View>
        <Welcome opacity={this.state.welcomeAnimationOpacity}/>
        <Menu opacity={this.state.menuAnimationOpacity} workplaces={this.props.workplaces} onNavigationClick={this.props.onNavigationClick} />
    </View>
    );
  }


}

AppRegistry.registerComponent('Homepage', () => Homepage);
