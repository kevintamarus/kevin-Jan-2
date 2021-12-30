import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';

export type Props = {
  data: Array<string>;
  bids: number;
  asks: number;
};

const Table: React.FC<Props> = ({data, bids, asks}) => {
  const renderRow = (item, i) => {
    return (
      <View style={styles.row} key={i}>
        <Text style={styles.text}>{item}</Text>
        <Text>{asks}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        // This will render a row for each data element.
        return renderRow(item, i);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flex: 1,
  },
  text: {
    color: Colors.Green,
  },
});

export default Table;
