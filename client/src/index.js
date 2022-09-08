import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

import { AgoraProvider } from '@agnostech/react-agora-ng';
import AgoraRTC from "agora-rtc-sdk-ng"
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
