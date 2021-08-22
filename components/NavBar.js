import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default class NavBar extends React.Component {
    render() {
        const {title, navigation} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.openDrawer()}>
                    <View style={styles.bar}></View>
                    <View style={styles.bar}></View>
                    <View style={styles.bar}></View>
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '15%',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    btn: {
        width: "11%",
        height: "60%",
        borderRadius: 50,
        padding:'20%',
        position: 'absolute',
        left:5,
        top:'50%',
        transform: [{translateY: -25}],
        display:'flex',
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginLeft:'5%',

    },
    title:{
        fontSize:45,
        color:'grey'

    },
    bar: {
        width:'70%',
        height: 3,
        backgroundColor: 'grey'
    }
});