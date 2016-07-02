'use strict';

var React = require('react-native');
var {
        Image,
        ListView,
        TouchableHighlight,
        StyleSheet,
        RecyclerViewBackedScrollView,
        BackAndroid,
        Text,
        View,
        } = React;


var TrophyListView = React.createClass({
    statics: {
        title: 'Trophy',
        description: 'Performant, scrollable list of data.'
    },




    componentDidMount : function() {
        var self = this;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            self.props.navigator.pop();
            return true;
        });

        this.fetchData();
    },
    fetchData : function() {
        fetch('http://semidream.com/trophydetail/' + url.replace('http://d7vg.com/psngame/',''))
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

        url= this.props.url;
        return {
            dataSource : new ListView.DataSource({
                rowHasChanged : (row1, row2) => row1 !== row2
            }),
            loaded : false,
        }
    },


render: function() {
    return (

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={this._renderSeperator}
                />
    );
},

_renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    return (
        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
            <View>
                <View style={styles.row}>
                    <Image style={styles.thumb} source={{uri:rowData.picUrl}} />
                    <Text style={styles.text}>
                        {rowData.title }{"\n"}{rowData.desc}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
},

    _renderSeperator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
                />
        );
    }


});
var url;

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
        width: 54,
        height: 54,
        margin:5,
    },
    text: {
        margin:5,
        flex: 1,
    },
});

module.exports = TrophyListView;
