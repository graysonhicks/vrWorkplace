import React, { Component } from 'react';
import { AppRegistry, Plane, View, Text, Image, asset } from 'react-vr';

const PANEL_OFFSET_X = .5;
const PANEL_OFFSET_Y = .5;
const PANEL_OFFSET_Z = 1;

export default class InfoPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PANEL_OFFSET_X: .25,
            PANEL_OFFSET_Y: .25,
            PANEL_OFFSET_Z: .25
        }
    }

    componentWillMount(){
        this.setOffsets(this.props);

    }

    setOffsets(props){
        if(props.item['translate'][0] > 0){
            PANEL_OFFSET_X = -.25;
        }
        if(props.item['translate'][2] > 0){
            PANEL_OFFSET_Z = -.25;
        }

        this.setState({
            PANEL_OFFSET_X: props.item['translate'][0] + PANEL_OFFSET_X,
            PANEL_OFFSET_Y: props.item['translate'][1] + PANEL_OFFSET_Y,
            PANEL_OFFSET_Z: props.item['translate'][2] + PANEL_OFFSET_Z,
        });
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
        <View billboarding={'on'} style={{
                transform: [
                    {
                        translate: [this.state.PANEL_OFFSET_X, this.state.PANEL_OFFSET_Y, this.state.PANEL_OFFSET_Z]
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
                <View style={{width: .9, marginBottom: .05, marginTop: .05, alignItems: 'flex-end'}}>
                    <View onInput={e =>this.togglePanel(e)} style={{width: .1, height: .1, justifyContent: 'flex-end'}}>
                        <Image source={asset('close.png')} style={{width: .1, height: .1}}></Image>
                    </View>
                </View>

                <View style={{width: .9, height:1.4}}>
                    <Text style={{color:'black', textAlign:'center'}}>{this.props.item.text}</Text>
                </View>

            </Plane>
            </View>

    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
