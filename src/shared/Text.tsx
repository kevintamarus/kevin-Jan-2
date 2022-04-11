import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import Colors from 'styles/Colors';

export type Props = {
  style: object;
  children: string;
};

const Text: React.FC<Props> = ({style, children, ...props}) => {
  return (
    <RNText {...props} style={[styles.defaultStyles, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultStyles: {
    fontSize: 14,
    color: Colors.White,
  },
});

export default Text;
