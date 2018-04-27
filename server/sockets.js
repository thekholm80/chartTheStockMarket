const sockets = io => {
  // set a default group of symbols to display
  let stockList = ['GOOG', 'FB', 'TWTR'];

  io.on('connection', socket => {
    // when a new subscription event fires, send back the current stocklist
    socket.on('subscribe', cb => {
      cb(stockList);
    });

    socket.on('add', value => {
      // when a new stock is added, append to the list and return
      stockList = [...stockList, value];
      socket.emit('update', stockList);
    });
  });
};

export default sockets;
