import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, Webhook, Shield, Zap, Code, Users } from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Webhook className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">WebhookBridge</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onLogin}>
            Masuk
          </Button>
          <Button onClick={onRegister}>
            Daftar Gratis
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bridge SociaBuzz ke Roblox dengan Mudah
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform webhook multi-tenant yang memungkinkan Anda menerima notifikasi donasi SociaBuzz 
            langsung ke game Roblox Anda secara real-time.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={onRegister} className="px-8">
              Mulai Sekarang
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Lihat Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Fitur Unggulan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Real-time Webhook</CardTitle>
              <CardDescription>
                Terima notifikasi donasi secara instan dari SociaBuzz ke Roblox Messaging Service
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Aman & Terpercaya</CardTitle>
              <CardDescription>
                API key dan token Anda disimpan dengan enkripsi di database PostgreSQL yang aman
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Multi-Tenant</CardTitle>
              <CardDescription>
                Setiap pengguna mendapat webhook URL unik. Kelola multiple project dengan mudah
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Mudah Diintegrasikan</CardTitle>
              <CardDescription>
                Cukup copy webhook URL dan paste ke SociaBuzz. Tidak perlu coding!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Dashboard Intuitif</CardTitle>
              <CardDescription>
                Kelola konfigurasi, lihat history webhook, dan monitor status dengan mudah
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Webhook className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>No Downtime</CardTitle>
              <CardDescription>
                Server berjalan 24/7 dengan uptime tinggi. Webhook Anda selalu siap menerima donasi
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cara Kerja
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Daftar & Login</h3>
            <p className="text-gray-600">
              Buat akun gratis dan masuk ke dashboard Anda
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">Konfigurasi API</h3>
            <p className="text-gray-600">
              Masukkan Roblox API Key, Place ID, dan SociaBuzz Token
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Copy Webhook URL</h3>
            <p className="text-gray-600">
              Salin webhook URL unik Anda dan paste ke SociaBuzz
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-blue-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Siap Mulai Menerima Donasi?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Bergabung dengan ratusan developer Roblox yang sudah menggunakan WebhookBridge
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onRegister}
            className="px-8"
          >
            Daftar Sekarang - Gratis!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2026 WebhookBridge. Platform webhook multi-tenant untuk Roblox.</p>
        </div>
      </footer>
    </div>
  );
}
