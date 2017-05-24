import React, { Component } from 'react';
import { AppRegistry, Image, VrButton, asset, Animated } from 'react-vr';

var AnimatedButton = Animated.createAnimatedComponent(VrButton);

const Easing = require('Easing');

export default class HomeLink extends Component {
    constructor(props) {
    super();

    this.state = {
        animationScale: new Animated.Value(1)
    };


    }
    animateIn = () => {

        Animated.timing(this.state.animationScale, {
            toValue: 1.2,
            duration: 250,
            easing: Easing.in
        }).start();

    }

    animateOut = () => {
        Animated.timing(this.state.animationScale, {
            toValue: 1,
            duration: 250,
            easing: Easing.in
        }).start();
    }

  render() {

    return (
        <AnimatedButton onClick={this.props.onHomeLinkClick} onEnter={this.animateIn} onExit={this.animateOut} style={{
            width: 0.25,
            height: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
                {translate: [0, .5, -3]},
                {scale: this.state.animationScale}
            ]

        }}>
        <Image source={asset('home.png')}
            style={{
                width: .25,
                height: .25
            }}/>
        </AnimatedButton>

    );
  }
}

AppRegistry.registerComponent('HomeLink', () => HomeLink);
