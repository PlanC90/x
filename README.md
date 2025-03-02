# Twitter Otomatik Etkileşim Botu

Twitter API ile bağlantı kurarak kullanıcıların hesap.json dosyasına eklenmiş hesaplarının attığı tüm tweetleri otomatik olarak beğenir ve cevap.json dosyasına eklenmiş önceden belirlenmiş tweetlerden rastgele birini seçerek ilgili tweetlere yanıt olarak ekler.

## Özellikler

- **Otomatik Etkileşim**: İzlenen hesaplardan gelen tweetleri otomatik olarak beğenme ve yanıtlama
- **Modern Gösterge Paneli**: İstatistikleri takip etme, hesapları yönetme ve yanıtları özelleştirme
- **Gerçek Zamanlı İzleme**: Günlükleri ve etkileşim metriklerini gerçek zamanlı görüntüleme
- **Özelleştirilebilir Ayarlar**: Kontrol aralıkları, hız limitleri ve daha fazlasını yapılandırma

## Teknoloji Yığını

- **Frontend**: React ve Tailwind CSS
- **Backend**: Python FastAPI
- **Grafikler**: Recharts veri görselleştirme
- **İkonlar**: Lucide React

## Başlarken

### Gereksinimler

- Node.js (v16+)
- Python (v3.8+)

### Kurulum

1. Depoyu klonlayın
2. Frontend bağımlılıklarını yükleyin:

```bash
npm install
```

3. Backend bağımlılıklarını yükleyin:

```bash
cd backend
pip install -r requirements.txt
```

### Uygulamayı Çalıştırma

1. Backend sunucusunu başlatın:

```bash
npm run server
```

2. Ayrı bir terminalde, frontend geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Gösterge paneline http://localhost:5173 adresinden erişin

### Demo Bilgileri

- Kullanıcı Adı: `admin`
- Şifre: `password`

## Proje Yapısı

- `/src` - Frontend React uygulaması
  - `/components` - Yeniden kullanılabilir UI bileşenleri
  - `/context` - React context sağlayıcıları
  - `/layouts` - Sayfa düzenleri
  - `/pages` - Uygulama sayfaları
- `/backend` - Python FastAPI sunucusu
  - `/data` - JSON veri dosyaları (otomatik oluşturulur)

## Yapılandırma

Bot, gösterge panelindeki Ayarlar sayfası üzerinden yapılandırılabilir. Kullanılabilir ayarlar şunları içerir:

- Kontrol aralığı (yeni tweetleri ne sıklıkta tarayacağı)
- Günlük maksimum beğeni ve yanıt sayısı
- Bildirim ayarları
- Zamanlama ayarları (gece duraklatma)

## Twitter Hesap Bilgilerini Ekleme

Twitter hesap bilgilerinizi eklemek için:

1. [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)'dan bir geliştirici hesabı oluşturun
2. Yeni bir uygulama oluşturun ve API anahtarlarınızı alın
3. Ayarlar sayfasından aşağıdaki bilgileri girin:
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Access Token
   - Access Token Secret
4. Hesaplar sayfasından izlemek istediğiniz Twitter hesaplarını ekleyin
5. Yanıtlar sayfasından otomatik yanıt şablonlarını ekleyin

## Lisans

MIT
