import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '../components/Button';
import {PermissionContext} from '../context/PermissionsContext';

export const PrivilegesScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You must grant GPS access to use the app</Text>
      <Button title="get Permission" onPress={askLocationPermission} />
      <Text style={styles.title}>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
  },
});
