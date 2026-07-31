# RTOS Edge AI Balancing Robot — Proje Sitesi

TOBB Ekonomi ve Teknoloji Üniversitesi BİL/YAP 495 projesi için hazırlanan Türkçe, erişilebilir ve mobil uyumlu kamu sitesi.

Proje; FreeRTOS tabanlı iki tekerlekli bir denge robotunda TinyML çıkarım yükünün gerçek zamanlı kontrol döngüsünün zamanlama determinizmine etkisini inceler.

## Yerel geliştirme

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Statik çıktı `dist/` klasöründe oluşturulur.

## Raporlar

PDF raporları `public/reports/` altında doğrudan erişilebilir:

- Proje Teklifi
- Proje Spesifikasyon Raporu
- Analiz Raporu
- Proje Kısıt ve Etkiler Planı
- Yüksek Seviye Tasarım Raporu

DOCX dosyaları ile Düşük Seviye Tasarım ve Final raporları henüz eklenmemiştir. Site, bulunmayan dosyalar için bozuk bağlantı yerine “Hazırlanıyor” durumu gösterir.
