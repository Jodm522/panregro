
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { ModalProvider } from "./context/Modal";

import createStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = createStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}



const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
  <Provider store={store}>
<React.StrictMode>
     <App />
   </React.StrictMode>

  </Provider>
  
 );











 // import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';

// import configureStore from './store';


// if (process.env.NODE_ENV !== 'production') {
//   window.store = store;
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// function Root() {
//   return (
//     <Provider store={store}>

//         <BrowserRouter>
//           <App />
//         </BrowserRouter>

//     </Provider>
//   );
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );