import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import {RecoilRoot} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/*" element={<Home/>}/>
                    <Route path="/tv" element={<Tv/>}/>
                    <Route path="/tv/*" element={<Tv/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/search/*" element={<Search/>}/>
                    <Route path="/search?keyword=*/*" element={<Search/>}/>
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
