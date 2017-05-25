import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    Scene
} from 'react-vr';

import Homepage from './components/homepage.js';
import Workplace from './components/workplace.js';


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
                    id: 3,
                    workplace: 'HOTEL',
                    buttonColor: '#fe7a9b',
                    panoImage: 'hotel.jpg',
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
                }
            ]
        };

        this.onNavigationClick = this.onNavigationClick.bind(this);
        this.toggleDisplayHomepage = this.toggleDisplayHomepage.bind(this);
        this.onHomeLinkClick = this.onHomeLinkClick.bind(this);
        this.testHomepageOrWorkplace = this.testHomepageOrWorkplace.bind(this);

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

    onHomeLinkClick(){

        var new_workplace = this.state.workplaces[0];

        postMessage({
                 type: "sceneChanged"
             })

        this.toggleDisplayHomepage();

        this.setState({current_workplace: new_workplace});
    }


    testHomepageOrWorkplace(){
        if(this.state.displayHomepage){
            return(
                <Homepage workplaces={this.state.workplaces} onNavigationClick={this.onNavigationClick} />
            )
        } else {
            return (
                <Workplace current_workplace={this.state.current_workplace} onHomeLinkClick={this.onHomeLinkClick}/>
            );
        }
    }
    sceneOnLoad() {

        postMessage({type: "sceneLoadStart"})
    }

    sceneOnLoadEnd() {

        postMessage({type: "sceneLoadEnd"})
    }

    render() {

        var homepageOrWorkplace = this.testHomepageOrWorkplace();

        return (

                <View>

                    <Pano source={asset(this.state.current_workplace.panoImage)} onLoad={this.sceneOnLoad} onLoadEnd={this.sceneOnLoadEnd}/>

                    {homepageOrWorkplace}

                </View>
        
        );
    }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
