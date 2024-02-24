import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View, Platform, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActivities } from '../ActivityContext';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../Color';
import { writeToDB } from '../firebase-files/firestoreHelper';

export default function AddActivity() {
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false); // Control dropdown open state
  const [items, setItems] = useState([ // Dropdown items
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(date.toDateString()); 

  const { addActivity } = useActivities();
  const navigation = useNavigation();

  // Display the DateTimePicker when TextInput is focused
  const handleFocus = () => {
    setIsPickerShow(true); 
  };

  // Update the date and hide the picker after selection
  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate); // Update the date
    setFormattedDate(currentDate.toDateString()); // Format and update the date string
    setIsPickerShow(false); // Optionally hide the picker after selection
  };

  // Function to add activity
  const handleAddActivity = () => {
    if (!activityType || duration <= 0 || isNaN(duration)) {
      Alert.alert("Invalid input", "Please ensure all fields are filled out correctly, and duration is a positive number.");
      return;
    }

  // Function to check if the activity is special (e.g., Running or Weights for more than 60 minutes)
  function checkSpecialActivity(activityType, duration) {
      return (activityType === 'Running' || activityType === 'Weights') && duration > 60;
    }

    // Create a new activity object
    const newActivity = {
      type: activityType,
      duration: Number(duration), // Ensure duration is stored as a number
      date: formattedDate, // Store date in ISO format
      isSpecialActivity: checkSpecialActivity(activityType, duration),
    };

    // Add the new activity and navigate back
    writeToDB(newActivity);
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Activity Type Dropdown */}
        <Text style={styles.label}>Activity *</Text>
        <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity type"
        containerStyle={styles.dropdown}
        zIndex={5000}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        textStyle={styles.textStyle}
        labelStyle={styles.labelStyle}
      />
      {/* Duration Input */}
      <Text style={styles.label}>Duration (min) *</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Duration in minutes"
        style={styles.duration}
        zIndex={3000}
      />
      {/* Date Input */}
      <Text style={styles.label}>Date *</Text>
      <TextInput
        placeholder="Tap here to pick a date"
        onFocus={handleFocus} 
        style={styles.textInput}
        value={formattedDate}
        zIndex={2000}
      />
      {/* DateTimePicker (hidden by default) */}
      {isPickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="inline" 
          onChange={handleChange}
          style={styles.datePicker}
          zIndex={2000}
        />
      )}
      {/* DateTimePicker (hidden by default) */}
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          color={colors.red}
        />
        <Button
          title="Save"
          onPress={handleAddActivity}
          color={colors.darkPurple}
        />
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:colors.lightPurple,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: colors.darkPurple,
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  duration: {
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    borderColor: colors.darkPurple,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: colors.lightPurple,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    borderColor: colors.darkPurple,
    elevation: 20,
    overflow:"visible",
    zIndex: 5000,
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 10,
    elevation: 20,
    overflow:"visible",
    zIndex: 5000,
  },
  placeholderStyle: {
    color: colors.darkPurple,
  },
  textStyle: {
    color: colors.black,
  },
  labelStyle: {
    color: colors.black,
  },
  datePicker: {
    marginBottom: 20,
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: colors.darkPurple,
  },
  textInput:{
    marginBottom: 20,
    backgroundColor: colors.lightPurple,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: colors.darkPurple,
    padding:10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
});
