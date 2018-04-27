const sockets = io => {
  // set a default group of symbols to display
  const stockList = ["GOOG", "FB", "TWTR"];

  io.on('connection', socket => {
    console.log(`Connected on socket ${ socket.id }`);

    socket.on('subscribe', cb => {
      cb(stockList);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnect on socket ${ socket.id }`);
    });
  });
}

export default sockets;
