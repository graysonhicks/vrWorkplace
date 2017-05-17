import React, { Component } from 'react';
import { AppRegistry, Plane, View, Text } from 'react-vr';


export default class InfoPanel extends Component {
  render() {
    return (
        <Plane
            dimWidth={1}
            dimHeight={2}
            style={{
                color:'#FFFFFFD9',
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
            <Text style={{color:'black', textAlign:'center'}}>{this.props.item.text}</Text>
        </Plane>

    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
