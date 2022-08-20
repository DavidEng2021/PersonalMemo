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

  const [token, setToken] = useState("");

  const [theme, setTheme] = useState(["white", "black"])
  const [navTheme, setNavThem] = useState(["#F5F5F5", "#696969"])

  const themehandler = () => {
    theme[0]==="white" ? setTheme(["black", "white"]) : setTheme(["white", "black"])
    navTheme[0]==="#F5F5F5" ? setNavThem(["#696969", "#F5F5F5"]) : setNavThem(["#F5F5F5", "#696969"])
  }

  return (
    <>
      <header className="title" style={{backgroundColor:theme[0], color:theme[1]}}>
        <h1>個人記事系統👨‍💻</h1>
      </header>
      <nav className="navbar navbar-center navbar-expand-lg navbar-light" style={{backgroundColor:navTheme[0], color:theme[1]}}>
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
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
          onChange={themehandler}/>
          <label class="form-check-label" for="flexSwitchCheckDefault">黑/白模式</label>
        </div>
      </nav>
      <div className="app__container" style={{backgroundColor:theme[0]}}>
        <Routes>
          <Route path="/" element={<AuthPage token={token} setToken={setToken}/>} />
          <Route path="/thought" element={<ThoughtPage token={token}/>} >
              <Route index element={<ThoughtTable token={token} />}/>
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
