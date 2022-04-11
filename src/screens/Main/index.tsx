import {product} from 'consts/product';
import {getData, unsubscribe} from 'helpers/sockets';
import {get} from 'helpers/util';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {AppState, StyleSheet, View} from 'react-native';
import Button from 'shared/Button';
import Text from 'shared/Text';
import Colors from 'styles/Colors';
import Table from './components/Table';

const Main: FunctionComponent = () => {
  const appState = useRef(AppState.currentState);
  const [currentProduct, setCurrentProduct] = useState(product.XBT);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [highestTotal, setHighestTotal] = useState(0);

  useEffect(() => {
    handleGetData(currentProduct);
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: any) => {
        if (appState.current === 'inactive') {
          unsubscribe();
        }
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          handleGetData(currentProduct);
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const handleGetData = (product: string) => {
    let count = 0;
    const callback = (data: object) => {
      if (count === 50) {
        compareAndUpdateList(data);
        count = 0;
      }
      count++;
    };
    unsubscribe();
    getData(product, callback);
  };

  const filterResults = (items: Array<Array<number>>) =>
    items.filter((item: Array<number>) => item[1] !== 0);

  const mapTotals = (items: Array<Array<number>>) => {
    let total = 0;
    return items.map((item: Array<number>) => {
      total = total + item[1];
      item.push(total);
      return item;
    });
  };

  const sortResults = (items: Array<Array<number>>, order: string) =>
    items.sort((a: Array<number>, b: Array<number>) => {
      return order === 'asc' ? a[1] - b[1] : b[1] - a[1];
    });

  const calculateHighestTotal = (
    bids: Array<Array<number>>,
    asks: Array<Array<number>>,
  ) => {
    return Math.max(
      bids.length ? bids[0][2] : 0,
      asks.length ? asks[asks.length - 1][2] : 0,
    );
  };

  const compareAndUpdateList = (data: object) => {
    //this needs to be fixed, totals is incorrect for bids
    const newBids = sortResults(
      mapTotals(filterResults(get(data, 'bids', []))),
      'desc',
    );
    const newAsks = mapTotals(
      sortResults(filterResults(get(data, 'asks', [])), 'asc'),
    );
    if (newBids.length) {
      setBids(newBids);
    }
    if (newAsks.length) {
      setAsks(newAsks);
    }
    setHighestTotal(calculateHighestTotal(newBids, newAsks));
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <View style={styles.tableContainer}>
        <Table headers={headers} bids={bids} asks={asks} total={highestTotal} />
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
