import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Coords} from '../interfaces/LocationInterface';

export const useLocation = () => {
  const initialState: Coords = {
    latitude: 0,
    longitude: 0,
  };
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Coords>(initialState);
  const [userLocation, setUserLocation] = useState<Coords>(initialState);
  const watcher = useRef<number>();
  const isMounted = useRef<boolean>(true);

  const getCurrentLocation = (): Promise<Coords> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => reject({error}),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };
  const followUserLocation = () => {
    watcher.current = Geolocation.watchPosition(
      ({coords}) => {
        console.log('coords watched: ', coords);
        if (!isMounted.current) {
          return;
        }
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      error => console.error({error}),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const stopFollowingUser = () => {
    if (watcher.current) {
      Geolocation.clearWatch(watcher.current);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        if (!isMounted.current) {
          return;
        }
        setInitialPosition(location);
        setUserLocation(location);
        setHasLocation(true);
      })
      .catch(error => console.log({error}));
  }, []);

  return {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowingUser,
  };
};
