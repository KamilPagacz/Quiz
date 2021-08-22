import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Akronim_400Regular, useFonts } from '@expo-google-fonts/akronim';
import { Allura_400Regular } from '@expo-google-fonts/allura';

export default function Regulations(props) {
  let [fontsLoaded] = useFonts({
    Akronim_400Regular,
    Allura_400Regular,
  });
  
  if (!fontsLoaded) {
      return <View/>;
  }
  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={styles.modalView}>
        <View style={styles.regulationBox}>
          <Text style={styles.header}>RULES</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
          <Text style={styles.headerText}>regulamin regulamin regulamin</Text>
        </View>
        <TouchableOpacity style={styles.openButton} onPress={props.onPress}>
          <Text style={styles.buttonText}>ACCEPT</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#eaeaea',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    color: '#5B72EC',
  },
  header: {
    paddingTop: 48,
    fontSize: 48,
    textAlign: 'center',
    color: '#444444',
    paddingBottom: 64,
    fontFamily:'Akronim_400Regular',
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333333',
    paddingBottom: 4,
    fontFamily:'Allura_400Regular',
  },
  regulationBox: {
    paddingBottom: 64,
  },
  openButton: {
    bottom: 0,
    backgroundColor: '#f0d070',
    color: '#000000',
    borderRadius: 25,
    padding: 25,
    marginTop: 25,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    letterSpacing: 3,
  },
});
