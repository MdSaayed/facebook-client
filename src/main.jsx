import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


import "./index.css";
import router from "./routers/Router";
import rootReducer from "./reducers";


const store = configureStore({
  reducer: rootReducer
});


const darkTheme = Cookies.get("darkTheme");
console.log(darkTheme);
if (darkTheme) {
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
