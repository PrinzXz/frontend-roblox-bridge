import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Dashboard } from "./components/Dashboard";
import { Toaster } from "./components/ui/sonner";

type Page = "landing" | "login" | "register" | "dashboard";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user: { id: string | number; name: string; email: string }) => {
    setUser({ ...user, id: String(user.id) });
    setCurrentPage("dashboard");
  };

  const handleRegister = (user: { id: string | number; name: string; email: string }) => {
    setUser({ ...user, id: String(user.id) });
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("landing");
  };

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage
          onLogin={() => setCurrentPage("login")}
          onRegister={() => setCurrentPage("register")}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onBackToHome={() => setCurrentPage("landing")}
          onRegister={() => setCurrentPage("register")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onRegister={handleRegister}
          onBackToHome={() => setCurrentPage("landing")}
          onLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "dashboard" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}

      <Toaster />
    </>
  );
}
