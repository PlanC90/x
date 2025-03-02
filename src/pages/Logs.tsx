import React, { useState } from 'react';
import { RefreshCw, Download, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details?: string;
}

const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2025-01-07 14:32:45',
    level: 'info',
    message: 'Bot başarıyla başlatıldı',
    details: 'Bot servisi 3 hesap ve 5 yanıt şablonu ile başlatıldı'
  },
  {
    id: '2',
    timestamp: '2025-01-07 14:35:12',
    level: 'success',
    message: '@elonmusk\'tan gelen tweet beğenildi',
    details: 'Tweet ID: 1234567890'
  },
  {
    id: '3',
    timestamp: '2025-01-07 14:37:28',
    level: 'success',
    message: '@BillGates\'ten gelen tweete yanıt verildi',
    details: 'Tweet ID: 9876543210, Yanıt: "Harika bir bakış açısı! Perspektifinize tamamen katılıyorum."'
  },
  {
    id: '4',
    timestamp: '2025-01-07 14:42:15',
    level: 'warning',
    message: 'Hız limiti yaklaşıyor',
    details: 'Mevcut kullanım: Kullanılabilir hız limitinin %85\'i'
  },
  {
    id: '5',
    timestamp: '2025-01-07 14:55:33',
    level: 'error',
    message: 'Tweet beğenilemedi',
    details: 'Tweet ID: 5678901234, Hata: Tweet silinmiş'
  },
  {
    id: '6',
    timestamp: '2025-01-07 15:01:47',
    level: 'info',
    message: 'Yeni tweetler kontrol ediliyor',
    details: '3 hesap için zaman çizelgesi taranıyor'
  },
  {
    id: '7',
    timestamp: '2025-01-07 15:05:22',
    level: 'success',
    message: '@tim_cook\'tan gelen tweet beğenildi',
    details: 'Tweet ID: 2468013579'
  }
];

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(mockLogs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const refreshLogs = () => {
    setIsLoading(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const downloadLogs = () => {
    // Günlük verileriyle bir blob oluştur
    const logsText = logs.map(log => 
      `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}${log.details ? ` - ${log.details}` : ''}`
    ).join('\n');
    
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Geçici bir bağlantı oluştur ve indirmeyi tetikle
    const a = document.createElement('a');
    a.href = url;
    a.download = 'twitter-bot-gunlukler.txt';
    document.body.appendChild(a);
    a.click();
    
    // Temizlik
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleLogDetails = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredLogs = filterLevel === 'all' 
    ? logs 
    : logs.filter(log => log.level === filterLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sistem Günlükleri</h1>
        <div className="flex space-x-2">
          <button 
            onClick={refreshLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>
          <button 
            onClick={downloadLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>İndir</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-2 mb-4">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Seviyeler</option>
            <option value="info">Bilgi</option>
            <option value="success">Başarılı</option>
            <option value="warning">Uyarı</option>
            <option value="error">Hata</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className={`border rounded-md overflow-hidden ${
                  log.level === 'error' 
                    ? 'border-red-200 bg-red-50' 
                    : log.level === 'warning'
                    ? 'border-yellow-200 bg-yellow-50'
                    : log.level === 'success'
                    ? 'border-green-200 bg-green-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer flex items-start"
                  onClick={() => toggleLogDetails(log.id)}
                >
                  <div className="mr-3 mt-0.5">
                    {getLogIcon(log.level)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{log.message}</span>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                    {expandedLogId === log.id && log.details && (
                      <div className="mt-2 text-sm text-gray-600 bg-white p-3 rounded border">
                        {log.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">Seçilen filtre ile günlük bulunamadı.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
