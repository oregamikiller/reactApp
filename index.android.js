/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var ListScence = require('./ListViewSimpleExample');


class reactApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎使用
                </Text>
                <ListScence />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

AppRegistry.registerComponent('reactApp', () => reactApp);
