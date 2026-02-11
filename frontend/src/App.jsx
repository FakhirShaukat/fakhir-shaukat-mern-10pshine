import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";
import UserProfile from "./pages/UserProfile";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addnotes" element={<AddNotes />} />
        <Route path="/editnotes" element={<EditNotes />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
