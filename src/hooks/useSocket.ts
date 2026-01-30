import {socket }from '../utils/helper/socket';
import { useEffect ,useState } from 'react';



export const useSocket = () => {
    const [numnotification, setnumnotification] = useState<number>(0);

  useEffect(() => {
    function onConnect() {
      // Connection handler
    }

    function onDisconnect() {
      // Disconnect handler
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('notifytoAdmindashboard', (data: unknown) => {
      const notificationData = data as { message?: string };
      new Notification("new order placed", { body: notificationData.message ?? "New order" });
      setnumnotification((prev) => prev + 1);
      console.log('Notification received:', data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return {
    numnotification,
    setnumnotification,
  };
}
