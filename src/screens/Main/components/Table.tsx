import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import DepthGraph from './DepthGraph';

export type Props = {
  headers: Array<string>;
  data: Array<Array<string>>;
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
    return (
      <>
        {data.map((item: any, i: number) => {
          return (
            <View style={styles.row}>
              <DepthGraph percent={item[2]} color="red" />
              <View style={styles.rowStyle}>
                <View style={styles.rowTextContainer}>
                  <Text style={[styles.rowText, styles.redText]}>
                    {item[0]}
                  </Text>
                </View>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>{item[1]}</Text>
                </View>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>none so far</Text>
                </View>
              </View>
            </View>
          );
        })}
        <Text style={styles.spreadText}>Spread: 13.0 (0.04%)</Text>
        {data.map((item: any, i: number) => {
          return (
            <View style={styles.row}>
              <DepthGraph percent={item[2]} color="green" />
              <View style={styles.rowStyle}>
                <View style={styles.rowTextContainer}>
                  <Text style={[styles.rowText, styles.greenText]}>
                    {item[0]}
                  </Text>
                </View>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>{item[1]}</Text>
                </View>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>none so far</Text>
                </View>
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.headerStyle}>
        {headers.map((item, i) => {
          // This will render a row for each data element.
          return renderHeaders(item, i);
        })}
      </View>
      <View style={styles.divider} />
      {renderRow()}
    </View>
  );
};

const tableRowPadding = 5;
const tableRowRightPadding = 30;

const styles = StyleSheet.create({
  container: {},
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.Gray,
  },
  headerContainer: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: tableRowPadding,
    paddingRight: tableRowRightPadding,
  },
  row: {},
  rowStyle: {
    flexDirection: 'row',
    padding: tableRowPadding,
    paddingRight: tableRowRightPadding,
  },
  title: {
    alignSelf: 'flex-end',
    color: Colors.Gray,
  },
  rowTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rowText: {},
  spreadText: {
    margin: 5,
    alignSelf: 'center',
    color: Colors.Gray,
  },
  greenText: {
    color: Colors.Green,
  },
  redText: {
    color: Colors.Red,
  },
});

export default Table;
