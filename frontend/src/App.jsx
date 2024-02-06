
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />

    </BrowserRouter>
  );
}
