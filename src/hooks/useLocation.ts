import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {Coords} from '../interfaces/LocationInterface';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });

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

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        setInitialPosition(location);
        setHasLocation(true);
      })
      .catch(error => console.log({error}));
  }, []);

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
  };
};
