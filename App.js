import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import Start from './components/Start';
import AllActivities from './components/AllActivities';
import SpecialActivities from './components/SpecialActivities';
import AddActivity from './components/AddActivity'; 
import { Button, StyleSheet } from 'react-native';
import { ActivitiesProvider } from './ActivityContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({}) {
  return (
    <Tab.Navigator screenOptions={({ navigation }) => globalScreenOptions(navigation)} >
      <Tab.Screen name="AllActivities" component={AllActivities} />
      <Tab.Screen name="SpecialActivities" component={SpecialActivities} />
    </Tab.Navigator>
  );
}

const globalScreenOptions = (navigation) => ({
  headerRight: () => (
    <Button
      onPress={() => navigation.navigate('AddActivity')}
      title="Add"
    />
  ),
});

export default function App() {
  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start"  >
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ headerTitle: "Add An Activity" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesProvider>
  );
}

const styles = StyleSheet.create({});

