const defaultUrl = 'wss://www.cryptofacilities.com/ws/v1';

let socket: any;

export const getData = (product: string, callback: Function) => {
  socket = new WebSocket(defaultUrl);
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
    return 'error';
  };
};

export const unsubscribe = () => {
  if (socket) {
    socket.close();
  }
};
