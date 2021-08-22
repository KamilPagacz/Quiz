import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TableRow extends Component {
    render() {
        const { nick, score, type, createdOn } = this.props;
        const date = createdOn.slice(0, 10);
        return (
            <View style={styles.container}>
                <View style={styles.leftTextView}><Text style={styles.txt}>{nick}</Text></View>
                <View style={styles.textView}><Text style={styles.txt}>{score}</Text></View>
                <View style={styles.textView}><Text style={styles.txt}>{type}</Text></View>
                <View style={styles.textView}><Text style={styles.txt}>{date}</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width:'100%',
        height: 70,
    },
    textView: {
      width:'25%',
      height:'100%',
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor:'#457b9d',
      backgroundColor: 'white',
      display:'flex',
      justifyContent: "center",
    },
    leftTextView: {
        width:'25%',
        height:'100%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor:'#457b9d',
        backgroundColor: 'white',
        display:'flex',
        justifyContent: "center",
      },
    txt:{
      color:'#cc5500',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 15,
    }
});