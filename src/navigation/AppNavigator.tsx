import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerShown: true, // Mostra o título no topo
          tabBarActiveTintColor: '#0055FF', // Cor do menu ativo (Azul espacial)
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Eventos' }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}