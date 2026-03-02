import { useState } from 'react'
import './App.css'
import RootLayout from '../components/RootLayout'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Technologies from '../components/Technologies'
import Java from '../components/Java'
import Nodejs from '../components/Nodejs'
import Vue from '../components/Vue'

function App() {
    //routing configuration
    const routingObj = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/technologies',
                    element: <Technologies />,
                    children: [
                        {
                            path: 'java',
                            element: <Java />
                        },
                        {
                            path: 'nodejs',
                            element: <Nodejs />
                        },
                        {
                            path: 'vue',
                            element: <Vue />
                        },
                        {
                            path: '',
                            element: <Navigate to="java" />
                        }
                    ]
                }
            ]
        }
    ])
    return (
        <RouterProvider router={routingObj} />
    )
}

export default App
