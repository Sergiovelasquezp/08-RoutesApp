import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';

export const Map = () => {
  const {hasLocation, initialPosition, getCurrentLocation} = useLocation();
  const mapViewRef = useRef<MapView>();
  if (!hasLocation) {
    return <LoadingScreen />;
  }

  const centerUserPosition = async () => {
    console.log(mapViewRef.current);
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
