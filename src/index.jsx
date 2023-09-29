import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Loader from "./components/Loader/Loader";
import 'modern-normalize'
import "./stylesheet/common.css";
import './stylesheet/fonts.css';
import './stylesheet/vars.css';


ReactDOM.createRoot(document.getElementById("root")).render(
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
