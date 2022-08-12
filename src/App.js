import { Route, Routes, NavLink } from "react-router-dom"
import "./App.css"
import AuthPage from "./pages/AuthPage";
import BuyingPage from "./pages/BuyingPage";
import ThoughtPage from "./pages/ThoughtPage";
import DoPage from "./pages/DoPage";
import { useState } from "react";
import ThoughtPost from "./pages/ThoughtPost";
import ThoughtTable from "./tables/ThoughtTable";

function App() {

  const [token, setToken] = useState(false);

  return (
    <>
      <header className="title">
        <h1>個人記事系統</h1>
      </header>
      <nav className="navbar navbar-center navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link">
              <NavLink
              style={({isActive})=>{ return isActive? {color: "red", textDecoration:"none"}:{textDecoration:"none"} }}
              to="/thought"
              >想什麼</NavLink>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <NavLink
              style={({isActive})=>{ return isActive? {color: "red", textDecoration:"none"}:{textDecoration:"none"} }}
              to="/do"
              >做什麼</NavLink>
            </a>  
          </li>
          <li className="nav-item">
            <a className="nav-link">
              <NavLink
              style={({isActive})=>{ return isActive? {color: "red", textDecoration:"none"}:{textDecoration:"none"} }}
              to="/buying"
              >買什麼</NavLink>
            </a>  
          </li>
        </ul>
      </nav>
      <div className="app__container">
        <Routes>
          <Route path="/" element={<AuthPage token={token} setToken={setToken}/>} />
          <Route path="/thought" element={<ThoughtPage token={token}/>} >
              <Route index element={<ThoughtTable/>}/>
              <Route path="post/:id" element={<ThoughtPost/>} />
          </Route>
          <Route path="/do" element={<DoPage token={token}/>} />
          <Route path="/buying" element={<BuyingPage token={token}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
