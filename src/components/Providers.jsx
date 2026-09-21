'use client';

import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#003717',
            color: '#ffffff',
            fontSize: '13px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 10px 25px -5px rgba(0, 55, 23, 0.3)'
          }
        }}
      />
    </>
  );
}
