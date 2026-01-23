import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
<<<<<<< HEAD
=======
import Dashboard from "./pages/Dashboard";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";
import UserProfile from "./pages/UserProfile";
>>>>>>> cb7e353 (Notes features and UI changes)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
<<<<<<< HEAD
=======
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addnotes" element={<AddNotes />} />
        <Route path="/editnotes" element={<EditNotes />} />
        <Route path="/userprofile" element={<UserProfile />} />
>>>>>>> cb7e353 (Notes features and UI changes)
      </Routes>
    </Router>
  );
}

export default App;
