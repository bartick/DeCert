import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from 'react-moralis';

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://yzfzc07ju6kr.usemoralis.com:2053/server" appId="yohMP8fh7GApV4KQ4cGRYWTTtpycmiLSX1d6wjO7">
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
