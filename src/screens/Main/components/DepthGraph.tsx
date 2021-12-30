import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from 'styles/Colors';

export type Props = {
  percent: number;
  color: string;
};

const DepthGraph: React.FC<Props> = ({percent, color}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: color === 'green' ? Colors.Green2 : Colors.Red2,
          width: `${percent}%`,
        }}
      />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  leftBar: {
    backgroundColor: Colors.Green2,
  },
});

export default DepthGraph;
