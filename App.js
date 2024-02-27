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
import { colors } from './Color';
import EditActivity from './components/EditActivity';
import PressableButton from './components/PressableButton';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Function for the Home screen (Tab Navigator)
function Home({}) {
  return (
    <Tab.Navigator screenOptions={({ navigation }) => globalScreenOptions(navigation) } >
      <Tab.Screen name="AllActivities" component={AllActivities} options={{
          headerStyle: { backgroundColor: colors.darkPurple },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: colors.yellow, 
          tabBarInactiveTintColor: colors.gray, 
          tabBarStyle: { backgroundColor: colors.darkPurple }, 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name="SpecialActivities" component={SpecialActivities} options={{
          headerStyle: { backgroundColor: colors.darkPurple },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: colors.yellow,
          tabBarInactiveTintColor: colors.gray, 
          tabBarStyle: { backgroundColor: colors.darkPurple }, 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="exclamation" size={24} color={color} />
          )
        }} />
    </Tab.Navigator>
  );
}

// Function to set global screen options (e.g., header button)
const globalScreenOptions = (navigation) => ({
  headerRight: () => (
    <PressableButton
      onPressFunction={() => navigation.navigate('AddActivity')}
      customStyle={{ marginRight: 10 }}>
      <Icon name="add" size={24} color="white" backgroundColor={colors.darkPurple} />
    </PressableButton>
  ),
});

export default function App() {
  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" >
          {/* Start screen */}
          <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
          {/* Home screen with tab navigation */}
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          {/* Edit screen with tab navigation */}
          <Stack.Screen
          options={({ route }) => {
            return {
              headerTitle: route.params ? route.params.data.text : "Edit",
              headerStyle: { backgroundColor: colors.darkPurple },
              headerTintColor: colors.white,
              headerTitleStyle: { fontWeight: 'bold' },
            };
          }}
          name="Edit"
          component={EditActivity}
        />
          {/* AddActivity screen */}
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ 
            headerTitle: "Add An Activity", 
            headerStyle: { backgroundColor: colors.darkPurple },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: 'bold' },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActivitiesProvider>
  );
}

const styles = StyleSheet.create({});

