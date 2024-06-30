// biblioteki
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// komponenty
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import TransitionWrapper from "./Components/TransitionWrapper/TransitionWrapper";
import { AuthProvider } from "./context/AuthContext";

// strony
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Peaks from "./Pages/Peaks/Peaks";
import PeakDetails from "./Pages/PeakDetails/PeakDetails";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Menu/>
                    <TransitionWrapper>
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/logout" element={<Logout/>}/>
                                <Route path="/peaks" element={<Peaks/>}/>
                                <Route path="/peaks/:id" element={<PeakDetails/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </div>
                    </TransitionWrapper>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
