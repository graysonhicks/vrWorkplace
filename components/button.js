import React, { Component } from 'react';
import { AppRegistry, Text, View, VrButton } from 'react-vr';


export default class Button extends Component {

  render() {

    return (
        <VrButton style={{
            margin: 0.1,
            height: 0.3,
            backgroundColor: this.props.item.buttonColor
        }} onClick= {e => this.props.onNavigationClick(this.props.item, e)}>
            <Text style={{
                fontSize: 0.2,
                textAlign: 'center'
            }}>{this.props.item.workplace}</Text>
        </VrButton>

    );
  }
}

AppRegistry.registerComponent('Button', () => Button);
