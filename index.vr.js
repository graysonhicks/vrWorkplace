import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    Plane,
    Image
} from 'react-vr';


import Point from './components/point.js';
import Homepage from './components/homepage.js';


export default class vrWorkplace extends React.Component {

    constructor(props) {
        super(props);

         this.lastUpdate = Date.now();

        this.state = {

            displayHomepage: true,
            workplaces: [
                {
                    id: 0,
                    workplace: 'none',
                    panoImage: 'space.jpg'
                }, {
                    id: 1,
                    workplace: 'OFFICE',
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
                    workplace: 'FARM',
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
                    workplace: 'HOTEL',
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
        this.toggleDisplayHomepage = this.toggleDisplayHomepage.bind(this);
        this.testHomepage = this.testHomepage.bind(this);

    }

    componentWillMount() {
        this.setState({current_workplace: this.state.workplaces[0]});

    }
    componentWillUnmount() {

    }
    componentDidMount() {

    }


    toggleDisplayHomepage(){

        this.setState({
            displayHomepage: !this.state.displayHomepage
        })
    }

    onNavigationClick(item, e) {

        var new_workplace = this.state.workplaces.find(i => i['id'] === item.id);

        if(new_workplace != this.state.current_workplace){
            postMessage({
                     type: "sceneChanged"
                 })
        }

        if(this.state.current_workplace.id === 0){
            this.toggleDisplayHomepage();
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

            return (
            <View>
                <Image source={asset('home.png')}
                    style={{
                        width: .5,
                        height: .5,
                        transform: [
                            {translate: [0, .5, -3]}
                        ]
                    }}/>
                {hotPoints}
            </View>

            );
        }
    }

    testHomepage(){
        if(this.state.displayHomepage){
            return(
                <Homepage workplaces={this.state.workplaces} onNavigationClick={this.onNavigationClick} />
            )
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
        var homepage = this.testHomepage();


        return (
            <View>

                <Pano source={asset(this.state.current_workplace.panoImage)} onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd}/>

                {hotPoints}

                {homepage}

            </View>

        );
    }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
