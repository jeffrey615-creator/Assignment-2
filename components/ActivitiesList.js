import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PressableButton from "./PressableButton"; 
import { colors } from "../Color";

export default function ActivitiesList({ activityObj, editFunction }) {
  return (
    // PressableButton component used for each activity item, triggering `editFunction` on press
    <PressableButton onPressFunction={() => editFunction(activityObj)} customStyle={styles.container}>
      <View style={styles.detailRow}>
        <Text style={styles.type}>
          {activityObj.type}
        </Text>
        {/* Container for right-aligned items: special activity icon, date, and duration */}
        <View style={styles.rightAlignedItems}>
          {/* Conditional rendering of special activity icon if `isSpecialActivity` is true */}
          {activityObj.isSpecialActivity && <Text style={styles.specialIcon}>⚠️</Text>}
          {/* Display the activity date */}
          <Text style={styles.date}>{activityObj.date}</Text>
          {/* Display the activity duration in minutes */}
          <Text style={styles.duration}>{activityObj.duration} min</Text>
        </View>
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.darkPurple,
    marginTop: 15,
    padding: 10,
    alignSelf: "stretch", 
  },
  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flex: 1,
  },
  type: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  rightAlignedItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.darkPurple,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 12,
    color: colors.darkPurple,
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 10,
    fontWeight: "bold",
  },
  specialIcon: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 4, 
  },
});
