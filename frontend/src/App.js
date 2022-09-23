import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from './pages/Main/index'
import Login from './pages/Login/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
