import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({title, onPress, style = {}}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...(style as any),
        ...buttonStyles.button,
      }}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
