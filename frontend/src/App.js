import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './pages/Main/index'
import Login from './pages/Login/index';
import Register from './pages/Register/index'
import Refactor from './pages/RefactoryPassword/index';
import RegisterMedicine from './pages/RegisterMedicine';

function App() {
  document.title = 'Medicine Manager'
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/refactorpassword' element={<Refactor />} />
          <Route path='/registermedicine' element={<RegisterMedicine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
