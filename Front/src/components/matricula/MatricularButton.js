import React from 'react';
import { Button } from 'react-bootstrap';

const MatricularButton = ({ onClick }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <Button variant="primary" onClick={onClick}>
        Matricular Usuario
      </Button>
    </div>
  );
};

export default MatricularButton;
