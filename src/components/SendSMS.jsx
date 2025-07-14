import React from 'react';

const SendSMSButton = ({phoneNumber, message, btnText}) => {
//   const phoneNumber = '+919876543210'; // Replace with desired number
//   const message = 'Hello! This is a pre-filled message.';

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `sms:${phoneNumber}?&body=${encodedMessage}`;
  };

  return (
    <button onClick={handleClick}>
      {btnText}
    </button>
  );
};

export default SendSMSButton;