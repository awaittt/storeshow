import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './pages/layout';
import Login from './pages/login';
import NotFound from './pages/not_found';
import {Button} from 'antd'
import {AuthComponent} from './Component/AuthComponent'
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={
          <AuthComponent>
          <Layout/>
          </AuthComponent>
        }></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
