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
import Button from './components/button.js';
import InfoPanel from './components/infopanel.js';


const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = 0.05;

export default class vrWorkplace extends React.Component {

    constructor(props) {
        super(props);

         this.lastUpdate = Date.now();

        this.state = {
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS,
            hoverRotation: 0,
            workplaces: [
                {
                    id: 0,
                    workplace: 'none',
                    panoImage: 'chess-world.jpg'
                }, {
                    id: 1,
                    workplace: 'office',
                    buttonColor: '#00aeff',
                    panoImage: 'office.jpg',
                    hotPoints: [
                        {
                            text: "This is a hotpoint!",
                            translate: [
                                0.5, -0.03, -1
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                0.5, 0, 1
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 0, 4
                            ],
                            rotation: [0, 0, 0]
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
                                0.5, 1, 2
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                0.5, .5, -3
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 1, 1
                            ],
                            rotation: [0, 0, 0]
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
                                0.5, 0.05, -0.9
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Second hotpoint!",
                            translate: [
                                0.5, 0, 1
                            ],
                            rotation: [0, 0, 0]
                        }, {
                            text: "Third hotpoint!",
                            translate: [
                                0.5, 0, 3
                            ],
                            rotation: [0, 0, 0]
                        }
                    ]
                }
            ]
        };

        this.onNavigationClick = this.onNavigationClick.bind(this);
        this.animateHotPoint = this.animateHotPoint.bind(this);
        this.hotPointEnter = this.hotPointEnter.bind(this);
        this.hotPointExit = this.hotPointExit.bind(this);
    }

    componentWillMount() {
        this.setState({current_workplace: this.state.workplaces[0]});

    }
    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }
    componentDidMount() {
        this.animateHotPoint();
    }

    animateHotPoint() {
        var delta = this.state.animationWidth + 0.002;
        var radius = this.state.animationRadius + 10;
        if (delta >= 0.13) {
            delta = DEFAULT_ANIMATION_BUTTON_SIZE;
            radius = DEFAULT_ANIMATION_BUTTON_RADIUS;
        }
        this.setState({animationWidth: delta, animationRadius: radius})
        this.frameHandle = requestAnimationFrame(this.animateHotPoint);
    }


    hotPointEnter(e, item){
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;
        this.setState({ hoverRotation: this.state.hoverRotation + delta / 2 });

        this.frameHandle = requestAnimationFrame(this.hotPointEnter);


    }

    hotPointExit(e, item){

        this.setState({hoverRotation: 0});
        //this.frameHandle = requestAnimationFrame(this.hotPointExit);
    }
    onNavigationClick(item, e) {

        var new_workplace = this.state.workplaces.find(i => i['id'] === item.id);

        this.setState({current_workplace: new_workplace});

    }
    buildHotpoints() {
        var that = this;

        if (this.state.current_workplace.id !== 0) {
            var hotPoints = this.state.current_workplace['hotPoints'].map(function(item, i) {

                return <Point
                    key={i}
                    item={item}
                    hotPointEnter={that.hotPointEnter}
                    hotPointExit={that.hotPointExit}
                    hoverRotation={that.state.hoverRotation}
                    animationWidth={that.state.animationWidth}
                    animationRadius={that.state.animationRadius}
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
    sceneOnLoad() {

        postMessage({type: "sceneLoadStart"})
    }

    sceneOnLoadEnd() {

        postMessage({type: "sceneLoadEnd"})
    }

    render() {

        var hotPoints = this.buildHotpoints();
        var buttons = this.buildButtons();

        return (
            <View>

                <Pano source={asset(this.state.current_workplace.panoImage)} onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd}/>

                {hotPoints}

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: 2,
                    alignItems: 'stretch',
                    transform: [
                        {
                            translate: [-1, 2, -5]
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
