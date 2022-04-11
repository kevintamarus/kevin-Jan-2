import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';

export type Props = {
  style: object;
  title: string;
  onPress: any;
};

const Button: React.FC<Props> = ({style, title, onPress}) => {
  return (
    <TouchableHighlight style={[styles.defaultStyles, style]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  defaultStyles: {
    minWidth: 150,
    borderRadius: 5,
    padding: 7,
    backgroundColor: Colors.Purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.White,
  },
});

export default Button;
