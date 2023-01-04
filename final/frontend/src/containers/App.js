import '../App.css';
import Login from './Login';
import MainPage from './MainPage';
import { BrowserRouter as Router, Route, Routes }
         from 'react-router-dom';
import Template from './Template';
import { useComic } from './hooks/useComic';
import Block from './Block';
import Edit from './Edit';
import Work from './Work';

const App = () => {
  const { me, currentTemplate } = useComic();
  
  return (
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/template" element={<Template name={me}/>} />
            <Route path="/block" element={<Block template={currentTemplate}/>} />
            <Route path="/edit" element={<Edit/>} />
            <Route path="/work" element={<Work/>} />
          </Routes>
    </Router>
  );
};

export default App;
