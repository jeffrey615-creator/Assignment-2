import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActivities } from '../ActivityContext';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../Color';
import { writeToDB, updateInDB } from '../firebase-files/firestoreHelper';
import Checkbox from 'expo-checkbox';
import PressableButton from '../components/PressableButton';

export default function AddActivity({route}) {
  const initialValues = route.params?.initialValues;
  const isEditMode = !!route.params?.initialValues;   
  console.log(initialValues);
  console.log(date);
  console.log(formattedDate);

  const [activityType, setActivityType] = useState(initialValues?.type || null);
  const [duration, setDuration] = useState(initialValues?.duration || '');
  const [date, setDate] = useState(initialValues?.date ? new Date(initialValues.date) : new Date());
  const [isSelected, setSelection] = useState(initialValues?.isSpecialActivity || false);
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
  const [formattedDate, setFormattedDate] = useState(''); 

  const { addActivity } = useActivities();
  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues?.date) {
      const initialDate = new Date(initialValues.date);
      setDate(initialDate);
      setFormattedDate(initialDate.toDateString()); // Format the date to a readable string
    } else {
      setFormattedDate(''); // Reset or set to current date if you prefer
    }
  }, [initialValues?.date]);

  // Display the DateTimePicker when TextInput is focused
  const handleOpenPicker = () => {
    if (!date) setDate(new Date()); // Set an initial date if none is selected
    setIsPickerShow(true);
  };

  // Update the date and hide the picker after selection
  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate); // Update the date
    setFormattedDate(currentDate.toDateString()); // Format and update the date string
    setIsPickerShow(false); // Hide the picker after selection
  };

  const showUpdateConfirmation = () => {
    Alert.alert(
      "Important", 
      "Are you sure you want to save these change?", 
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleAddActivity() }
      ],
      { cancelable: false }
    );
  };
  // Function to add activity
  const handleAddActivity = async () => {
    if (!activityType || duration <= 0 || isNaN(duration)) {
      Alert.alert("Invalid input", "Please ensure all fields are filled out correctly, and duration is a positive number.");
      return;
    }

  // Function to check if the activity is special (e.g., Running or Weights for more than 60 minutes)
  function checkSpecialActivity(activityType, duration) {
      return (activityType === 'Running' || activityType === 'Weights') && duration > 60;
    }

    const isSpecialActivity = checkSpecialActivity(activityType, Number(duration));

    // Create a new activity object
    const newActivity = {
      type: activityType,
      duration: Number(duration), // Ensure duration is stored as a number
      date: formattedDate, // Store date in ISO format
      isSpecialActivity: isEditMode ? isSelected : isSpecialActivity,
    };

    try {
      if (isEditMode) {
        // Update existing activity
        await updateInDB(route.params.data.id, newActivity);
        Alert.alert("Success", "Activity updated successfully.");
      } else {
        // Add new activity
        await writeToDB(newActivity);
        Alert.alert("Success", "Activity added successfully.");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "An error occurred while processing your request.");
      console.error(error);
    }
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
        value={duration.toString()}
        onChangeText={text => setDuration(text)}
        keyboardType="numeric"
        placeholder="Duration in minutes"
        style={styles.duration}
        zIndex={3000}
      />
      {/* Date Input */}
      <Text style={styles.label}>Date *</Text>
      <TextInput
        placeholder="Tap here to pick a date"
        style={styles.textInput}
        value={formattedDate}
        editable={false} 
        onTouchStart={handleOpenPicker} 
      />
      {/* DateTimePicker (hidden by default) */}
      {isPickerShow && date && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="inline"  
          onChange={handleChange}
        />
      )}
      {/* DateTimePicker (hidden by default) */}

      </View>
      {
        isEditMode && initialValues?.isSpecialActivity && (
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>This item is marked as special. Select the checkbox if you would like to approve it</Text>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
          </View>
        )
      }
      {
        !isPickerShow && ( // Only render the button container if isPickerShow is false
          <View style={styles.buttonContainer}>
            <PressableButton
              onPressFunction={() => navigation.goBack()}
              customStyle={styles.cancelButton} 
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </PressableButton>
            <PressableButton
              onPressFunction={isEditMode ? showUpdateConfirmation : handleAddActivity}
              customStyle={styles.saveButton} 
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </PressableButton>
          </View>  
        )
      }
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
    justifyContent: 'flex-Start',
    marginTop:50,
    padding:10,
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
    //padding: 5,
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
    paddingBottom: 80,
  },
  checkboxContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor:colors.red,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor:colors.darkPurple,
  },
  saveButtonText: {
    color: colors.white, 
    fontSize: 16,
  },
  cancelButtonText:{
    color: colors.white, 
    fontSize: 16, 
  },
});
