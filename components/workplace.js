import React, { Component } from 'react';
import { AppRegistry, View, asset } from 'react-vr';

import HomeLink from './homelink.js';
import Point from './point.js';

export default class Workplace extends Component {
    constructor(props) {
        super();

    }
    buildHotpoints() {
        var that = this;

        if (this.props.current_workplace.id !== 0) {
            var hotPoints = this.props.current_workplace['hotPoints'].map(function(item, i) {

                return <Point
                    key={i}
                    item={item}
                    currentWorkplace={that.props.current_workplace}

                    />
            });

            return hotPoints;
        }
    }

  render() {

    var hotPoints = this.buildHotpoints();

        return (
        <View>
            <HomeLink onHomeLinkClick={this.props.onHomeLinkClick} />
            {hotPoints}
        </View>

        );
  }
}

AppRegistry.registerComponent('Workplace', () => Workplace);
