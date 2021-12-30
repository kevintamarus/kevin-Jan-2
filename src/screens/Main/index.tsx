import {getData} from 'helpers/sockets';
import {get} from 'helpers/util';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'shared/Text';
import Colors from 'styles/Colors';

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
      const newBids = get(data, 'bids.0.0', '0');
      const newAsks = get(data, 'asks.0.0', '0');
      setBids(newBids);
      setAsks(newAsks);
    };
    getData(body, callback);
  };

  const renderRow = (item, i) => {
    return (
      <View style={styles.row} key={i}>
        <Text style={styles.text}>{item}</Text>
        <Text>{asks}</Text>
      </View>
    );
  };

  const data = ['PRICE', 'SIZE', 'TOTAL'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <View style={styles.divider} />
      <View style={styles.tableContainer}>
        {data.map((item, i) => {
          // This will render a row for each data element.
          return renderRow(item, i);
        })}
      </View>
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
