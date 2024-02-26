import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ActivitiesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';

export default function AllActivities({ navigation }) {
    const { activities } = useActivities();

    // Filter special activities
    const specialActivities = activities.filter(activity => activity.isSpecialActivity);

    // Render function for each item in the list
    const renderActivity = ({ item }) => (
        <ActivitiesList key={item.id} activityObj={item} editFunction={activityPressHandler}/>
    );

    function activityPressHandler(ActivitiesList) {
        navigation.navigate("Edit", {isEditMode: true, data: ActivitiesList });
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={specialActivities}
                renderItem={renderActivity}
                keyExtractor={item => item.id.toString()}
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
