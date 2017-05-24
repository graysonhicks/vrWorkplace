import React, { Component } from 'react';
import { AppRegistry, Image, asset } from 'react-vr';


export default class HomeLink extends Component {

  render() {

    return (
        <Image source={asset('home.png')}
            style={{
                width: .5,
                height: .5,
                transform: [
                    {translate: [0, .5, -3]}
                ]
            }}/>
    );
  }
}

AppRegistry.registerComponent('HomeLink', () => HomeLink);
