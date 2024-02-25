import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../Color';
import PressableButton from '../components/PressableButton';


export default function Start() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  // Determine if the button should be disabled
  const isButtonDisabled = email.length === 0 && phoneNumber.length === 0;
  const navigation = useNavigation();

  // Function to handle email input changes
  function changeEmailHandler(changedEmail) {
    setEmail(changedEmail);
    if (changedEmail) setEmailError('');
  }

  // Function to handle phone number input changes
  function changePhoneNumberHandler(changedPhoneNumber) {
    setPhoneNumber(changedPhoneNumber);
    if (changedPhoneNumber) setPhoneNumberError('');
  }

  // Function to validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Function to validate phone number format
  function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
  }

  // Function to handle start button press
  function confirmHandler() {
    const isEmailValid = isValidEmail(email);
    const isPhoneNumberValid = isValidPhoneNumber(phoneNumber);
    
    if (isEmailValid && isPhoneNumberValid) {
      // Navigate to the Home screen
      navigation.navigate('Home', {
        screen: 'AllActivities',
      });
    } else {
      // Display error messages if email or phone number is invalid
      if (!isEmailValid) setEmailError('Please enter a valid email address');
      if (!isPhoneNumberValid) setPhoneNumberError('Please enter a valid phone number');
    }

  }

  // Function to handle reset button press
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
        <PressableButton 
          onPressFunction={cancelHandler} 
          customStyle={[styles.button, styles.resetButton]}
        >
          <Text style={styles.resetText}>Reset</Text>
        </PressableButton>
        
        {/* Start Button */}
        <PressableButton 
          onPressFunction={confirmHandler} 
          customStyle={styles.button}
          customDisabledStyle={isButtonDisabled ? styles.disabledButton : {}}
          disabled={isButtonDisabled}
        >
          <Text style={[styles.buttonText, isButtonDisabled ? styles.disabledText : styles.enabledText]}>Start</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPurple, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16, 
  },
  text: {
    color: colors.darkPurple, 
    fontSize: 16, 
    alignSelf: 'flex-start', 
    marginLeft: 20, 
  },
  input: {
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    borderColor: colors.darkPurple,
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
    color: colors.red,
    fontSize: 16,
  },
  enabledText: {
    color: colors.darkPurple,
    fontSize: 16,
  },
  disabledText: {
    color: 'white',
    fontSize: 16,
  },
});
