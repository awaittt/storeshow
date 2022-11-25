import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import OutLayout from './pages/layout';
import Login from './pages/login';
import NotFound from './pages/not_found';
import {Button} from 'antd'
import {AuthComponent} from './Component/AuthComponent'
import Home from './pages/layout/home';
import Article from './pages/layout/article';
import Content from './pages/layout/content';
import { MapModal } from './pages/layout/map';
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={
          <AuthComponent>
          <OutLayout/>
          </AuthComponent>
        }>
          <Route index element={<MapModal/>}></Route>
          <Route path='data' element={<Home/>}></Route>
          <Route path='article' element={<Article/>}></Route>
          <Route path='content' element={<Content/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
