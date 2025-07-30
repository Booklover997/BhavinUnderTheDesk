import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import Creds from './pages/Creds.jsx';
import Enemies from './pages/Enemies.jsx';
import Home from './pages/Home.jsx';
import Writeups from './pages/Writeups.jsx';
import Nav from './pages/Nav.jsx';
import Bhavin from './pages/Bhavin.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certs" element={<Creds />} />
      <Route path="/enemies" element={<Enemies />} />
      <Route path="/bhavin" element={<Bhavin />} />
      <Route path="/enemies" element={<Enemies />} />
      <Route path="/writeups" element={<Writeups />} />

    </Routes>
  </BrowserRouter>
)
