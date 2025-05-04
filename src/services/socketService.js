import { io } from 'socket.io-client';

let socket = null;

// Initialize the socket connection
export const initializeSocket = (token) => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'; // Replace with your WebSocket server URL
    socket = io(SOCKET_URL, {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Handle connection events
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('userLoggedIn', (data) => {
        console.log('Socket event received:', data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
    });
};

// Register to the socket
export const registerToSocket = (token) => {
    if (!socket) {
        initializeSocket(token);
    }
    // socket.on('userLoggedIn', (data) => {
    //     console.log('Socket event received:', data);
    // });

};

// Disconnect from the socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log('Disconnected from WebSocket server');
    }
};