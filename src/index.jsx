import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layouts/App';
import Loader from './components/Loader/Loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './stylesheet/vars.css';
import 'modern-normalize';
import './stylesheet/common.css';
import './stylesheet/fonts.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
