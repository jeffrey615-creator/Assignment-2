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
import ActivitiesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';

export default function AllActivities({ navigation }) {

    const { activities, addActivity } = useActivities();

    const specialActivities = activities.filter(activity => activity.isSpecialActivity);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {specialActivities.map(activityObj => (
                    <ActivitiesList key={activityObj.id} activityObj={activityObj} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
        justifyContent: "center",
    },
    scrollViewContent: {
        alignItems: "center",
        paddingBottom: 20, 
    },
});
