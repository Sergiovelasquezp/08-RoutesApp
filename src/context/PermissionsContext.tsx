import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
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
  useEffect(() => {
    AppState.addEventListener('change', state => {
      console.log('app state =>', {state});
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askLocationPermission = async () => {
    let permissionRequest: PermissionStatus;
    if (Platform.OS === 'android') {
      permissionRequest = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      console.log('permissionRequest => ', {permissionRequest});
      setpermissions({...permissions, locationStatue: permissionRequest});
      if (permissionRequest === 'blocked') {
        openSettings();
      }
    }
  };

  const checkLocationPermission = async () => {
    let permissionRequest: PermissionStatus;
    if (Platform.OS === 'android') {
      permissionRequest = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log({permissionRequest});
      setpermissions({...permissions, locationStatue: permissionRequest});
    }
  };

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
