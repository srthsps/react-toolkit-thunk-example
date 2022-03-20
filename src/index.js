import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"

import store from "./store"
import tool from "./store/store" 
import toast, { Toaster } from 'react-hot-toast';

const app = (
  <Provider store={tool}>
    <App />
    <Toaster />
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()