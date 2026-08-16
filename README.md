# TEMKİN — Ticari Karar İstihbaratı ve Kambiyo Optik Spektrometri Platformu

> **"Ticaret aceleyi sevmez. Karar vermeden önce."**  
> Vadeli ticarette çek, firma istihbaratı, ciro zinciri kırılmaları, konkordato takibi ve faktoring temlik simülasyonu yapan hibrit karar platformu.

---

## 📌 Genel Bakış (Overview)

**TEMKİN**, Türkiye'deki KOBİ'lerin, sanayicilerin ve finans yöneticilerinin vadeli alacak risklerini minimize etmek amacıyla geliştirilmiş yeni nesil bir ticari karar istihbaratı sistemidir. 

Sistem iki ana eksende çalışır:
1. **Temkin Karar İstihbaratı**: MERSİS sorgusu, ciro zinciri takibi, KKB geçmişi ve karşılıksız çek kütüğü analizi ile **İLERLE**, **TEMKİNLİ İLERLE** ve **DUR** kararları üretir.
2. **Core-Zero Optik Kokpit v4.0**: WebAssembly ve makine öğrenmesi destekli mikroskobik optik spektrometri (365nm UV mor ışık, manyetik MICR şerit, holografik güvenlik şeridi, ikiz çek tespiti ve Merkle kriptografik defter mührü).

---

## 🚀 Öne Çıkan Özellikler (Key Features)

- **30+ Banka Optik Güvenlik Klişesi**: Ziraat, Garanti BBVA, İş Bankası, Yapı Kredi, Akbank, Vakıfbank, QNB ve diğer bankaların filigran, mikro-yazı ve intaglio baskı haritaları.
- **365nm UV Spektral Lif Analizi**: Morötesi ışık altında parlayan güvenlik liflerinin tespiti ve tahrifat kontrolü.
- **Ciro Silsilesi ve Konkordato Ağı Görselleştirmesi**: Çekin arkasındaki ciro zincirinde riskli halkaları, açılmış konkordato mühletlerini ve karşılıksız çek geçmişini ortaya çıkaran interaktif ağ grafiği (`CiroNetworkGraph`).
- **İkiz / Mükerrer Çek Radarı**: Aynı çek numarası ve manyetik imzanın farklı illerde veya eşzamanlı piyasaya sürülmesini engelleyen radar algoritması (`twinCheckDetector`).
- **Mali Temlik & Faktoring İskonto Simülatörü**: Vadeye kalan gün, risk puanı ve temlik komisyonu hesaplayan finansal iskonto motoru.
- **Resmi Tahkikat ve Adli İnceleme Raporu**: Karekodlu, SHA-256 Merkle root hash mühürlü ve IPFS uyumlu resmi PDF/yazdırılabilir rapor üretimi.
- **Temkin Bey Sesli Asistanı**: Web Speech API ile sonuçları Türkçe ve bilge bir tüccar tonuyla seslendiren entegre asistan.
- **Ticari Hafıza (Temkin Defteri)**: Daha önce taranan çeklerin, keşideci skorlarının ve tarihsel risk değişimlerinin kaydedildiği dijital arşiv.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4
- **İkonlar & Bileşenler**: Lucide React
- **Görüntü İşleme & Spektrometri**: Canvas 2D Pixel Manipulation, WebAssembly-ready Image Processing Engine
- **Kriptografi & Mühür**: SHA-256 Merkle Tree Ledger Simulator
- **Ses & Etkileşim**: Web Speech API Assistant Engine

---

## 💻 Kurulum ve Çalıştırma (Getting Started)

### Gereksinimler
- Node.js 18+ veya Bun

### Adımlar

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# TypeScript tip kontrolü
npm run lint

# Üretim derlemesi (Production Build)
npm run build
```

---

## 📂 Proje Dizin Yapısı (Project Structure)

```text
├── src/
│   ├── components/            # UI Bileşenleri
│   │   ├── BrandMediaGallerySection.tsx # Kurumsal Görsel Vitrin & Posterler
│   │   ├── CheckAnalyzer.tsx            # Çek Analiz Simülatörü & Hızlı Senaryolar
│   │   ├── CiroNetworkGraph.tsx         # Ciro Zinciri İnteraktif Ağ Grafiği
│   │   ├── ContactFooter.tsx            # İletişim & Harita Alanı
│   │   ├── CoreZeroOpticsStudio.tsx     # Optik Kokpit v4.0 (Spektrometri & ML)
│   │   ├── FactoringComparison.tsx      # Geleneksel Faktoring vs TEMKİN
│   │   ├── FactoringSimulatorModal.tsx  # İskonto & Maliyet Simülasyonu
│   │   ├── Header.tsx                   # Üst Gezinti & Canlı Durum
│   │   ├── Hero.tsx                     # Karar İstihbaratı Hero & Canlı Akış
│   │   ├── ManifestoSection.tsx         # Kurumsal Manifesto
│   │   ├── ModulesSection.tsx           # 4 Temel Modül Kartı
│   │   ├── OfficialReportModal.tsx      # Resmi PDF & Doğrulama Raporu
│   │   ├── TemkinBeyCard.tsx            # Temkin Bey Karakteri & Diyalog Kartı
│   │   ├── TemkinDefteriSection.tsx     # Ticari Hafıza ve Geçmiş Defteri
│   │   ├── TermTooltip.tsx              # Ticari Terim Sözlüğü Tooltip'i
│   │   └── VerbSection.tsx              # "Temkinlemek" Kavram Sözlüğü
│   ├── data/                  # Veri Modelleri & Banka Profilleri
│   │   ├── bankProfiles.ts              # 30+ Türk Bankası Güvenlik Klişeleri
│   │   ├── glossary.ts                  # Ticari & Kambiyo Terimler Sözlüğü
│   │   └── sampleData.ts                # Hazır Senaryolar & Temkin Bey Replikleri
│   ├── utils/                 # Matematiksel ve Spektral Algoritmalar
│   │   ├── audioSpeechAssistant.ts      # Türkçe Sesli Asistan Motoru
│   │   ├── cryptoLedger.ts              # Merkle Ağacı ve Kriptografik Defter
│   │   ├── imageProcessing.ts           # Optik Piksel Spektrometrisi & Doku
│   │   ├── mlDetector.ts                # Makine Öğrenmesi Sahtecilik Skoru
│   │   ├── ocrEngine.ts                 # OCR & Manyetik Şerit Eşleme
│   │   ├── qrCheckParser.ts             # Karekodlu Çek KKB Ayrıştırıcı
│   │   └── twinCheckDetector.ts         # İkiz Çek ve Mükerrer Kullanım Radarı
│   ├── App.tsx                # Ana Uygulama Kabuğu
│   ├── main.tsx               # Uygulama Giriş Noktası
│   ├── types.ts               # TypeScript Tip Tanımları
│   └── index.css              # Global Stiller ve Tailwind Konfigürasyonu
├── metadata.json              # Uygulama Meta Bilgisi
├── package.json               # Paket Bağımlılıkları ve Scriptler
└── vite.config.ts             # Vite Konfigürasyonu
```

---

## 📜 Lisans

Tüm hakları saklıdır © 2026 TEMKİN Ticari Karar İstihbaratı Sistemleri.
