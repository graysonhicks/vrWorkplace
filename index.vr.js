import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Scene
} from 'react-vr';

import Homepage from './components/homepage.js';
import Workplace from './components/workplace.js';
import Panorama from './components/panorama.js';


export default class vrWorkplace extends React.Component {

    constructor(props) {
        super(props);

         this.lastUpdate = Date.now();

        this.state = {
            workplaces: [{
                "id": 0,
                "workplace": "none",
                "panoImage": "space.jpg"
            }, {
                "id": 1,
                "workplace": "OFFICE",
                "buttonColor": "#00aeff",
                "panoImage": "office.jpg",
                "hotPoints": [{
                    "text": "This is a hotpoint!",
                    "translate": [
                        3, 0, -3
                    ],
                    "rotation": [0, -40, 0],
                    "panelOn": false,
                    "index": 0
                }, {
                    "text": "Second hotpoint!",
                    "translate": [
                        3, 0, 3
                    ],
                    "rotation": [0, -120, 0],
                    "panelOn": false,
                    "index": 1
                }, {
                    "text": "Third hotpoint!",
                    "translate": [
                        0, 0, 3
                    ],
                    "rotation": [0, 180, 0],
                    "panelOn": false,
                    "index": 2
                }]
            }, {
                "id": 2,
                "workplace": "FARM",
                "buttonColor": "#9873c1",
                "panoImage": "farm.jpg",
                "hotPoints": [{
                    "text": "This is a hotpoint!",
                    "translate": [
                        1.5, 0, -3.5
                    ],
                    "rotation": [0, -40, 0],
                    "panelOn": false,
                    "index": 0
                }, {
                    "text": "Second hotpoint!",
                    "translate": [
                        3, 0, 3.5
                    ],
                    "rotation": [0, -120, 0],
                    "panelOn": false,
                    "index": 1
                }, {
                    "text": "Third hotpoint!",
                    "translate": [
                        0.5, 0, 3.5
                    ],
                    "rotation": [0, 180, 0],
                    "panelOn": false,
                    "index": 2
                }]
            }, {
                "id": 3,
                "workplace": "HOTEL",
                "buttonColor": "#fe7a9b",
                "panoImage": "hotel.jpg",
                "hotPoints": [{
                    "text": "This is a hotpoint!",
                    "translate": [
                        1.5, 0, -3.5
                    ],
                    "rotation": [0, -40, 0],
                    "panelOn": false,
                    "index": 0
                }, {
                    "text": "Second hotpoint!",
                    "translate": [
                        3, 0, 3.5
                    ],
                    "rotation": [0, -120, 0],
                    "panelOn": false,
                    "index": 1
                }, {
                    "text": "Third hotpoint!",
                    "translate": [
                        0.5, 0, 3.5
                    ],
                    "rotation": [0, 180, 0],
                    "panelOn": false,
                    "index": 2
                }]
            }],
            displayHomepage: true
        };

        this.onNavigationClick = this.onNavigationClick.bind(this);
        this.onHomeLinkClick = this.onHomeLinkClick.bind(this);
        this.fetchWorkplaces = this.fetchWorkplaces.bind(this);

    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }
    componentDidMount() {
        // will switch this on when heroku server is set up
    //    this.state.workplaces.length === 0 ? this.fetchWorkplaces() : console.log('no fetch');
        this.setState({
            current_workplace: this.state.workplaces[0]
        })
    }

    fetchWorkplaces(){

        fetch('/data/workplaces.json')
            .then((res) => {
                return res.json()
            })
                .then((json) => {
                    console.log('parsed json', json);
                    this.setState({
                        workplaces: json,
                        current_workplace: json[0]
                    })
                }).catch((err) => {
                    console.log('fetch failed:', err);
                })
    }

    onNavigationClick(item, e) {

        var new_workplace = this.state.workplaces.find(i => i['id'] === item.id);


        if(new_workplace != this.state.current_workplace){
            postMessage({
                     type: "sceneChanged"
                 })
        }

        this.setState({
            current_workplace: new_workplace,
            displayHomepage: !this.state.displayHomepage
        });

    }

    onHomeLinkClick(){

        var new_workplace = this.state.workplaces[0];

        postMessage({
                 type: "sceneChanged"
             })

        this.setState({
            current_workplace: new_workplace,
            displayHomepage: !this.state.displayHomepage
        });
    }


    sceneOnLoad() {

        postMessage({type: "sceneLoadStart"})
    }

    sceneOnLoadEnd() {

        postMessage({type: "sceneLoadEnd"})
    }

    render() {

        return (

                <View>

                    {this.state.current_workplace ? <Panorama source={this.state.current_workplace.panoImage} sceneOnLoad={this.sceneOnLoad} sceneOnLoadEnd={this.sceneOnLoadEnd}/> : null}

                    {this.state.displayHomepage ?
                        <Homepage workplaces={this.state.workplaces} onNavigationClick={this.onNavigationClick} />
                        :
                        <Workplace current_workplace={this.state.current_workplace} onHomeLinkClick={this.onHomeLinkClick}/>
                    }

                </View>

        );
    }
};

AppRegistry.registerComponent('vrWorkplace', () => vrWorkplace);
