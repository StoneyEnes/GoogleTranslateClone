import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./App.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./Pages/Home/index.jsx";
import {Provider} from "react-redux";
import store from "../src/Redux/store.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
