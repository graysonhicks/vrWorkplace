import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';

import Button from './components/MenuButton/index.js'

export default class vrWorkplace extends React.Component {
    constructor() {
   super();
   this.state = {
        workplace: 'none',
        panoImage: 'chess-world.jpg'
   };

 }

  render() {
      console.log(this.state);
    return (
      <View>

        <Pano source={asset(this.state.panoImage)}/>
            <View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [{translate: [-1, 2, -5]}],
          }}>
          <View style={{ margin: 0.3, height: 0.3, backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center', fontWeight: 'bold'}}>Choose Your Workplace</Text>
          </View>
          <VrButton style={{ margin: 0.1, height: 0.3, backgroundColor: '#00aeff'}}  onClick={()=>this.setState({workplace: 'office', panoImage: 'office.jpg'})}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>OFFICE</Text>
          </VrButton>
          <VrButton style={{ margin: 0.1, height: 0.3, backgroundColor: '#9873c1'}}  onClick={()=>this.setState({workplace: 'farm', panoImage: 'farm.jpg'})}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>FARM</Text>
          </VrButton>
          <VrButton style={{ margin: 0.1, height: 0.3, backgroundColor: '#fe7a9b'}}  onClick={()=>this.setState({workplace: 'hotel', panoImage: 'hotel.jpg'})}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>HOTEL</Text>
          </VrButton>

        </View>

      </View>
    );
  }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
