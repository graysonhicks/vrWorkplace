import React, { Component } from 'react';
import { AppRegistry, Plane, View, Text } from 'react-vr';


export default class InfoPanel extends Component {
    constructor(props) {
    super();

    }

    togglePanel(e) {
        if (e.nativeEvent.inputEvent.eventType === "mousedown" && e.nativeEvent.inputEvent.button === 0) {
            this.props.togglePanel();
        }
    }
  render() {
      if(!this.props.panelDisplay){
          return null;
      }
    return (
        <View onInput={e =>this.togglePanel(e)} billboarding={'on'} style={{
                transform: [
                    {
                        translate: [this.props.item['translate'][0] +.25, this.props.item['translate'][1] +.25, this.props.item['translate'][2] + .25]
                    }, {
                        rotateX: this.props.item['rotation'][0]
                    }, {
                        rotateY: this.props.item['rotation'][1]
                    },{
                        rotateZ: this.props.item['rotation'][2]
                    }
                ],
                position: 'absolute'
            }}>

        <Plane

            dimWidth={1}
            dimHeight={1.5}
            style={{
                color:'#FFFFFFD9'
            }}>
            <Text style={{color:'black', textAlign:'center'}}>{this.props.item.text}</Text>
        </Plane>
            </View>

    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
