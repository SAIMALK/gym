import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import AddMember from "./screens/AddMember";
import MemberList from "./screens/MemberList";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import HomeScreen from "./screens/homeScreen";
import MemberDetailsView from "./screens/MemberDetailsView";
import EditMenber from "./screens/EditMember"
import EditMember from "./screens/EditMember";
import AttendanceView from "./screens/AttendanceView"
import Dashboard from "./screens/Dashboard";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 py-3">
      <Header isLoggedIn={isLoggedIn} logout={logout} />
        <Routes>
          <Route
            path="/"
            element={<HomeScreen onLogin={() => setIsLoggedIn(true)} />}
          />
           <Route
            path="/login"
            element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/add-member"
            element={
              <ProtectedRoute>
                <AddMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MemberList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member/:id"
            element={
              <ProtectedRoute>
                <MemberDetailsView />
              </ProtectedRoute>
            }
          />
           <Route
            path="/member/edit/:id"
            element={
              <ProtectedRoute>
                <EditMember />
              </ProtectedRoute>
            }
          />
           <Route
            path="/attendanceView"
            element={
              <ProtectedRoute>
                <AttendanceView />
              </ProtectedRoute>
            }
          />
           <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
