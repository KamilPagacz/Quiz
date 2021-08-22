import {SafeAreaView,StyleSheet,ScrollView,View,Text,TouchableOpacity} from 'react-native';
import React from 'react';
import NavBar from '../components/NavBar';
import Test from '../components/QuizItem';
import _ from 'lodash';
import { getData } from '../services/AsyncStorage';
import NetInfo from '@react-native-community/netinfo';

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = ({
      tests: []
    })
  }

  //online
  getFromServer() {
    fetch(`http://tgryl.pl/quiz/tests`)
        .then((data) => data.json())
        .then((quizList) => {
            this.setState({
                ...this.state,
                tests: _.shuffle(quizList)
            });
        });
  }
  
  //offline
  getFromStorage() {
    getData('quizlist')
        .then((data) => JSON.parse(data))
        .then((quizList) => {
            this.setState({
                ...this.state,
                tests: _.shuffle(quizList)
            });
        });
  }

  componentDidMount(){
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        this.getFromServer();
      } else {
        this.getFromStorage();
      }
    });
  }

  handleClick = (id) => {
    let {navigation} = this.props;
    navigation.navigate('test', {id});
  }

  renderTests() {
    let tests = this.state.tests.map((test, key) => {
      return  <Test key={key} 
                    title={test.name}
                    tags={test.tags} 
                    content={test.description} 
                    navigation={this.props.navigation}
                    id={test.id}>
              </Test>
    });
    return tests;
  }

  render() {
    return (
      <View style={styles.container} >
        <NavBar title="Home" navigation={this.props.navigation} />
        <SafeAreaView style={styles.testView}>
          <ScrollView>
            <View style={styles.scrollView}>
              {this.renderTests()}
              <View style={styles.resultView}>
                <Text style={styles.text}>Check your score!</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('scores') }}>
                    <Text style={styles.btnText}>Check</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      height: '100%',
      backgroundColor:"white",
    },
    testView:{
      width:'100%',
      height:'85%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'visible'
    },
    resultView:{
      marginTop:'10%',
      backgroundColor:'#89c2d9',
      width:350,
      alignItems: 'center',
      paddingLeft:'14%',
      paddingRight:'14%',
      paddingTop:'5%',
      paddingBottom:'5%',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#2c7da0',
    },
    scrollView: {
      width:'100%',
      height:'100%',
      display:'flex',
      alignItems: 'center'
    },
    row:{
      flex: 1,
      flexDirection: 'row',
    },
    button:{
      backgroundColor:'#faf0ca',
      borderRadius: 15,
      width:'40%',
      height:40,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop: '4%',
      padding: '5%',
      margin: '4%',
    },
    btnText:{
      color: '#014f86',
    },
    text:{
      fontSize:22,
      textAlign:'center',
      color:'#014f86',
      paddingBottom: 10,
    }
  });
