import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ActivitesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';

export default function AllActivities({ navigation }) {
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
        paddingBottom: 20,
    },
});
