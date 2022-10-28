import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './pages/Main/index'
import Login from './pages/Login/index';
import Register from './pages/Register/index'
import Refactor from './pages/RefactoryPassword/index';
import RegisterMedicine from './pages/RegisterMedicine/index';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState();
  document.title = 'Medicine Manager'
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [token]);
  return (
    <div className="App">
      <BrowserRouter>
      {!token ? (
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/refactorpassword' element={<Refactor />} />
          <Route path='/registermedicine' element={<RegisterMedicine />} />
        </Routes>
      ): (
        <>
          Usuário autenticado
        </>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
