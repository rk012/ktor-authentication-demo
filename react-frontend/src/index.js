import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NotFound from './NotFound'
import Home from './Home';
import LoginPage from './LoginPage'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LoginPage registration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
