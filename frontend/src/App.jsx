
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
      <div className="App">
        <LoginSignup />
        {/* Other components that might use GoogleOAuth */}
      </div>
     </GoogleOAuthProvider>

    </BrowserRouter>
  );
}
