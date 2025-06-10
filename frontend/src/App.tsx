import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useThemeStore } from "./store/themeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogInPage /> : <Navigate to={"/"} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
