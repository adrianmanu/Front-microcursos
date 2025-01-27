import React from 'react';
import { Alert } from 'react-bootstrap';

const MessageAlert = ({ message, messageType, onClose }) => {
  return (
    message && (
      <Alert variant={messageType} onClose={onClose} dismissible>
        {message}
      </Alert>
    )
  );
};

export default MessageAlert;
