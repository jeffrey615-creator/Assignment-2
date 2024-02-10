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
          {/* Date */}
          <Text style={styles.date}>{activityObj.date}</Text>

        {/* Duration */}
        <Text style={styles.duration}>{activityObj.duration} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#5611A1",
    marginTop: 15,
    padding: 10,
    width: "80%",
  },
  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
  },
  type: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#5611A1",
    borderWidth:1,
    backgroundColor:"white",
    padding:10,
    fontWeight: "bold",
  },
  duration:{
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
