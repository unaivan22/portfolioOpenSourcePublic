import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Create from './back/Create';
import Detail from './Detail';
import Lists from './back/Lists';
import Signin from './Signin';
import Edit from './back/Edit';
import About from './About';

export default function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/writings' element={<Lists />} />
        <Route path='/create' element={<Create />} />
        <Route path='/:noteNoteuuid' element={<Detail />} />
        <Route path='/writings/:noteNoteuuid' element={<Detail />} />
        <Route path='/4d2f75e8b1a7392f' element={<Signin />} />
        <Route path='/writings/:noteNoteuuid/edit' element={<Edit />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='*' element={<NotFound/>} /> */}
      </Routes>
    </Router>
  );
}
