'use strict';

var React = require('react-native');
var {
        Image,
        ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        Text,
        View,
        } = React;


var ListViewSimpleExample = React.createClass({
    statics: {
        title: '<ListView>',
        description: 'Performant, scrollable list of data.'
    },

    componentDidMount : function() {
        this.fetchData();
    },
    fetchData : function() {
        fetch('http://semidream.com/data')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(responseData),
                    loaded : true,
                });
            })
            .done();
    },
    getInitialState : function() {
        return {
            dataSource : new ListView.DataSource({
                rowHasChanged : (row1, row2) => row1 !== row2
            }),
            loaded : false,
        }
    },

    _pressData: ({}: {[key: number]: boolean}),

render: function() {
    return (

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                onEndReached={this.fetchData}
                onEndReachedThreshold={20}
                />
    );
},

_renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    console.log(rowData);
    return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)}>
            <View>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={{uri:rowData.pic_url}} />
                    <Text style={styles.text}>
                        {rowData.title + ' - ' + rowData.abstract}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
},

_genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
        var pressedText = pressData[ii] ? ' (pressed)' : '';
        dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
},

_pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.(
        this._genRows(this._pressData)
    )});
},
});

var THUMB_URLS = [
];
var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 100,
        height: 100,
        margin:5,
    },
    text: {
        flex: 1,
    },
});

module.exports = ListViewSimpleExample;
