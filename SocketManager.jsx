// client/src/utils/SocketManager.jsx

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../auth_temp/AuthContext'; // ✅ FIXED IMPORT PATH

let socket;

const SocketManager = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket = io('http://localhost:5000'); // change port if needed
      socket.emit('join', user._id);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [user]);

  return null;
};

export default SocketManager;
