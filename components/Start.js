import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Start() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const isButtonDisabled = email.length === 0 && phoneNumber.length === 0;
  const navigation = useNavigation();

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
      navigation.navigate('Home', {
        screen: 'AllActivities',
      });
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
        {/* Reset Button */}
        <TouchableOpacity 
          onPress={cancelHandler} 
          style={[styles.button, styles.resetButton]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        {/* Start Button */}
        <TouchableOpacity 
          onPress={confirmHandler} 
          style={[styles.button, isButtonDisabled ? styles.disabledButton : styles.enabledButton]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: 'red', 
  },
  enabledButton: {
    backgroundColor: '#6200EE', 
  },
  disabledButton: {
    backgroundColor: '#9E9E9E', 
    color: 'white', 
  },
});
