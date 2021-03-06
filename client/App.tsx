import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './screens/Home';
import { Login } from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
        />
             <Stack.Screen
            name="Meetings"
            component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


