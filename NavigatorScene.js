'use strict';

var React = require('react-native');
var {
    Navigator,
    StyleSheet,
    Platform,
    BackAndroid,
} = React;

var NavigatorScene = React.createClass({
    componentDidMount: function(rootNode) {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return hardwareBackAndroid.handle(this.navigator);
        });

    },

    configureScene: function(route, routeStack) {
        let currRoute
        if (routeStack.length>1) {
            currRoute = routeStack[routeStack.length-1];
            console.log('configureScene routeStack', routeStack, currRoute.name)
            if (currRoute.name===Routes.EditScene.name){
                console.log('enter Edit Scene')
                if (Platform.OS === 'ios'){
                    return Navigator.SceneConfigs.FloatFromBottom
                }else{
                    return Navigator.SceneConfigs.FadeAndroid
                }
            }
            if (currRoute.name===Routes.SnippetListScene.name){
                if (Platform.OS === 'ios'){
                    return Navigator.SceneConfigs.FloatFromBottom
                }else{
                    return Navigator.SceneConfigs.FloatFromBottom
                }
            }

        }

        return Navigator.SceneConfigs.FadeAndroid
    },

    render: function() {
        var initialRoute = Routes.InitScene

        return (<Navigator
                ref={(navigator)=>this.navigator=navigator}
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={this.configureScene}
                renderScene={RouteMapper}
                />)
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = NavigatorScene;
