import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Header from './components/header/Header';
function App() {
  return (
    <div className="App">
      <Routes>
<Route path='/' element={<Header/>}/>
<Route path='/login' element={<Login/>}/>


      </Routes>

    </div>
  );
}

export default App;
