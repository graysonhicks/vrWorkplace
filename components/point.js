import React, { Component } from 'react';
import { AppRegistry, Text, View, VrButton } from 'react-vr';


export default class Point extends Component {

  render() {

            return (
                <View onEnter={e => this.props.hotPointEnter(e, this.props.item)} onExit={e => this.props.hotPointExit(e, this.props.item)}>
                   <VrButton style={{
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

               </View>

            );

    }
}

AppRegistry.registerComponent('Point', () => Point);
