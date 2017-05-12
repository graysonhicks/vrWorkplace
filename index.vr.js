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
               buttonColor: '#00aeff',
               panoImage: 'office.jpg',
               hotPoints: [{
                  text: "This is a hotpoint!",
                  translate: [0.2, -0.03, -1],
                  rotation: [0, 20, 0]
              },
              {
                  text: "Second hotpoint!",
                  translate: [10, 0, 1],
                  rotation: [0,-40,0]
              }]
          },
          {
              id: 2,
              workplace: 'farm',
              buttonColor: '#9873c1',
              panoImage: 'farm.jpg',
              hotPoints: [{
                  text: "This is a hotpoint!",
                  translate: [-0.43, -0.01, 0.9],
                  rotation: [0, 140, 0]
              },
              {
                  text: "Second hotpoint!",
                  translate: [0,0,-5],
                  rotation: [0,140,0]
              }]
         },
         {
             id: 3,
             workplace: 'hotel',
             buttonColor: '#fe7a9b',
             panoImage: 'hotel.jpg',
             hotPoints: [{
                text: "This is a hotpoint!",
                translate: [-0.4, 0.05, -0.9],
                rotation: [0, 0, 0]
            },
            {
                text: "Second hotpoint!",
                translate: [5,0,0],
                rotation: [0,-40,0]
            }]
         }
       ]
   };


 this.onNavigationClick = this.onNavigationClick.bind(this);
 }

 componentWillMount() {
    this.setState({
        current_workplace: this.state.workplaces[0]
    });
}

    onNavigationClick(item, e) {

        var new_workplace = this.state.workplaces.find(i => i['id'] === item.id);

        this.setState({
            current_workplace: new_workplace
        });

    }

    buildHotpoints() {
        if(this.state.current_workplace.id !== 0) {
        var hotPoints = this.state.current_workplace['hotPoints'].map(function(item, i) {

            return <View key = {i}
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
                } ><VrButton
            style = {
                    {
                        width: 0.15,
                        height: 0.15,
                        borderRadius: 50,
                        backgroundColor: 'white'
                    }
                } >
            </VrButton><Text>{item.text}</Text></View>
        })

        return hotPoints;
    }
    }

    buildButtons(){
        var that = this;
        var buttons = this.state.workplaces.filter(item => item.id !== 0).map(function (item, i) {

            return  <VrButton key={i} style={{ margin: 0.1, height: 0.3, backgroundColor: item.buttonColor}} onClick = {e => that.onNavigationClick(item, e)}>
               <Text style={{fontSize: 0.2, textAlign: 'center'}}>{item.workplace}</Text>
             </VrButton>
        });

        return buttons;
    }


  render() {
    var hotPoints = this.buildHotpoints();

    var buttons = this.buildButtons();

    return (
      <View>

        <Pano source={asset(this.state.current_workplace.panoImage)}/>


            <View style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [{translate: [-1, 2, -5]}],
          }}>


         {hotPoints}


          <View style={{ margin: 0.3, height: 0.3, backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center', fontWeight: 'bold'}}>Choose Your Workplace</Text>
          </View>
         {buttons}

        </View>

      </View>
    );
  }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
