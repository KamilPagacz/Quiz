import React from 'react';
import{TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class Button extends React.Component {
    render() {
        const {title} = this.props;
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress} >
                <Text style={styles.txt}>{title}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    button:{
      borderWidth: 1,
      borderRadius: 5,
      width:'80%',
      display:'flex',
      justifyContent: 'center',
      backgroundColor: '#ffce7a',
      borderColor:'#f5b342',
      margin: '1%',
      marginBottom: 6,
    },
    txt:{
      textAlign:'center',
      padding: '3%',
      fontSize: 14,
    }
})