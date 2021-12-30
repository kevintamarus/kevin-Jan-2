const defaultUrl = 'wss://www.cryptofacilities.com/ws/v1';

let socket: any;

export const getData = (product: string, callback: any) => {
  socket = new WebSocket(defaultUrl);
  console.log('getting data');
  const body = {
    event: 'subscribe',
    feed: 'book_ui_1',
    product_ids: [product],
  };

  socket.onopen = () => {
    socket.send(JSON.stringify(body));
  };

  socket.onmessage = (e: any) => {
    const data = JSON.parse(e.data);
    return callback(data);
  };

  socket.onerror = (e: any) => {
    // an error occurred
    console.log('error', e);
    return 'error';
  };
};

export const unsubscribe = () => {
  console.log('unsubscribing');
  if (socket) {
    socket.close();
  }
};
