import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MapScreen} from '../pages/MapScreen';
import {PrivilegesScreen} from '../pages/PrivilegesScreen';

const Stack = createStackNavigator();
export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="PrivilegesScreen" component={PrivilegesScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
