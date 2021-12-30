import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import DepthGraph from './DepthGraph';

export type Props = {
  headers: Array<string>;
  data: Array<Array<number>>;
  bids: string;
  asks: string;
};

const Table: React.FC<Props> = ({headers, data, bids, asks}) => {
  const renderHeaders = (item: any, i: number) => {
    return (
      <View style={styles.headerContainer} key={i}>
        <Text style={styles.title}>{item}</Text>
      </View>
    );
  };

  const renderRow = () => {
    return data.map((item: any, i: number) => {
      return (
        <View style={styles.row}>
          <DepthGraph percent={item[2]} color={item[0] % 2 ? 'green' : 'red'} />
          <View style={styles.rowStyle}>
            <Text
              style={[
                styles.text,
                item[0] % 2 ? styles.greenText : styles.redText,
              ]}>
              {item[0]}
            </Text>
            <Text style={styles.text}>{item[1]}</Text>
            <Text style={styles.text}>none so far</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        {headers.map((item, i) => {
          // This will render a row for each data element.
          return renderHeaders(item, i);
        })}
      </View>
      {renderRow()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    padding: 5,
  },
  row: {},
  rowStyle: {
    flexDirection: 'row',
    padding: 5,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  title: {
    // alignSelf: 'flex-end',
    color: Colors.Gray,
  },
  text: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  greenText: {
    color: Colors.Green,
  },
  redText: {
    color: Colors.Red,
  },
});

export default Table;
