'use strict';

var React = require('react-native');
var {
    Navigator,
    StyleSheet,
    Platform,
    BackAndroid,
} = React;

var Routes = require('./Routes');
var ListScence = require('./ListViewSimpleExample');
var TrophyListView = require('./TrophyListView');

var NavigatorScene = React.createClass({
    componentDidMount: function(rootNode) {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return hardwareBackAndroid.handle(this.navigator);
        });

    },

    renderScene: function (route, navigator) {
            if (route && route.name =='detail') {return <TrophyListView url={route.url} />}
            return ( <ListScence navigator={navigator} /> );
    },

render: function() {
        var initialRoute = Routes.InitScene;

        return (<Navigator
                ref={(navigator)=>this.navigator=navigator}
                style={styles.container}
                initialRoute={initialRoute}
                renderScene={this.renderScene}
                navigator={navigator} />)
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = NavigatorScene;
