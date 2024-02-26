import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ActivitesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';
import { database } from '../firebase-files/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import PressableButton from '../components/PressableButton';

export default function AllActivities({ navigation }) {

    const { updateActivities } = useActivities();

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(database, "activities"), (querySnapshot) => {
        const newActivities = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        updateActivities(newActivities);
      });
  
      return () => unsubscribe();
    }, []);

    const { activities } = useActivities();

    const renderItem = ({ item }) => (
        <ActivitesList key={item.id} activityObj={item} editFunction={activityPressHandler}/>
    );

    function activityPressHandler(ActivitiesList) {
        navigation.navigate("Edit", {isEditMode: true, data: ActivitiesList });
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={activities}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
        justifyContent: "center",
    },
    flatListContent: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
