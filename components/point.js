import React, { Component } from 'react';
import { AppRegistry, Text, View, VrButton } from 'react-vr';
import InfoPanel from './infopanel.js';

export default class Point extends Component {
    constructor() {
        super();

        this.state = { panelOn: false };
        this.togglePanel = this.togglePanel.bind(this);
      }

      togglePanel() {
      this.setState({
        panelOn: !this.state.panelOn
      })
    }

  render() {
      var panel;
            if(this.state.panelOn){
                panel = <InfoPanel item={this.props.item}/>;
            } else {
                panel = null;
            }

            return (
                <View>
                   <VrButton onClick={this.togglePanel} onEnter={e => this.props.hotPointEnter(e, this.props.item)} onExit={e => this.props.hotPointExit(e, this.props.item)} style={{
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
                               rotateY: this.props.hoverRotation
                           },{
                               rotateZ: this.props.item['rotation'][2]
                           }
                       ]
                   }}>
                       <VrButton style={{
                           width: this.props.animationWidth,
                           height: this.props.animationWidth,
                           borderRadius: this.props.animationRadius,
                           backgroundColor: '#FFFFFFD9',
                       }}></VrButton>
                   </VrButton>

                    {panel}

               </View>

            );

    }
}

AppRegistry.registerComponent('Point', () => Point);
