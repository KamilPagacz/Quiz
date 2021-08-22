import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-paper';
import { getData, storeData } from '../services/AsyncStorage';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

export default class SideMenu extends React.Component {
    state = {
        quizList: [],
    };

    //online
    fetchList = () => {
        fetch(`http://tgryl.pl/quiz/tests`)
        .then((data) => data.json())
        .then((quizList) => {
            this.setState({
                ...this.state,
                quizList: _.shuffle(quizList)
            });
        });
    };

    //offline
    fetchListFromStorage = () => {
        getData('quizlist')
        .then((data) => JSON.parse(data))
        .then((quizList) => {
          this.setState({
            ...this.state,
            quizList: _.shuffle(quizList),
          });
        });
    };

    componentDidMount(){
        NetInfo.fetch().then(({ isConnected }) => {
          if (isConnected) {
            this.fetchList();
          } else {
            this.fetchListFromStorage();
          }
        });
      }

    handleClickQuiz = (id) => {
        let { navigation } = this.props;
        navigation.navigate('test', { id });
    };

    renderTests() {
        let tests = this.state.quizList.map(({id, name}, index) => {
          return  <TouchableOpacity style={styles.button2}
                        onPress={() => { this.handleClickQuiz(id) }}
                        key={index} >
                            <Text style={styles.txt}>{name}</Text>
                  </TouchableOpacity>
        });
        return tests;
    }

    pickRandom = () => {
        const { quizList } = this.state;
        let { navigation } = this.props;
        const id = quizList[Math.floor(Math.random()*quizList.length)].id;
        navigation.navigate('test', {id});
      };

    render(){
        const _ = require('lodash');

        return (
            <View style={styles.container}>
                <DrawerContentScrollView {...this.props} style={styles.scrollView}>
                    <Text style={styles.title}>Quiz</Text>
                    <View style={styles.imgView}>
                        <Image style={styles.img} source={require('../assets/quizicon.png')}></Image>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("home")}>
                            <Text style={styles.txt} >Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("scores")}>
                            <Text style={styles.txt}>Scores</Text>
                        </TouchableOpacity>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.pickRandom()}}>
                            <Text style={styles.txt} >Pick random test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {this.fetchList()}}>
                            <Text style={styles.txt} >Refresh list</Text>
                        </TouchableOpacity>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSectionLower}>
                        {this.renderTests()}
                    </Drawer.Section>
                </DrawerContentScrollView>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    scrollView: {
        width: '100%'
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width: '80%',
        alignSelf: 'center',
    },
    imgView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    img: {
        marginTop: '5%',
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        width: 150,
        height: 38,
        backgroundColor: '#f5b342',
        marginTop: 15,
        textAlignVertical: 'center',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    button2: {
        width: 190,
        height: 48,
        backgroundColor: '#f5b342',
        marginTop: 15,
        textAlignVertical: 'center',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    txt: {
        color: '#f8f9fa',
        textAlign: 'center',
    },
    drawerSection: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 15,
        alignSelf: 'center',
    },
    drawerSectionLower: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});