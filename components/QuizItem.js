import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class QuizItem extends React.Component {
    constructor(){
      super();
    }

    getTags = (tags) => {
        return (
            <View style={styles.row}>
                {tags.map( (tag, key) => {
                    return <Text key={key} style={styles.tags}>{tag}</Text>
                })}
            </View>
        );
    }

    render() {
        const {title, tags, content, navigation, id} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={ () => { navigation.navigate('test', {id}) }}>
                    <Text style={styles.title}>{title}</Text>
                      {this.getTags(tags)}
                    <Text style={styles.content}>{content}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    row:{
      flex:1,
      flexDirection:'row',
    },
    container: {
        width: 350,
        borderWidth: 2,
        borderColor: '#ffd791',
        borderRadius: 15,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        marginTop: '10%',
        padding: '5%',
        backgroundColor:'#faf0ca',
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
    },
    tags:{
        color:'blue',
        textDecorationLine: 'underline',
        fontSize:12,
        marginTop:'2%',
        paddingRight: '5%',
    },
    content:{
        fontSize:15,
        marginTop:'2%',
    }
});
