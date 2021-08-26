import React, {useContext} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {PermissionContext} from '../context/PermissionsContext';

export const PrivilegesScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionContext);
  return (
    <View style={styles.container}>
      <Button title="Get Location Permission" onPress={askLocationPermission} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
