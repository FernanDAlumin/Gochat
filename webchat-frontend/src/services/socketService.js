import { io } from 'socket.io-client';

let socket;

export const initSocket = (serverUrl = 'http://localhost:5000') => {
  socket = io(serverUrl);

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket first.');
  }
  return socket;
};

export const sendMessage = (message) => {
  const socket = getSocket();
  socket.emit('send_message', message);
};