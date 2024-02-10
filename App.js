import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import Start from './components/Start';
import AllActivities from './components/AllActivities';
import SpecialActivities from './components/SpecialActivities';
import AddActivity from './components/AddActivity'; 
import { StyleSheet } from 'react-native';
import { ActivitiesProvider } from './ActivityContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="AllActivities" component={AllActivities} options={{ headerTitle: "All My Activities" }} />
          <Stack.Screen name="SpecialActivities" component={SpecialActivities} options={{ headerTitle: "Special Activities" }} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ headerTitle: "Add An Activity" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesProvider>
  );
}

const styles = StyleSheet.create({});

