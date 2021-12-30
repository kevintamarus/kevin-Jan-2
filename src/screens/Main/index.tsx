import {getData} from 'helpers/sockets';
import {get} from 'helpers/util';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import Table from './components/Table';

const Main: FunctionComponent = () => {
  const [bids, setBids] = useState(0);
  const [asks, setAsks] = useState(0);

  useEffect(() => {
    // handleGetData();
  }, []);

  const handleGetData = () => {
    const body = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_XBTUSD'],
    };
    const callback = (data: object) => {
      const newBids = get(data, 'bids.0.0', 0);
      const newAsks = get(data, 'asks.0.0', 0);
      setBids(newBids);
      setAsks(newAsks);
    };
    getData(body, callback);
  };

  const data = ['PRICE', 'SIZE', 'TOTAL'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <View style={styles.divider} />
      <Table data={data} bids={bids} asks={asks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.Black,
  },
  title: {
    color: Colors.White,
    marginVertical: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
  tableContainer: {
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

export default Main;
