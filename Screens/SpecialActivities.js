import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import ActivitiesList from "../components/ActivitiesList";
import { useActivities } from "../ActivityContext";
import { colors } from '../Color';

export default function AllActivities({ navigation }) {

    // Retrieve activities and addActivity function from ActivityContext
    const { activities, addActivity } = useActivities();

    // Filter special activities
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
