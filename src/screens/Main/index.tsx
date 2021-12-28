import {getData} from 'helpers/sockets';
import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Main: FunctionComponent = () => {
  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    const body = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_XBTUSD'],
    };
    const data = getData(body);
    console.log('data in main', data);
  };

  const renderRow = (item, i) => {
    return (
      <View style={styles.row} key={i}>
        <Text>{item}</Text>
        <Text>Data</Text>
      </View>
    );
  };

  const data = ['Price', 'Size', 'Total'];
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
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flex: 1,
  },
});

export default Main;
