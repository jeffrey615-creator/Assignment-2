import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, SafeAreaView } from 'react-native';


export default function Start({ inputHandler, modalVisible, dismissModal }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  function changeEmailHandler(changedEmail) {
    setEmail(changedEmail);
    if (changedEmail) setEmailError('');
  }

  function changePhoneNumberHandler(changedPhoneNumber) {
    setPhoneNumber(changedPhoneNumber);
    if (changedPhoneNumber) setPhoneNumberError('');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
  }

  function confirmHandler() {
    const isEmailValid = isValidEmail(email);
    const isPhoneNumberValid = isValidPhoneNumber(phoneNumber);
    
    if (isEmailValid && isPhoneNumberValid) {
      inputHandler(email, phoneNumber);
    } else {
      if (!isEmailValid) setEmailError('Invalid Email');
      if (!isPhoneNumberValid) setPhoneNumberError('Invalid Phone Number');
    }
  }

  function cancelHandler() {
    setEmail("");
    setPhoneNumber("");
    setEmailError('');
    setPhoneNumberError('');
    dismissModal && dismissModal();
  }

  return (
      <SafeAreaView style={styles.container}>
        {/* Email Input */}
        <TextInput 
          placeholder="Email"
          style={styles.input} 
          value={email} 
          onChangeText={changeEmailHandler}
        />
        {emailError ? <Text>{emailError}</Text> : null}
        {/* Phone Number Input */}
        <TextInput 
          placeholder="Phone Number"
          style={styles.input} 
          value={phoneNumber} 
          keyboardType="numeric"
          onChangeText={changePhoneNumberHandler}
        />
        {phoneNumberError ? <Text>{phoneNumberError}</Text> : null}
        <View style={styles.buttonsContainer}>
          <Button title="Reset" onPress={cancelHandler} />
          <Button title="Confirm" onPress={confirmHandler} />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "purple",
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
