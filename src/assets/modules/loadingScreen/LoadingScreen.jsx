import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingScreen({ message }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: 'white',
      }}
    >
      <Spinner animation="border" role="status" variant="primary" style={{ marginBottom: '10px' }}>
        <span className="visually-hidden">{message || 'Loading...'}</span>
      </Spinner>
      <p style={{ marginBottom: 0 }}>{message || 'Loading...'}</p>
    </div>
  );
}

export default LoadingScreen;