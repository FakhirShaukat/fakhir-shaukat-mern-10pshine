import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addnotes" element={<AddNotes />} />
        <Route path="/editnotes" element={<EditNotes />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
