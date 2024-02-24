// DatePickerComponent.js
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { colors } from '../Color';

const DatePickerComponent = ({ date, onChange, isPickerShow }) => (
  <>
    {isPickerShow && (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
        style={styles.datePicker}
      />
    )}
  </>
);

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: colors.darkPurple,
  },
});

export default DatePickerComponent;
