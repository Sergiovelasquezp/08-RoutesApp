import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {PermissionContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../pages/LoadingScreen';
import {MapScreen} from '../pages/MapScreen';
import {PrivilegesScreen} from '../pages/PrivilegesScreen';

const Stack = createStackNavigator();
export const Navigation = () => {
  const {permissions} = useContext(PermissionContext);
  return permissions.locationStatue === 'unavailable' ? (
    <LoadingScreen />
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatue === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PrivilegesScreen" component={PrivilegesScreen} />
      )}
    </Stack.Navigator>
  );
};
