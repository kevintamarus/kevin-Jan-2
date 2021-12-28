const defaultUrl = 'wss://www.cryptofacilities.com/ws/v1';

export const getData = (body: object) => {
  const socket = new WebSocket(defaultUrl);
  socket.onopen = () => {
    socket.send(JSON.stringify(body));
  };

  socket.onmessage = (e) => {
    // a message was received
    console.log('data', e.data);
    // return 'here you go';
    // return e.data;
  };

  socket.onerror = (e) => {
    // an error occurred
    console.log('error', e);
    return 'error';
  };
};
