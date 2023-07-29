import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from './App'
import './index.css'
import { SoftUIControllerProvider } from "./context/index";
import i18n from "./localization/index";
import { Toaster } from "react-hot-toast";
import PaginationProvider from "./context/PaginationContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <Toaster
    position="top-center"
    reverseOrder={true}
    />
    <PaginationProvider>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
    </PaginationProvider>
  </BrowserRouter>
  </Provider>,
)
