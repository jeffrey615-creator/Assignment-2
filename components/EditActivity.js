import React from 'react';
import { View, Button, Alert } from 'react-native';
import AddActivity from '../Screens/AddActivity';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteFromDB } from '../firebase-files/firestoreHelper';

export default function EditActivity() {
  const navigation = useNavigation();
  const route = useRoute();
  const activityData = route.params?.data;

  const showDeleteConfirmation = () => {
    Alert.alert(
      "Delete Activity", // Alert Title
      "Are you sure you want to delete this activity?", // My Alert Msg
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

  const handleDelete = async () => {
    try {
      await deleteFromDB(activityData.id);
      Alert.alert("Activity Deleted", "The activity has been successfully deleted.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "There was an issue deleting the activity.");
      console.error(error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={showDeleteConfirmation} title="Delete" color="red" />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <AddActivity route={{ ...route, params: { ...route.params, initialValues: activityData } }} />
    </View>
  );
}
