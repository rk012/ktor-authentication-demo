import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NotFound from './NotFound'
import Home from './Home';
import LoginPage from './LoginPage'
import AuthPage from './AuthPage'
import Dashboard from './Dashboard'
import LogoutPage from "./LogoutPage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/register" element={<LoginPage registration />} />
                <Route path="/dashboard" element={<AuthPage page={<Dashboard />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
