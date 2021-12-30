import {product} from 'consts/product';
import {getData, unsubscribe} from 'helpers/sockets';
import {get} from 'helpers/util';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from 'shared/Button';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import Table from './components/Table';

const Main: FunctionComponent = () => {
  const [currentProduct, setCurrentProduct] = useState(product.XBT);
  const [bids, setBids] = useState('0');
  const [asks, setAsks] = useState('0');

  useEffect(() => {
    // handleGetData();
  }, []);

  const handleGetData = (product: string) => {
    const callback = (data: object) => {
      const newBids = get(data, 'bids.0.0', '0');
      const newAsks = get(data, 'asks.0.0', '0');
      console.log('data returned', data);
      setBids(newBids);
      setAsks(newAsks);
    };
    unsubscribe();
    getData(product, callback);
  };

  const handleTogglePress = () => {
    if (currentProduct === product.XBT) {
      handleGetData(product.ETH);
      setCurrentProduct(product.ETH);
    } else {
      handleGetData(product.XBT);
      setCurrentProduct(product.XBT);
    }
  };

  const headers = ['PRICE', 'SIZE', 'TOTAL'];
  const mockData = [
    ['30,000.30', '0', '50'],
    ['30,000.30', '1', '100'],
    ['300.30', '2', '35'],
    ['300.30', '3', '4'],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <View style={styles.tableContainer}>
        <Table headers={headers} data={mockData} bids={bids} asks={asks} />
      </View>
      <Button
        style={styles.button}
        title="Toggle Feed"
        onPress={handleTogglePress}
      />
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
