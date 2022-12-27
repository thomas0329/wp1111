import '../App.css';
import Login from './Login';
import MainPage from '../components/MainPage';
import { BrowserRouter as Router, Route, Routes }
         from 'react-router-dom';

const App = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
    </Router>
  );
};

export default App;
