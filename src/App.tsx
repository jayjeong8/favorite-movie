import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import {RecoilRoot} from "recoil";
import Favorite from "./Routes/Favorite";

function App() {
    return (
        <RecoilRoot>
            <Router basename={"/favorite-movie/"}>
                <Header/>
                <Routes>
                    <Route path="/tv" element={<Tv/>}/>
                    <Route path="/tv/:tvId" element={<Tv/>}/>
                    <Route path="/favorite" element={<Favorite/>}/>
                    <Route path="/favorite/:favoriteId" element={<Favorite/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/search/:searchId" element={<Search/>}/>
                    <Route path="/movie/:movieId" element={<Home/>}/>
                    <Route path="/movie" element={<Home/>}/>
                    <Route path="/*" element={<Home/>}/>
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
