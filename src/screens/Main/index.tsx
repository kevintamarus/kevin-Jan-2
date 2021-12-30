import {getData} from 'helpers/sockets';
import {get} from 'helpers/util';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from 'shared/Button';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import Table from './components/Table';

const Main: FunctionComponent = () => {
  const [bids, setBids] = useState('0');
  const [asks, setAsks] = useState('0');

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
      const newBids = get(data, 'bids.0.0', '0');
      const newAsks = get(data, 'asks.0.0', '0');
      setBids(newBids);
      setAsks(newAsks);
    };
    getData(body, callback);
  };

  const headers = ['PRICE', 'SIZE', 'TOTAL'];
  const mockData = [
    ['30,000.30', '0', '50'],
    ['30,0000.30', '1', '100'],
    ['300.30', '2', '35'],
    ['300.30', '3', '4'],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <View style={styles.tableContainer}>
        <Table headers={headers} data={mockData} bids={bids} asks={asks} />
      </View>
      <Button style={styles.button} title="Toggle Feed" onPress={() => {}} />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.White,
    margin: 10,
  },
  tableContainer: {
    flex: 1,
  },
  button: {
    flex: 0,
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default Main;
