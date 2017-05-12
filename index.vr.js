import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  Mesh
} from 'react-vr';
import Point from './components/point.js';
import InfoPanel from './components/infopanel.js';


export default class vrWorkplace extends React.Component {
    constructor(props) {
   super(props);

   this.state = {
       workplaces: [
           {
                id: 0,
                workplace: 'none',
                panoImage: 'chess-world.jpg'
           },
           {
               id: 1,
               workplace: 'office',
               panoImage: 'office.jpg',
               navigations: [{
                  step: 2,
                  translate: [0.2, -0.03, -1],
                  rotation: [0, 20, 0]
              }]
          },
          {
              id: 2,
              workplace: 'farm',
              panoImage: 'farm.jpg',
              navigations: [{
                  step: 3,
                  translate: [-0.43, -0.01, 0.9],
                          rotation: [0, 140, 0]
              }]
         },
         {
             id: 1,
             workplace: 'office',
             panoImage: 'office.jpg',
             navigations: [{
                step: 1,
                translate: [-0.4, 0.05, -0.9],
                rotation: [0, 0, 0]
            }]
         }
       ]
   };

 }

 componentWillMount() {
    this.setState({
        current_workplace: this.state.workplaces[1]
    });
}



  render() {
      console.log(this.state);
    return (
      <View>

        <Pano source={asset(this.state.current_workplace.panoImage)}/>
            {
              this.state.current_workplace['navigations'].map(function(item, i) {
                    console.log(item);
                  return <Mesh key = {i}
                  style = {
                          {
                              layoutOrigin: [0.5, 0.5],
                              transform: [{
                                  translate: item['translate']
                              }, {
                                  rotateX: item['rotation'][0]
                              }, {
                                  rotateY: item['rotation'][1]
                              }, {
                                  rotateZ: item['rotation'][2]
                              }]
                          }
                      } >
                      <VrButton
                  style = {
                          {
                              width: 0.15,
                              height: 0.15,
                              borderRadius: 50,
                              backgroundColor: 'blue'
                          }
                      } >
                      </VrButton> </Mesh>
              })
          }

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
        <Point />

      </View>
    );
  }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
