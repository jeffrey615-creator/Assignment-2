import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  customStyle,
  onPressFunction,
  children,
}) {
  return (
    <Pressable
      onPress={onPressFunction}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 5,
    padding: 5,
  },
  pressed: {
    opacity: 0.5,
  },
});