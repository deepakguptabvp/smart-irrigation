import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import OtpLogin from "./components/OtpLogin";
import Login from "./components/Signin";
import UserLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import MapWithDrawing from "./components/Maps";
import AddField from "./components/AddField";
import LandingPage from "./components/LandingPage";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addfield" element={<AddField />}></Route>
            <Route path="/otplogin" element={<OtpLogin user={user} setUser={setUser}/>}></Route>
            <Route path="/signup" element={<Signup user={user} setUser={setUser}/>}></Route>
            <Route path="/map" element={<MapWithDrawing />}></Route>
            <Route path="/landingpage" element={<LandingPage user={user} setUser={setUser}/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
