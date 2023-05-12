/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Settings from '../screens/Settings';
import { Datum } from '../models/Matches';

interface Props {
  matches: Datum[];
}

const Tab = createBottomTabNavigator();

function BottomTab({ matches }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Configuración') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'star' : 'star-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#151515',
          borderTopColor: '#151515',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" children={() => <Home matches={matches} />} />
      <Tab.Screen
        name="Favoritos"
        children={() => <Favourites matches={matches} />}
      />
      <Tab.Screen name="Configuración" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTab;
