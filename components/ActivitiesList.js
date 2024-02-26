import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PressableButton from "./PressableButton"; // Ensure this path is correct

export default function ActivitiesList({ activityObj, editFunction }) {
  return (
    <PressableButton onPressFunction={() => editFunction(activityObj)} customStyle={styles.container}>
      <View style={styles.detailRow}>
        <Text style={styles.type}>
          {activityObj.type}
          {activityObj.isSpecialActivity && <Text style={styles.specialIcon}>⚠️</Text>}
        </Text>
        <Text style={styles.date}>{activityObj.date}</Text>
        <Text style={styles.duration}>{activityObj.duration} min</Text>
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#5611A1",
    marginTop: 15,
    padding: 10,
    //width: "80%",
    alignSelf: "stretch", // Center the component
  },
  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', // Adjusted for better spacing
    alignItems: 'center', 
    flex:1,
  },
  type: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    flex:1,
  },
  date: {
    fontSize: 12,
    color: "#5611A1",
    borderWidth:1,
    backgroundColor:"white",
    padding:10,
    fontWeight: "bold",
    flex:1,
  },
  duration: {
    fontSize: 12,
    color: "#5611A1",
    borderWidth:1,
    backgroundColor:"white",
    padding:10,
    fontWeight: "bold",
  },
  specialIcon: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
