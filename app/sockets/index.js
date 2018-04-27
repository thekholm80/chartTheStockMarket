import io from 'socket.io-client';

const socket = new io('ws://localhost:3000', {
  transports: ['websocket', 'xhr-polling']
});

export { socket };
