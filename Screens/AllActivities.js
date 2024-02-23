import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ActivitesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';
import { database } from '../firebase-files/firebaseSetup';

export default function AllActivities({ navigation }) {
    console.log(database);
    const { activities } = useActivities();

    const renderItem = ({ item }) => (
        <ActivitesList key={item.id} activityObj={item} />
    );

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
        alignItems: "center",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
