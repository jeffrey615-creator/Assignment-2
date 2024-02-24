// CustomTextInput.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../Color';

const CustomTextInput = ({ value, onChangeText, placeholder, keyboardType = 'default', onFocus }) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    placeholder={placeholder}
    style={styles.textInput}
    onFocus={onFocus}
  />
);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    borderColor: colors.darkPurple,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CustomTextInput;
