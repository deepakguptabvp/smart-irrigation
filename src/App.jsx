import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserLayout from "./layouts/userLayout";
import Signup from "./components/Signup";
import OtpLogin from "./components/OtpLogin";
import Login from "./components/Signin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/otplogin" element={<OtpLogin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
