import React from 'react';
import { View, Alert } from 'react-native';
import AddActivity from '../Screens/AddActivity';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteFromDB } from '../firebase-files/firestoreHelper';
import PressableButton from './PressableButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../Color';

export default function EditActivity() {
  const navigation = useNavigation();
  const route = useRoute();
  const activityData = route.params?.data; // Extracting activity data passed through route parameters

  // Shows a confirmation dialog before deleting an activity
  const showDeleteConfirmation = () => {
    Alert.alert(
      "Delete", 
      "Are you sure you want to delete this activity?", 
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleDelete() }
      ],
      { cancelable: false }
    );
  };

  // Handles the deletion of an activity
  const handleDelete = async () => {
    try {
      await deleteFromDB(activityData.id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Use layout effect to customize the navigation header on this screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // Display a custom PressableButton in the header for deleting the activity
        <PressableButton onPressFunction={showDeleteConfirmation} title="Delete">
            <Icon name="delete" size={24} color="white" backgroundColor={colors.darkPurple} />
        </PressableButton> 
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <AddActivity route={{ ...route, params: { ...route.params, initialValues: activityData } }} />
    </View>
  );
}
