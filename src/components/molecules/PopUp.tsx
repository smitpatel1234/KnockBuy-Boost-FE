import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';

export default function PopUp() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        setShowPopup(true);
        const timer = setTimeout(() => {
          setShowPopup(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = async () => {
    if ('Notification' in window) {
      await Notification.requestPermission();
      setShowPopup(false);
    }
  };

  const handleDeny = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className='absolute top-2 bg-white p-4 rounded-md shadow-md border border-gray-300 z-50 w-[270px]'>
      <div className='p-2'>Ask for Notification Permission </div>
      <Button size={`sm`} onClick={handleAccept} className='m-1'>Accept</Button>
      <Button size={`sm`} onClick={handleDeny} className='m-1'>Deny</Button>
    </div>
  )
}
