import React from 'react';
import {View,StyleSheet,Text,FlatList,RefreshControl,ToastAndroid} from 'react-native';
import NavBar from '../components/NavBar';
import TableRow from '../components/TableRow';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';

export default class ScoreScren extends React.Component {
    
  state = {
    refreshing: false,
    results: [],
    noInternet: false,
  }

  componentDidMount() {
    this.refreshResults();
    this.checkInternet();
  }

  refreshResults = () => {
    fetch(`http://tgryl.pl/quiz/results`)
      .then(res => res.json())
      .then(results => {
        this.setState({
          ...this.state,
          results: _.reverse(results),
        });
      })
  }

  handleOnRefresh = () => {
    this.setState({
        refreshing: true
    }, () => {
        this.refreshResults();
        this.setState({ refreshing: false});
        ToastAndroid.showWithGravity('Scores are up to date.', ToastAndroid.SHORT, ToastAndroid.TOP);
    })
  }

  checkInternet = () => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (!isConnected) {
        this.setState({
          noInternet: true,
        });
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar title="Scores" navigation={this.props.navigation} />
        <View style={styles.titleBox}>
          <View style={styles.leftText}><Text style={styles.txt}>Nick</Text></View>
          <View style={styles.text}><Text style={styles.txt}>Score</Text></View>
          <View style={styles.text}><Text style={styles.txt}>Category</Text></View>
          <View style={styles.text}><Text style={styles.txt}>Date</Text></View>
        </View>
        {this.state.noInternet && (
          <View style={{paddingTop:20, alignItems:'center'}}>
            <Text style={{color:'red', fontSize:20}}>Couldn't load scoreboard.</Text>
            <Text style={{color:'black', fontSize:18}}>Check your internet connection.</Text>
          </View>
        )}
        <FlatList
          keyExtractor={(item) => {return item.id}}
          data={this.state.results}
          renderItem={({ item }) => (
            <TableRow nick={item.nick}
                      score={item.score + '/' + item.total}
                      type={item.type} 
                      createdOn={item.createdOn}/>
          )}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} 
                            onRefresh={this.handleOnRefresh} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        width:'95%',
        height:'85%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHead: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tableData: {
        width: '100%',
        height: 70,
        display: 'flex',
        justifyContent: 'center',
    },
    titleBox:{
      width:'100%',
      height:70,
      display: 'flex',
      flexDirection: 'row'
    },
    text:{
      width:'25%',
      height:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderLeftWidth:0,
      borderColor:'#014f86',
      backgroundColor:"#faf0ca",
      padding:'2%',
    },
    leftText:{
      width:'25%',
      height:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderColor:'#014f86',
      backgroundColor:"#faf0ca",
      padding:'2%',
    },
    txt:{
      color:'#014f86',
      fontSize:17,
      fontWeight:'bold',
    }
});