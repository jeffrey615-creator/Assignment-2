import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ActivitiesList({ activityObj }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailRow}>
        <Text style={styles.type}>
          {activityObj.type}
          {/* Show exclamation mark if it's a special activity */}
          {activityObj.isSpecialActivity && <Text style={styles.specialIcon}>⚠️</Text>}
        </Text>
        <Text style={styles.details}>{activityObj.date} | {activityObj.duration} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "purple",
    marginTop: 15,
    padding: 10,
  },
  detailRow: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Distribute space evenly between the items
    alignItems: 'center', // Center items vertically
  },
  type: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  details: {
    fontSize: 16,
    color: "white",
  },
  specialIcon: {
    // Additional styling for the exclamation mark if needed
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 6,
  },
});
