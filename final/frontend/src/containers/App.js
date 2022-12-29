import '../App.css';
import Login from './Login';
import MainPage from '../components/MainPage';
import { BrowserRouter as Router, Route, Routes }
         from 'react-router-dom';
import Template from '../components/Template';
import { useComic } from './hooks/useComic';

const App = () => {
  const { me } = useComic();

  return (
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/template" element={<Template name={me}/>} />
          </Routes>
    </Router>
  );
};

export default App;
