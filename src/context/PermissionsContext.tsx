import React, {createContext, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

export interface PermissionsState {
  locationStatue: PermissionStatus;
}

export const PermissionsInitState: PermissionsState = {
  locationStatue: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setpermissions] = useState(PermissionsInitState);

  const askLocationPermission = async () => {
    let permissionRequest: PermissionStatus;
    if (Platform.OS === 'android') {
      permissionRequest = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      console.log({permissionRequest});
      setpermissions({...permissions, locationStatue: permissionRequest});
    }
  };

  const checkLocationPermission = () => {};

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};
