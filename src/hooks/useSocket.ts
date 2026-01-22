import { toast } from 'sonner';
import {socket }from '../utils/helper/socket';
import { useEffect ,useState } from 'react';



export const useSocket = () => {
    const [numnotification, setnumnotification] = useState<number>(0);

  useEffect(() => {

    function onConnect() {
      console.log('Socket connected -----',socket.id);
    }

    function onDisconnect() {
        console.log('Socket disconnected', socket.id); 
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('notifytoAdmindashboard', (data) => {
        
        new Notification("new order placed", { body: data.message });
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
