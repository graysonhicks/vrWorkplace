import React, { Component } from 'react';
import { AppRegistry, Text, View, Animated } from 'react-vr';

import Button from './button.js';

export default class Menu extends Component {
    constructor(props) {
        super();

    }

    buildButtons(){
        var that = this;
        var buttons = this.props.workplaces.filter(item => item.id !== 0).map(function(item, i) {

            return <Button
                    key={i}
                    item={item}
                    onNavigationClick={that.props.onNavigationClick}
                    />
        });

        return buttons;
    }


  render() {

      var buttons = this.buildButtons();

    return (
        <Animated.View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            opacity: this.props.opacity,
            transform: [
                {
                    translate: [-1, 2, -5]
                }
            ]
        }}>

            <View style={{
                margin: 0.3,
                height: 0.3,
                backgroundColor: 'transparent'
            }}>
                <Text style={{
                    fontSize: 0.2,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>Choose Your Workplace</Text>
            </View>
            {buttons}
        </Animated.View>
    );
  }


}

AppRegistry.registerComponent('Menu', () => Menu);
