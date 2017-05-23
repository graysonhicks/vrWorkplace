import React, { Component } from 'react';
import { AppRegistry, Text, View, Animated } from 'react-vr';


export default class Welcome extends Component {
    constructor(props) {
    super();



    }


  render() {

    return (
        <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: 10,
                        opacity: this.props.opacity,
                        alignItems: 'center',
                        transform: [
                            {
                                translate: [-2.5, .5, -3]
                            }
                        ]
                    }}>
                            <Text style={{
                                fontSize: .5,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}>Weclome to vrWorkplace</Text>
                    </Animated.View>
    );
  }


}

AppRegistry.registerComponent('Welcome', () => Welcome);
