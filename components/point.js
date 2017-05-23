import React, { Component } from 'react';
import { AppRegistry, Text, View, VrButton, Animated } from 'react-vr';
import InfoPanel from './infopanel.js';

const Easing = require('Easing');
const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = .13;

var AnimatedButton = Animated.createAnimatedComponent(VrButton);


export default class Point extends Component {
    constructor(props) {
    super();

    this.state = {
        panelOn: false,
        animationWidth: new Animated.Value(DEFAULT_ANIMATION_BUTTON_SIZE),
        animationRadius: new Animated.Value(DEFAULT_ANIMATION_BUTTON_RADIUS)
    };

    this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel() {

        this.setState({
            panelOn: !this.state.panelOn
        })
    }

    animateIn = () => {

        Animated.timing(this.state.animationWidth, {
            toValue: 0.05,
            duration: 500,
            easing: Easing.in
        }).start();

    }

    animateOut = () => {
        Animated.timing(this.state.animationWidth, {
            toValue: .13,
            duration: 100,
            easing: Easing.in
        }).start();
    }

    render() {
        return (
            <View>
               <VrButton onClick={this.togglePanel} style={{
                   width: 0.15,
                   height: 0.15,
                   borderRadius: 50,
                   justifyContent: 'center',
                   alignItems: 'center',
                   borderStyle: 'solid',
                   borderColor: '#FFFFFF80',
                   borderWidth: 0.01,
                   transform: [
                       {
                           translate: this.props.item['translate']
                       }, {
                           rotateX: this.props.item['rotation'][0]
                       }, {
                           rotateY: this.props.item['rotation'][1]
                       },{
                           rotateZ: this.props.item['rotation'][2]
                       }
                   ]
               }}>
                   <AnimatedButton onEnter={this.animateIn} onExit={this.animateOut}  style={{
                       width: this.state.animationWidth,
                       height: this.state.animationWidth,
                       borderRadius: this.state.animationRadius,
                       backgroundColor: '#FFFFFFD9',
                   }}></AnimatedButton>
           </VrButton>
                <InfoPanel panelDisplay={this.state.panelOn} togglePanel={this.togglePanel} item={this.props.item}/>

           </View>

        );

    }
}

AppRegistry.registerComponent('Point', () => Point);
