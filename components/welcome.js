import React, { Component } from 'react';
import { AppRegistry, Text, View, Animated } from 'react-vr';


export default class Welcome extends Component {
    constructor(props) {
    super(props);

        this.state = {
            animationOpacity: new Animated.Value(0)
        };

    }

    componentDidMount(){
        Animated.sequence([
            Animated.timing(this.state.animationOpacity, {
                toValue: 1,
                duration: 5000
            }),
            Animated.timing(this.state.animationOpacity, {
                toValue: 0,
                duration: 2500
            })
        ]).start();

    }


  render() {

    return (
        <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: 10,
                        opacity: this.state.animationOpacity,
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
