import React from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import './style.css';   // importing here allows us to avoid using minicssloader which wasn't working

const root = createRoot(document.getElementById('root'));
root.render(<App />)