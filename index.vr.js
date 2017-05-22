import React from 'react';
import {
    AppRegistry,
    asset,
    StyleSheet,
    Pano,
    Text,
    View,
    VrButton,
    Plane
} from 'react-vr';


import Point from './components/point.js';
import Button from './components/button.js';

export default class vrWorkplace extends React.Component {

    constructor(props) {
        super(props);

         this.lastUpdate = Date.now();

        this.state = {

            displayWelcome: true,
            menuCoordinates: [1.5, 2, -5],
            workplaces: [
                {
                    id: 0,
                    workplace: 'none',
                    panoImage: 'space.jpg'
                }, {
                    id: 1,
                    workplace: 'office',
                    buttonColor: '#00aeff',
                    panoImage: 'office.jpg',
                    hotPoints: [
                        {
                            text: "This is a hotpoint!",
                            translate: [
                                1.5, .75, -3.5
                            ],
                            rotation: [0, -40, 0],
                            panelOn: false,
                            index: 0
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                3, 0, 3.5
                            ],
                            rotation: [0, -120, 0],
                            panelOn: false,
                            index: 1
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 0, 3.5
                            ],
                            rotation: [0, 180, 0],
                            panelOn: false,
                            index: 2
                        }
                    ]
                }, {
                    id: 2,
                    workplace: 'farm',
                    buttonColor: '#9873c1',
                    panoImage: 'farm.jpg',
                    hotPoints: [
                        {
                            text: "This is a hotpoint!",
                            translate: [
                                0.5, 1, 3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 0
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                0.5, .5, -3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 1
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 1, 3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 2
                        }
                    ]
                }, {
                    id: 3,
                    workplace: 'hotel',
                    buttonColor: '#fe7a9b',
                    panoImage: 'hotel.jpg',
                    hotPoints: [
                        {
                            text: "This is a hotpoint!",
                            translate: [
                                0.5, 0.05, -3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 0
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                0.5, 0, 3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 1
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 3, 3.5
                            ],
                            rotation: [0, 0, 0],
                            panelOn: false,
                            index: 2
                        }
                    ]
                }
            ]
        };

        this.onNavigationClick = this.onNavigationClick.bind(this);
        this.toggleDisplayWelcome = this.toggleDisplayWelcome.bind(this);
        this.testWelcome = this.testWelcome.bind(this);
        this.centerMenu = this.centerMenu.bind(this);
        this.shiftMenu = this.shiftMenu.bind(this);
    }

    componentWillMount() {
        this.setState({current_workplace: this.state.workplaces[0]});

    }
    componentWillUnmount() {

    }
    componentDidMount() {

    }


    toggleDisplayWelcome(){

        this.setState({
            displayWelcome: !this.state.displayWelcome
        })
    }

    centerMenu() {

        var sceneMenuTranslateCoordinates = [-1, 2, -5];

        this.setState({menuCoordinates: sceneMenuTranslateCoordinates})
    }

    shiftMenu() {
        var mainMenuTranslateCoordinates = [1.5, 2, -5];
        this.setState({menuCoordinates: mainMenuTranslateCoordinates})
    }

    onNavigationClick(item, e) {
        postMessage({
                 type: "sceneChanged"
             })
        var new_workplace = this.state.workplaces.find(i => i['id'] === item.id);

        if(this.state.current_workplace.id === 0){
            this.toggleDisplayWelcome();
            this.centerMenu();
        }

        this.setState({current_workplace: new_workplace});

    }
    buildHotpoints() {
        var that = this;

        if (this.state.current_workplace.id !== 0) {
            var hotPoints = this.state.current_workplace['hotPoints'].map(function(item, i) {

                return <Point
                    key={i}
                    item={item}
                    currentWorkplace={that.state.current_workplace}

                    />
            })

            return hotPoints;
        }
    }

    buildButtons() {
        var that = this;
        var buttons = this.state.workplaces.filter(item => item.id !== 0).map(function(item, i) {

            return <Button
                    key={i}
                    item={item}
                    onNavigationClick={that.onNavigationClick}
                    />
        });

        return buttons;
    }

    testWelcome(){
        if(this.state.displayWelcome){
            return(<View style={{
                            flex: 1,
                            flexDirection: 'row',
                            width: 10,
                            alignItems: 'center',
                            transform: [
                                {
                                    translate: [-4, 0, -5]
                                }
                            ]
                        }}>
                                <Text style={{
                                    fontSize: .5,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>Weclome to vrWorkplace</Text>
                        </View>)
        } else {
            return <View></View>;
        }
    }
    sceneOnLoad() {

        postMessage({type: "sceneLoadStart"})
    }

    sceneOnLoadEnd() {

        postMessage({type: "sceneLoadEnd"})
    }

    render() {

        var hotPoints = this.buildHotpoints();
        var buttons = this.buildButtons();
        var welcome = this.testWelcome();


        return (
            <View>

                <Pano source={asset(this.state.current_workplace.panoImage)} onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd}/>


                {hotPoints}

                {welcome}

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: 2,
                    alignItems: 'stretch',
                    transform: [
                        {
                            translate: this.state.menuCoordinates
                        }
                    ]
                }}>

                    <View style={{
                        margin: 0.3,
                        height: 0.3,
                        backgroundColor: 'transparent'
                    }}>
                        <Text style={{
                            fontSize: 0.2,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>Choose Your Workplace</Text>
                    </View>

                {buttons}

                </View>

            </View>

        );
    }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
