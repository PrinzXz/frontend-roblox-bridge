import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Webhook, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface APIUser {
  id: string | number;
  name: string;
  email: string;
}

interface LoginPageProps {
  onLogin: (user: APIUser) => void;
  onBackToHome: () => void;
  onRegister: () => void;
}

export function LoginPage({ onLogin, onBackToHome, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const response = await fetch("https://eugen-roblox-brigde-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login gagal");
      }

      onLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Webhook className="w-12 h-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Masuk ke Eugen Bridge</CardTitle>
          <CardDescription>
            Masukkan kredensial Anda untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Masuk
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Belum punya akun? Hubungi admin untuk pembuatan akun.
              </p>
              <button
                type="button"
                onClick={onBackToHome}
                className="text-sm text-gray-600 hover:underline"
              >
                Kembali ke beranda
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
