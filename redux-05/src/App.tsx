import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import ChatDemo from './pages/ChatDemo';
import OtpPage from './pages/OtpPage';
import MailPage from "./pages/MailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/chat" element={<ChatDemo />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/mail" element={<MailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
