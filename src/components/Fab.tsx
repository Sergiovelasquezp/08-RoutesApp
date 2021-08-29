import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
export const Fab = ({iconName, onPress, style = {}}: Props) => {
  const {height: windowHeight} = useWindowDimensions();
  return (
    <View style={{...(style as any), ...styles.container}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          ...styles.button,
          ...styles.bottomRight,
          top: windowHeight - 70,
        }}>
        <Icon name={iconName} color="white" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    zIndex: 9999,
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  bottomRight: {
    right: 20,
    // top: 100,
  },
  bottomLeft: {
    right: 20,
    bottom: 20,
  },
});
