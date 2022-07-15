import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Legal from './Legal';
import '../../static/css/index.scss';
const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='legal' element={<Legal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
