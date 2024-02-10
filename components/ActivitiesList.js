import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ActivitiesList({ activityObj }) {
  const displayDate = activityObj.date ? new Date(activityObj.date).toLocaleDateString() : "No date";

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{activityObj.name}</Text>
      <Text style={styles.details}>Type: {activityObj.type}</Text>
      <Text style={styles.details}>Duration: {activityObj.duration} minutes</Text>
      <Text style={styles.details}>Date: {displayDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "purple",
    marginTop: 15,
    padding: 10, // Added padding for better spacing inside the container
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  details: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
