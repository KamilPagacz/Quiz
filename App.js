import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native'
import { getData, storeData } from "./services/AsyncStorage";
import Regulations from './components/Regulations';
import Home from './screens/HomeScreen';
import Test from './screens/TestScreen';
import Scores from './screens/ScoreScreen';
import SideMenu from './components/SideMenu';

const Drawer = createDrawerNavigator();
const _ = require('lodash');

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenu {...props} />}
      initialRouteName="home">
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="scores" component={Scores} />
      <Drawer.Screen name="test" component={Test} />
    </Drawer.Navigator>
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showRegulations: true,
    }
  }

  componentDidMount() {
    getData('RULES')
      .then(data => data == 'true')
      .then(data => this.setState({ showRegulations: data }));

    fetch(`http://tgryl.pl/quiz/tests`)
      .then(res => res.json())
      .then(quizList => {
        storeData('quizlist', JSON.stringify(quizList));
        quizList.map((item) => {
          let id = item.id;
          fetch(`http://tgryl.pl/quiz/test/${id}`)
            .then(res => res.json())
            .then(quiz => storeData(id, JSON.stringify(quiz)));
        })
      });
  }

  handleAcceptRules = () => {
    storeData('RULES', 'false')
      .then(() => this.setState({ showRegulations: false }));
  }

  render() {
    //storeData('RULES', 'true');
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#4f6d7a" />
        <Regulations visible={this.state.showRegulations} onPress={this.handleAcceptRules} />
        <MyDrawer />
      </NavigationContainer>
    );
  }
}