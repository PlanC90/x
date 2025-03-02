import React, { createContext, useContext, useState, useEffect } from 'react';

interface Stats {
  totalLikes: number;
  totalReplies: number;
  accountsMonitored: number;
  responsesAvailable: number;
  dailyStats: Array<{ date: string; likes: number; replies: number }>;
}

interface StatsContextType {
  stats: Stats;
  isLoading: boolean;
  refreshStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>({
    totalLikes: 0,
    totalReplies: 0,
    accountsMonitored: 0,
    responsesAvailable: 0,
    dailyStats: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch stats from your API
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        setStats({
          totalLikes: 1247,
          totalReplies: 583,
          accountsMonitored: 15,
          responsesAvailable: 42,
          dailyStats: [
            { date: '2025-01-01', likes: 45, replies: 23 },
            { date: '2025-01-02', likes: 52, replies: 31 },
            { date: '2025-01-03', likes: 61, replies: 28 },
            { date: '2025-01-04', likes: 67, replies: 35 },
            { date: '2025-01-05', likes: 72, replies: 42 },
            { date: '2025-01-06', likes: 58, replies: 30 },
            { date: '2025-01-07', likes: 63, replies: 37 }
          ]
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refreshStats = () => {
    fetchStats();
  };

  return (
    <StatsContext.Provider value={{ stats, isLoading, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
