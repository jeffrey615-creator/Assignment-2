import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View, Platform, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActivities } from '../ActivityContext';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const handleFocus = () => {
    setIsPickerShow(true); // Display the DateTimePicker when TextInput is focused
  };

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate); // Update the date
    setFormattedDate(currentDate.toDateString()); // Format and update the date string
    setIsPickerShow(false); // Optionally hide the picker after selection
  };

  const handleAddActivity = () => {
    if (!activityType || duration <= 0 || isNaN(duration)) {
      Alert.alert("Invalid input", "Please ensure all fields are filled out correctly, and duration is a positive number.");
      return;
    }

  function checkSpecialActivity(activityType, duration) {
      // Check if the activity type is either Running or Weights and the duration is more than 60 minutes
      return (activityType === 'Running' || activityType === 'Weights') && duration > 60;
    }

    const newActivity = {
      id: Math.random(),
      type: activityType,
      duration: Number(duration), // Ensure duration is stored as a number
      date: formattedDate, // Store date in ISO format
      isSpecialActivity: checkSpecialActivity(activityType, duration),
    };

    addActivity(newActivity);
    navigation.goBack(); // Navigate back after adding activity
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
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
        zIndex={3000}
        zIndexInverse={1000}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        textStyle={styles.textStyle}
        labelStyle={styles.labelStyle}
      />
      <Text style={styles.label}>Duration (min) *</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Duration in minutes"
        style={styles.duration}
      />
      
      <Text style={styles.label}>Date *</Text>
      <TextInput
        placeholder="Tap here to pick a date"
        onFocus={handleFocus} // Trigger inline DateTimePicker on focus
        style={styles.textInput}
        value={formattedDate}
      />
      {isPickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="inline" 
          onChange={handleChange}
          style={styles.datePicker}
        />
      )}
  
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Save"
          onPress={handleAddActivity}
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
    backgroundColor:"#C193F2",
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  label: {
    color: '#5611A1',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  duration: {
    backgroundColor: '#C193F2',
    borderWidth: 2,
    borderColor: "#5611A1",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: '#C193F2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    borderColor: "#5611A1",
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginLeft: 10,
  },
  placeholderStyle: {
    color: '#5611A1',
  },
  textStyle: {
    color: '#000',
  },
  labelStyle: {
    color: '#000',
  },
  datePicker: {
    marginBottom: 20,
    backgroundColor: '#C193F2',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: "#5611A1",
  },
  textInput:{
    marginBottom: 20,
    backgroundColor: '#C193F2',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: "#5611A1",
    padding:10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});
