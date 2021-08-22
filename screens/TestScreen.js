import React from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import { Input } from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import { ScrollView } from 'react-native';
import { getData } from '../services/AsyncStorage';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

export default class TestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: 'Quiz',
      tasks: [],
      tags: [],
      task: {},
      taskIndex: 0,
      points: 0,
      duration: 30,
      loaded: false,
      completed: false,
      nick: '',
      description: 'Opis',
    };
  }

  //online
  getFromServer() {
    const { id } = this.props.route.params;
    fetch(`http://tgryl.pl/quiz/test/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          ...this.state,
          tasks: _.shuffle(data.tasks),
          id: data.id,
          name: data.name,
          tags: data.tags,
          description: data.description,
        });
      })
      .then(() => this.loadTask());
  }

  //offline
  getFromStorage() {
    const { id } = this.props.route.params;
    getData(id)
      .then((data) => JSON.parse(data))
      .then((quiz) => {
        this.setState({
          ...this.state,
          tasks: _.shuffle(quiz.tasks),
          id: quiz.id,
          name: quiz.name,
          tags: quiz.tags,
          description: quiz.description,
        });
      })
      .then(() => this.loadTask());
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

  loadTask = () => {
    let { taskIndex } = this.state;
    if (this.state.tasks.length === taskIndex) {
      this.setState({
        ...this.state,
        completed: true,
        loaded: false,
      });
    } else {
      this.setState({
        ...this.state,
        task: {
          question: this.state.tasks[taskIndex].question,
          answers: _.shuffle(this.state.tasks[taskIndex].answers),
          duration: this.state.tasks[taskIndex].duration,
        },
        duration: this.state.tasks[taskIndex].duration,
        loaded: true,
      });
    }
  };

  markTheAnswer = (id) => {
    const { answers } = this.state.task;
    let { points } = this.state;
    if (answers[id].isCorrect === true) {
      points += 1;
    }
    this.setState(
      {
        ...this.state,
        points,
        loaded: false,
      },
      () => this.handleNextTask()
    );
  };

  handleNextTask = () => {
    let { taskIndex } = this.state;
    taskIndex = taskIndex + 1;
    this.setState(
      {
        ...this.state,
        taskIndex,
      },
      () => {
        this.loadTask();
      }
    );
  };

  handleChange = (nick) => {
    this.setState({
      nick,
    });
  };

  handleSubmit = () => {
    NetInfo.fetch().then(({ isConnected }) => {
      if (isConnected) {
        const { nick, points, tasks, name } = this.state;
        const object = {
          nick: nick,
          score: points,
          total: tasks.length,
          type: name,
        };
        fetch(`http://tgryl.pl/quiz/result`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object),
        });
        ToastAndroid.show('Result submitted!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Couldn\'t submit score. NO INTERNET.', ToastAndroid.SHORT);
      }
    });
    
  };

  scoreboardHandle = () => {
    let { navigation } = this.props;
    navigation.navigate('scores');
  }

  testCompleted(){
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{padding:20}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:24}}>Congrats!</Text>
            <Text>
              Your points: {this.state.points}
            </Text>
            <Text> </Text>
          </View>
          <View style={{paddingLeft:40, paddingRight:40, alignItems:'center'}}>
            <Input
              value={this.state.nick}
              onChangeText={(value) => this.handleChange(value)}
              placeholder={'Your nick'}
              textAlign={'center'}
            />
            <Button
              color='#ECBEB4'
              title={'Submit'}
              onPress={this.handleSubmit} />
          </View>
          <View style={{ paddingLeft: 40, paddingRight: 40, alignItems: 'center' }}>
            <Button
              color='#ECBEB4'
              title={'Check all results'}
              onPress={this.scoreboardHandle}
            />
          </View>
        </View>
      </View>
    );
  }

  renderTestTitle = () => {
    return (
      <View style={styles.textView}>
        <View style={{paddingTop:40, marginBottom:20}}>
          <ScrollView style={{height:55}}>
            <Text style={styles.largeText}>{this.state.tasks[this.state.taskIndex].question}</Text>
          </ScrollView>
        </View>
        <Text style={styles.smallText}>{this.state.description}</Text>
      </View>
    )
  }

  renderTestAnswers = () => {
    return (
      this.state.tasks[this.state.taskIndex].answers.map((answer, key) => {
        return <Button  style={styles.btn} key={key} title={answer.content}
                        onPress={ () => this.markTheAnswer(key) }/>
      })
    );
  }

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavBar title={'Test'} navigation={navigation} />
        {this.state.loaded && !this.state.completed && (
          <>
            <View style={styles.questionAndTime}>
              <Text>Question {this.state.taskIndex + 1} of {this.state.tasks.length}</Text>
              <Text>Time: </Text>
              <CountDown
                key={this.state.taskIndex}
                until={this.state.duration}
                size={14}
                onFinish={this.handleNextTask}
                digitStyle={styles.digitStyles}
                digitTxtStyle={{ color: 'black' }}
                timeToShow={['S']}
                timeLabels={{ s: null }}
              />
            </View>
            <View style={styles.progressBarView}>
              <ProgressBar style={{ width: 340, height: 8 }} progress={this.state.taskIndex/this.state.tasks.length} color={'red'} />
            </View>
            {this.renderTestTitle()}
            <View style={styles.buttonRow}>
              {this.renderTestAnswers()}
            </View>
          </>
        )}
        {this.state.completed && (
          this.testCompleted()
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        display:'flex',
    },
    digitStyles:{
      backgroundColor: '#faf0ca', 
      borderWidth: 2, 
      borderColor: '#ffd791'},
    btn:{
      padding: '2%',
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
    },
    scrollQuestion:{
      marginBottom: 20,
    },
    questionAndTime: {
        width:'100%',
        height:'10%',
        marginTop:'10%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    progressBarView: {
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    textView: {
        width:'100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    largeText: {
        width:'100%',
        textAlign:'center',
        fontSize:20,
    },
    smallText: {
        width:'100%',
        textAlign:'center',
        fontSize:15,
        marginBottom:20
    },
    buttonView:{
      flex: 1,
      flexDirection:'row',
    },
    buttonRow:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
    }
});
