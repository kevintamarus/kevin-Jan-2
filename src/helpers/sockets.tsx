const defaultUrl = 'wss://www.cryptofacilities.com/ws/v1';

export const getData = (body: object, callback: any) => {
  const socket = new WebSocket(defaultUrl);
  socket.onopen = () => {
    socket.send(JSON.stringify(body));
  };

  socket.onmessage = (e) => {
    // a message was received
    // console.log('data', e.data);
    const data = JSON.parse(e.data);
    return callback(data);
  };

  socket.onerror = (e) => {
    // an error occurred
    console.log('error', e);
    return 'error';
  };
};
