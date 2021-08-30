import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';

export const Map = () => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowingUser,
    userLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowingUser();
    };
  }, []);

  useEffect(() => {
    if (!following.current) {
      return;
    }
    mapViewRef.current?.animateCamera({
      center: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
    return () => {};
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  const centerUserPosition = async () => {
    following.current = true;
    const location = await getCurrentLocation();
    const {latitude, longitude} = location;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  return (
    <>
      <Fab iconName="locate-outline" onPress={centerUserPosition} />
      <MapView
        /**
         * NOTE
         * with references you can pass all the
         * info related to a specific element
         * including all it's methods and properties
         */
        ref={el => (mapViewRef.current = el!)}
        style={{...styles.map}}
        showsUserLocation={true}
        onTouchStart={() => (following.current = false)}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          // key={index}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'my marker'}
          description={'my marker description'}
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
