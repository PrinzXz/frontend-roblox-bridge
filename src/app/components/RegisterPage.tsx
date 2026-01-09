import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Webhook, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface APIUser {
  id: string | number;
  name: string;
  email: string;
}

interface RegisterPageProps {
  onRegister: (user: APIUser) => void;
  onBackToHome: () => void;
  onLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToHome, onLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
  
    // Validasi Input
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    try {
      
      const response = await fetch("https://eugen-roblox-brigde-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

    // 2. Jika berhasil
      setSuccess(true);
      setTimeout(() => {
        onRegister(data.user);
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Webhook className="w-12 h-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Daftar WebhookBridge</CardTitle>
          <CardDescription>
            Buat akun gratis dan mulai terima donasi di Roblox
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

            {success && (
              <Alert className="bg-green-50 text-green-900 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  Registrasi berhasil! Mengalihkan ke dashboard...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={success}>
              {success ? "Berhasil!" : "Daftar Sekarang"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={onLogin}
                  className="text-blue-600 hover:underline"
                >
                  Masuk di sini
                </button>
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
