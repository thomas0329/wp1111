import '../App.css';
import Login from './Login';
import MainPage from '../components/MainPage';
import { BrowserRouter as Router, Route, Routes }
         from 'react-router-dom';
import Template from '../components/Template';

const App = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/template" element={<Template/>} />
          </Routes>
    </Router>
  );
};

export default App;
