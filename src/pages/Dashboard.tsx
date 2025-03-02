import React from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Users, 
  MessageCircle, 
  RefreshCw 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useStats } from '../context/StatsContext';

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { stats, isLoading, refreshStats } = useStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gösterge Paneli</h1>
        <button 
          onClick={refreshStats}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Yenile</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Toplam Beğeni" 
              value={stats.totalLikes.toLocaleString()} 
              icon={<ThumbsUp className="h-6 w-6 text-white" />} 
              color="bg-blue-500"
            />
            <StatCard 
              title="Toplam Yanıt" 
              value={stats.totalReplies.toLocaleString()} 
              icon={<MessageSquare className="h-6 w-6 text-white" />} 
              color="bg-green-500"
            />
            <StatCard 
              title="İzlenen Hesaplar" 
              value={stats.accountsMonitored} 
              icon={<Users className="h-6 w-6 text-white" />} 
              color="bg-purple-500"
            />
            <StatCard 
              title="Mevcut Yanıtlar" 
              value={stats.responsesAvailable} 
              icon={<MessageCircle className="h-6 w-6 text-white" />} 
              color="bg-yellow-500"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Etkileşim Aktivitesi (Son 7 Gün)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.dailyStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="likes" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                    name="Beğeniler"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="replies" 
                    stroke="#10b981" 
                    name="Yanıtlar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Son Aktiviteler</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md">
                    {i % 2 === 0 ? (
                      <ThumbsUp className="h-5 w-5 text-blue-500 mt-1" />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-green-500 mt-1" />
                    )}
                    <div>
                      <p className="font-medium">
                        {i % 2 === 0 ? 'Bir tweet beğenildi' : 'Bir tweete yanıt verildi'} @kullanici{i}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i} saat önce
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Bot Durumu</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Bot Durumu</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Çalışıyor
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Son Kontrol</span>
                  <span>5 dakika önce</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sonraki Kontrol</span>
                  <span>5 dakika içinde</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Hız Limiti</span>
                  <span>%87 kullanılabilir</span>
                </div>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    Botu Durdur
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
