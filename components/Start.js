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

        <Text style={styles.text}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={changeEmailHandler}
        />
        {emailError ? <Text>{emailError}</Text> : null}

        {/* Phone Number Input */}
        <Text style={styles.text}>Phone Number</Text>
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
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        {/* Start Button */}
        <TouchableOpacity 
          onPress={confirmHandler} 
          style={styles.button}
          disabled={isButtonDisabled}
        >
          <Text style={[styles.buttonText, isButtonDisabled ? styles.disabledText : styles.enabledText]}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C193F2', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16, 
  },
  text: {
    color: '#5611A1', 
    fontSize: 16, 
    alignSelf: 'flex-start', 
    marginLeft: 20, 
  },
  input: {
    backgroundColor: '#C193F2',
    borderWidth: 2,
    borderColor: "#5611A1",
    borderRadius: 5,
    padding: 10,
    margin:10,
    width:'90%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '90%', 
    marginTop: 20,
  },
  button: {
    flex: 1, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 50,
  },
  resetText: {
    color: '#D04848', 
    fontSize: 16,
  },
  enabledText: {
    color: '#6200EE',
  },
  disabledText: {
    color: 'white',
    fontSize: 16,
  },
});
