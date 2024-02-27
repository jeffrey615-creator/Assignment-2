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
  const activityData = route.params?.data;

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

  const handleDelete = async () => {
    try {
      await deleteFromDB(activityData.id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPressFunction={showDeleteConfirmation} title="Delete" color="red">
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
