import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const users = [
  {
    id: 0,
    email: 'tranngminhdao@gmail.com',
    username: 'minhdao',
    password: '$2b$06$6XNzwZbsGqWJnCezjnMyBOW2P9QDcp/HACxHSuHaFTF.kIS6QNnIS',
    phone: '0987641231',
  },
  {
    id: 1,
    email: 'quantriminh@gmail.com',
    username: 'minhtri',
    password: '$2b$06$6k1fyol.hDbDtpeU6DkoT.BemHdIHEmuKDWjb8/YFyhgGKCqtRHUS',
    phone: '0312231238',
  },
  {
    id: 2,
    email: 'truongminhnamphu@gmail.com',
    username: 'namphu',
    password: '$2b$06$v1Hf6aJ25opXz.41dYHQdu.adIi0qTRtg1xiilqQw7huP0BImu.sa',
    phone: '0312231238',
  },
];

localStorage.setItem('users', JSON.stringify(users));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
