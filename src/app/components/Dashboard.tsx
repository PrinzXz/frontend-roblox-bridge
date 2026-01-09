import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Webhook, 
  LogOut, 
  Copy, 
  CheckCircle2, 
  Settings, 
  Activity,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";

interface DashboardProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
  onLogout: () => void;
}

interface UserConfig {
  robloxApiKey: string;
  placeId: string;
  sociabuzzToken: string;
}

interface WebhookLog {
  id: string;
  timestamp: string;
  supporter: string;
  amount: number;
  message: string;
  status: "success" | "failed";
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [config, setConfig] = useState<UserConfig>({
    robloxApiKey: "",
    placeId: "",
    sociabuzzToken: "",
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [saved, setSaved] = useState(false);

  // IMPORTANT: Ganti dengan URL backend Anda setelah deploy
  // Contoh: https://webhook-bridge-backend.up.railway.app
  const backendUrl = "https://eugen-roblox-brigde-production.up.railway.app";
  const webhookUrl = `${backendUrl}/api/bridge/${user.id}`;

  useEffect(() => {
    // Load config from localStorage (mock)
    const savedConfig = localStorage.getItem(`config_${user.id}`);
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    // Load mock webhook logs
    const mockLogs: WebhookLog[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        supporter: "Ahmad Hidayat",
        amount: 50000,
        message: "Semangat terus bang!",
        status: "success",
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        supporter: "Budi Santoso",
        amount: 100000,
        message: "Keren gamenya!",
        status: "success",
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        supporter: "Siti Nurhaliza",
        amount: 25000,
        message: "",
        status: "success",
      },
    ];
    setWebhookLogs(mockLogs);
  }, [user.id]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config.robloxApiKey || !config.placeId || !config.sociabuzzToken) {
      toast.error("Semua field harus diisi");
      return;
    }

    // Save to localStorage (mock)
    localStorage.setItem(`config_${user.id}`, JSON.stringify(config));
    setSaved(true);
    toast.success("Konfigurasi berhasil disimpan!");
    
    setTimeout(() => setSaved(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Berhasil disalin ke clipboard!");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Webhook className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">WebhookBridge</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Kelola webhook dan konfigurasi API Anda</p>
        </div>

        <Tabs defaultValue="webhook" className="space-y-6">
          <TabsList>
            <TabsTrigger value="webhook">
              <Webhook className="w-4 h-4 mr-2" />
              Webhook Info
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Konfigurasi
            </TabsTrigger>
            <TabsTrigger value="logs">
              <Activity className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Webhook Info Tab */}
          <TabsContent value="webhook">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook URL Anda</CardTitle>
                  <CardDescription>
                    Gunakan URL ini di SociaBuzz webhook settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={webhookUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={() => copyToClipboard(webhookUrl)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Paste URL ini ke halaman webhook settings di SociaBuzz. 
                      Pastikan Anda sudah menyimpan konfigurasi API di tab "Konfigurasi".
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User ID</CardTitle>
                  <CardDescription>
                    ID unik Anda untuk routing webhook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={user.id}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" onClick={() => copyToClipboard(user.id)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cara Menggunakan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Lengkapi konfigurasi API di tab "Konfigurasi"</li>
                    <li>Copy webhook URL di atas</li>
                    <li>Buka dashboard SociaBuzz → Settings → Webhook</li>
                    <li>Paste webhook URL dan simpan</li>
                    <li>Setiap donasi akan otomatis dikirim ke Roblox game Anda!</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Konfigurasi API</CardTitle>
                <CardDescription>
                  Simpan kredensial Roblox dan SociaBuzz Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveConfig} className="space-y-6">
                  {saved && (
                    <Alert className="bg-green-50 text-green-900 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        Konfigurasi berhasil disimpan!
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="robloxApiKey">
                      Roblox API Key
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="robloxApiKey"
                        type={showApiKey ? "text" : "password"}
                        placeholder="Paste your Roblox Open Cloud API Key"
                        value={config.robloxApiKey}
                        onChange={(e) =>
                          setConfig({ ...config, robloxApiKey: e.target.value })
                        }
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showApiKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Dapatkan di: Roblox Creator Dashboard → Open Cloud → API Keys
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeId">
                      Place ID (Universe ID)
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="placeId"
                      type="text"
                      placeholder="8835877189"
                      value={config.placeId}
                      onChange={(e) =>
                        setConfig({ ...config, placeId: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-gray-500">
                      ID universe Roblox game Anda
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sociabuzzToken">
                      SociaBuzz Webhook Token
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="sociabuzzToken"
                        placeholder="sbwhook-..."
                        value={config.sociabuzzToken}
                        onChange={(e) =>
                          setConfig({ ...config, sociabuzzToken: e.target.value })
                        }
                        className="pr-10 font-mono text-sm"
                        rows={3}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      >
                        {showToken ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Token untuk verifikasi webhook dari SociaBuzz
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    {saved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Tersimpan!
                      </>
                    ) : (
                      "Simpan Konfigurasi"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>History Webhook</CardTitle>
                <CardDescription>
                  Log donasi yang diterima (Demo data)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {webhookLogs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada webhook yang diterima</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {webhookLogs.map((log) => (
                      <div
                        key={log.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {log.supporter}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(log.timestamp)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-green-600">
                              {formatCurrency(log.amount)}
                            </p>
                            <Badge
                              variant={
                                log.status === "success" ? "default" : "destructive"
                              }
                              className="mt-1"
                            >
                              {log.status}
                            </Badge>
                          </div>
                        </div>
                        {log.message && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-2">
                            💬 {log.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}