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
        fetch('http://semidream.com/trophydata')
            .then((response) => response.json())
            .then((responseData) => {
                remoteData = remoteData.concat(responseData);
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(remoteData),
                    loaded : true,
                });
            })
            .done();
    },

    fetchNext: function() {
        let page = parseInt(this.state.dataSource.getRowCount() / 20) + 1;
        this.state.dataSource
        console.log(page);
        fetch('http://semidream.com/trophydata/' + page)
            .then((response) => response.json())
            .then((responseData) => {
                remoteData = remoteData.concat(responseData);
                this.setState({
                    dataSource : this.state.dataSource.cloneWithRows(remoteData),
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

    _pressRow: function(rowID: number) {
        console.log(rowID);
    },

render: function() {
    return (

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                onEndReached={this.fetchNext}
                onEndReachedThreshold={20}
                />
    );
},

_renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    return (
        <TouchableHighlight onPress={() => this.pressRow(rowID)}>
            <View>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={{uri:rowData.picUrl}} />
                    <Text style={styles.text}>
                        {rowData.title }
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
},


pressRow: function(rowID: number) {
    console.log(remoteData[rowID].url);
    this.props.navigator.push({

        name: 'detail',
        url: remoteData[rowID].url
    });
},
});

var remoteData = [];

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
        padding: 5,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 100,
        height: 55,
        margin:5,
    },
    text: {
        margin:5,
        flex: 1,
    },
});

module.exports = ListViewSimpleExample;
