const sockets = io => {
  // set a default group of symbols to display
  let stockList = ['GOOG', 'FB', 'TWTR'];

  io.on('connection', socket => {
    // when a new subscription event fires, send back the current stocklist
    socket.on('subscribe', cb => {
      cb(stockList);
    });

    socket.on('add', value => {
      // when a new stock is added, append to the list and broadcast
      stockList = [...stockList, value];
      io.emit('update', stockList);
    });

    socket.on('remove', value => {
      const i = stockList.indexOf(value);
      stockList.splice(i, 1);
      io.emit('update', stockList);
    });
  });
};

export default sockets;
