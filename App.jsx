import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import MapScreen from './screens/MapScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MonCompteScreen from './screens/MonCompteScreen';
import ChatScreen from './screens/ChatScreen';
import PreferenceScreen from './screens/PreferenceScreen'
import CompagnonScreen from './screens/CompagnonScreen';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import places from './reducers/places';
import ProfileScreen from './screens/ProfileScreen';

const store = configureStore({
  reducer: { user, places },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Configuration tab navigation
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Map') {
          iconName = 'home';
        } else if (route.name === 'Compte') {
          iconName = 'user';
        } else if (route.name === 'Chat') {
          iconName = 'comment';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#000000',
      tabBarStyle: { backgroundColor: '#7DBA84' },
      headerShown: false,
    })}>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Compte" component={MonCompteScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AutocompleteDropdownContextProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Profil" component={ProfileScreen} />
            <Stack.Screen name="Preference" component={PreferenceScreen} />
            <Stack.Screen name="Compagnon" component={CompagnonScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
