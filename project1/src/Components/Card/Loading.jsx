import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';

export default function Loading() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  const loaderColor = theme === 'dark' ? '#ffffff' : 'red';

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease'
      }}
    >
      <DotLoader color={loaderColor} />
    </div>
  );
}
