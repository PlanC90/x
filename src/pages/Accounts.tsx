import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Account {
  id: string;
  username: string;
  name: string;
  avatar: string;
  status: 'active' | 'paused';
  lastChecked: string;
  tweetsLiked: number;
  tweetsReplied: number;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    username: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'active',
    lastChecked: '2 dakika önce',
    tweetsLiked: 127,
    tweetsReplied: 43
  },
  {
    id: '2',
    username: 'BillGates',
    name: 'Bill Gates',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'active',
    lastChecked: '5 dakika önce',
    tweetsLiked: 98,
    tweetsReplied: 37
  },
  {
    id: '3',
    username: 'tim_cook',
    name: 'Tim Cook',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'paused',
    lastChecked: '1 saat önce',
    tweetsLiked: 76,
    tweetsReplied: 29
  }
];

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddAccountForm, setShowAddAccountForm] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState({
    username: '',
    name: '',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  });
  const { twitterAuth } = useAuth();

  const handleAddAccount = async () => {
    if (newAccount.username && newAccount.name) {
      const account: Account = {
        id: Date.now().toString(),
        username: newAccount.username,
        name: newAccount.name,
        avatar: newAccount.avatar,
        status: 'active',
        lastChecked: 'Henüz kontrol edilmedi',
        tweetsLiked: 0,
        tweetsReplied: 0
      };
      
      setAccounts([...accounts, account]);
      setNewAccount({
        username: '',
        name: '',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      });
      setShowAddAccountForm(false);
    }
  };

  const handleTwitterAuth = async () => {
    try {
      await twitterAuth();
      // Gerçek uygulamada, bu Twitter OAuth'a yönlendirecek
      // ve başarılı kimlik doğrulamasından sonra hesabı ekleyecek
      setShowAddAccountForm(true);
    } catch (error) {
      console.error('Hesap eklenemedi:', error);
    }
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { 
            ...account, 
            status: account.status === 'active' ? 'paused' : 'active' 
          } 
        : account
    ));
  };

  const refreshAccounts = () => {
    setIsLoading(true);
    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">İzlenen Hesaplar</h1>
        <div className="flex space-x-2">
          <button 
            onClick={refreshAccounts}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>
          <button 
            onClick={handleTwitterAuth}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Hesap Ekle</span>
          </button>
        </div>
      </div>

      {showAddAccountForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Yeni Twitter Hesabı Ekle</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı (@kullanıcıadı)
              </label>
              <input
                type="text"
                id="username"
                value={newAccount.username}
                onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="örn: elonmusk"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Görünen Ad
              </label>
              <input
                type="text"
                id="name"
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="örn: Elon Musk"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddAccountForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleAddAccount}
                disabled={!newAccount.username || !newAccount.name}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                Hesabı Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hesap
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Kontrol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etkileşim
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={account.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">@{account.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {account.status === 'active' ? 'Aktif' : 'Duraklatıldı'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {account.lastChecked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="font-medium">{account.tweetsLiked}</span> beğeni
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{account.tweetsReplied}</span> yanıt
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => window.open(`https://twitter.com/${account.username}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(account.id)}
                        className={`${
                          account.status === 'active' 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {account.status === 'active' ? 'Duraklat' : 'Aktifleştir'}
                      </button>
                      <button 
                        onClick={() => handleRemoveAccount(account.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {accounts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Henüz hesap eklenmemiş.</p>
              <button 
                onClick={handleTwitterAuth}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Twitter Hesabı Ekle
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accounts;
