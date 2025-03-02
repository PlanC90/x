import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

interface SettingsState {
  checkInterval: number;
  maxLikesPerDay: number;
  maxRepliesPerDay: number;
  enableNotifications: boolean;
  notificationEmail: string;
  pauseOvernight: boolean;
  pauseStart: string;
  pauseEnd: string;
  twitterApiKey: string;
  twitterApiSecret: string;
  twitterAccessToken: string;
  twitterAccessTokenSecret: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    checkInterval: 5,
    maxLikesPerDay: 50,
    maxRepliesPerDay: 20,
    enableNotifications: true,
    notificationEmail: 'kullanici@ornek.com',
    pauseOvernight: false,
    pauseStart: '22:00',
    pauseEnd: '07:00',
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessTokenSecret: ''
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      
      // 3 saniye sonra başarı mesajını sıfırla
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bot Ayarları</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Genel Ayarlar</h2>
            
            <div>
              <label htmlFor="checkInterval" className="block text-sm font-medium text-gray-700">
                Kontrol Aralığı (dakika)
              </label>
              <input
                type="number"
                id="checkInterval"
                name="checkInterval"
                value={settings.checkInterval}
                onChange={handleChange}
                min="1"
                max="60"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="maxLikesPerDay" className="block text-sm font-medium text-gray-700">
                Günlük Maksimum Beğeni
              </label>
              <input
                type="number"
                id="maxLikesPerDay"
                name="maxLikesPerDay"
                value={settings.maxLikesPerDay}
                onChange={handleChange}
                min="1"
                max="1000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="maxRepliesPerDay" className="block text-sm font-medium text-gray-700">
                Günlük Maksimum Yanıt
              </label>
              <input
                type="number"
                id="maxRepliesPerDay"
                name="maxRepliesPerDay"
                value={settings.maxRepliesPerDay}
                onChange={handleChange}
                min="1"
                max="500" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Bildirim Ayarları</h2>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableNotifications"
                name="enableNotifications"
                checked={settings.enableNotifications}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="enableNotifications" className="ml-2 block text-sm text-gray-700">
                E-posta Bildirimlerini Etkinleştir
              </label>
            </div>
            
            {settings.enableNotifications && (
              <div>
                <label htmlFor="notificationEmail" className="block text-sm font-medium text-gray-700">
                  Bildirim E-postası
                </label>
                <input
                  type="email"
                  id="notificationEmail"
                  name="notificationEmail"
                  value={settings.notificationEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div className="pt-4">
              <h2 className="text-lg font-semibold">Zamanlama Ayarları</h2>
              
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="pauseOvernight"
                  name="pauseOvernight"
                  checked={settings.pauseOvernight}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="pauseOvernight" className="ml-2 block text-sm text-gray-700">
                  Gece Botu Duraklat
                </label>
              </div>
              
              {settings.pauseOvernight && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pauseStart" className="block text-sm font-medium text-gray-700">
                      Duraklatma Başlangıç Saati
                    </label>
                    <input
                      type="time"
                      id="pauseStart"
                      name="pauseStart"
                      value={settings.pauseStart}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="pauseEnd" className="block text-sm font-medium text-gray-700">
                      Duraklatma Bitiş Saati
                    </label>
                    <input
                      type="time"
                      id="pauseEnd"
                      name="pauseEnd"
                      value={settings.pauseEnd}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Twitter API Bilgileri</h2>
          <p className="text-sm text-gray-600 mb-4">
            Twitter hesap bilgilerinizi eklemek için <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter Developer Portal</a>'dan alacağınız API anahtarlarını aşağıya girin.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="twitterApiKey" className="block text-sm font-medium text-gray-700">
                API Key (Consumer Key)
              </label>
              <input
                type="text"
                id="twitterApiKey"
                name="twitterApiKey"
                value={settings.twitterApiKey}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Twitter API Key"
              />
            </div>
            
            <div>
              <label htmlFor="twitterApiSecret" className="block text-sm font-medium text-gray-700">
                API Secret (Consumer Secret)
              </label>
              <input
                type="password"
                id="twitterApiSecret"
                name="twitterApiSecret"
                value={settings.twitterApiSecret}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Twitter API Secret"
              />
            </div>
            
            <div>
              <label htmlFor="twitterAccessToken" className="block text-sm font-medium text-gray-700">
                Access Token
              </label>
              <input
                type="text"
                id="twitterAccessToken"
                name="twitterAccessToken"
                value={settings.twitterAccessToken}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Twitter Access Token"
              />
            </div>
            
            <div>
              <label htmlFor="twitterAccessTokenSecret" className="block text-sm font-medium text-gray-700">
                Access Token Secret
              </label>
              <input
                type="password"
                id="twitterAccessTokenSecret"
                name="twitterAccessTokenSecret"
                value={settings.twitterAccessTokenSecret}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Twitter Access Token Secret"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Ayarları Kaydet</span>
              </>
            )}
          </button>
        </div>
        
        {isSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            Ayarlar başarıyla kaydedildi!
          </div>
        )}
      </form>
    </div>
  );
};

export default Settings;
