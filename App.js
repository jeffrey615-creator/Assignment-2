import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header';
import Start from './components/Start'; // Make sure the path is correct

export default function App() {
  const appName = "My awesome app";
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Updated to handle both email and phone number input
  function receiveInput(emailInput, phoneNumberInput) {
    console.log("Received email:", emailInput, "and phone number:", phoneNumberInput);
    setEmail(emailInput);
    setPhoneNumber(phoneNumberInput);
    setIsModalVisible(false);
  }
  
  function dismissModal() {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} version={2}/>
    
      <Start
          inputHandler={receiveInput}
          //modalVisible={isModalVisible}
          //dismissModal={dismissModal}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
