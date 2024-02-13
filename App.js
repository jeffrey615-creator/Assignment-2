import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Screens/Start';
import AllActivities from './Screens/AllActivities';
import SpecialActivities from './Screens/SpecialActivities';
import AddActivity from './Screens/AddActivity'; 
import { Button, StyleSheet } from 'react-native';
import { ActivitiesProvider } from './ActivityContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({}) {
  return (
    <Tab.Navigator screenOptions={({ navigation }) => globalScreenOptions(navigation) } >
      <Tab.Screen name="AllActivities" component={AllActivities} options={{
          headerStyle: { backgroundColor: '#5611A1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: '#FDE767', 
          tabBarInactiveTintColor: 'gray', 
          tabBarStyle: { backgroundColor: '#5611A1' }, 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="SpecialActivities" component={SpecialActivities} options={{
          headerStyle: { backgroundColor: '#5611A1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: '#FDE767',
          tabBarInactiveTintColor: 'gray', 
          tabBarStyle: { backgroundColor: '#5611A1' }, 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="exclamation" size={24} color={color} />
          )
        }} />
    </Tab.Navigator>
  );
}

const globalScreenOptions = (navigation) => ({
  headerRight: () => (
    <Button
      onPress={() => navigation.navigate('AddActivity')}
      title="Add"
      color="yellow"
    />
  ),
});

export default function App() {
  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" >
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ 
            headerTitle: "Add An Activity", 
            headerStyle: { backgroundColor: '#5611A1' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesProvider>
  );
}

const styles = StyleSheet.create({});

