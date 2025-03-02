import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Response {
  id: string;
  text: string;
  usageCount: number;
  lastUsed: string | null;
}

const mockResponses: Response[] = [
  {
    id: '1',
    text: 'Harika bir bakış açısı! Perspektifinize tamamen katılıyorum.',
    usageCount: 27,
    lastUsed: '2 saat önce'
  },
  {
    id: '2',
    text: 'Bunu paylaştığınız için teşekkürler! Çok bilgilendirici.',
    usageCount: 19,
    lastUsed: '5 saat önce'
  },
  {
    id: '3',
    text: 'İlginç bir yaklaşım! Daha önce bu şekilde düşünmemiştim.',
    usageCount: 15,
    lastUsed: '1 gün önce'
  },
  {
    id: '4',
    text: 'Tam da bugün duymam gereken şey buydu. Teşekkürler!',
    usageCount: 12,
    lastUsed: '2 gün önce'
  },
  {
    id: '5',
    text: 'Bu konu hakkındaki düşüncelerinizi paylaştığınız için teşekkür ederim.',
    usageCount: 8,
    lastUsed: null
  }
];

const Responses: React.FC = () => {
  const [responses, setResponses] = useState<Response[]>(mockResponses);
  const [newResponse, setNewResponse] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      const response: Response = {
        id: Date.now().toString(),
        text: newResponse,
        usageCount: 0,
        lastUsed: null
      };
      setResponses([...responses, response]);
      setNewResponse('');
    }
  };

  const handleRemoveResponse = (id: string) => {
    setResponses(responses.filter(response => response.id !== id));
  };

  const startEditing = (response: Response) => {
    setEditingId(response.id);
    setEditText(response.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setResponses(responses.map(response => 
        response.id === id 
          ? { ...response, text: editText } 
          : response
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Yanıt Şablonları</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Yeni Yanıt Ekle</h2>
        <div className="flex space-x-2">
          <textarea
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Yeni bir yanıt şablonu girin..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={handleAddResponse}
            disabled={!newResponse.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yanıt Metni
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanım Sayısı
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Kullanım
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {responses.map((response) => (
              <tr key={response.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {editingId === response.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{response.text}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{response.usageCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {response.lastUsed || 'Hiç kullanılmadı'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {editingId === response.id ? (
                      <>
                        <button 
                          onClick={() => saveEdit(response.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={cancelEditing}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => startEditing(response)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleRemoveResponse(response.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {responses.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">Henüz yanıt şablonu eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Responses;
