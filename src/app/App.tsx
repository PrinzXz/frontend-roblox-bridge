import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { Toaster } from "./components/ui/sonner";

type Page = "landing" | "login" | "dashboard";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      });
      setCurrentPage("dashboard");
    }
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
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onBackToHome={() => setCurrentPage("landing")}
        />
      )}

      {currentPage === "dashboard" && user && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}

      <Toaster />
    </>
  );
}