import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Vaccination from './components/Vaccination';
import About from './components/About';
import StateItem from "./components/StateItem";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path = '/about' exact Component={About}/>
          <Route path='/state/:id' Component={StateItem}/>
          <Route path= '/vaccination' exact Component={Vaccination}/>
          <Route Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
