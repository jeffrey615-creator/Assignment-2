import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState, useLayoutEffect, useEffect} from "react";
import ActivitesList from "./ActivitiesList";
import { useActivities } from "../ActivityContext";



export default function AllActivities({ navigation }) {

    const { activities, addActivity } = useActivities();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddActivity')}
                    title="Add"
                />
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {activities.map((activityObj) => (
                    <ActivitesList key={activityObj.id} activityObj={activityObj} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
    },
    scrollViewContent: {
        alignItems: "center",
        paddingBottom: 20, 
    },
});
