import React, { useState } from 'react';
import { Eye, ShieldCheck, Sparkles, SlidersHorizontal, Compass, Layers, CheckCircle2, Zap, ArrowRight, Sun, Moon } from 'lucide-react';

interface BrandPoster {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageSrc: string;
  aspect: string;
  highlights: string[];
  actionLabel: string;
  targetId: string;
}

export const BrandMediaGallerySection: React.FC = () => {
  const [selectedAspect, setSelectedAspect] = useState<'ALL' | '1:1' | '9:16'>('ALL');
  const [activePosterId, setActivePosterId] = useState<string>('quad');
  const [uvMode, setUvMode] = useState<boolean>(false);
  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);

  const posters: BrandPoster[] = [
    {
      id: 'quad',
      title: 'Dört Temel Karar Sütunu',
      subtitle: 'Çek İstihbaratı • Firma İstihbaratı • Risk Analizi • Alacak Finansmanı',
      category: '1:1 Kare Master Grid',
      description: 'Doğru bilgi ve güvenli kararla başlayan ticaret döngüsü: Büyüteçli mikroskobik çek doğrulaması, MERSİS/Ticaret Sicil dosya taraması, satranç stratejisiyle risk yönetimi ve temiz alacak finansmanı el sıkışması.',
      imageSrc: '/MAI_3f70d3468d867855.png',
      aspect: '1:1',
      highlights: ['Çek İstihbaratı (Optik Denetim)', 'Firma İstihbaratı (KKB/MERSİS)', 'Risk Analizi (37/100 Skor)', 'Alacak Finansmanı (Faktoring)'],
      actionLabel: 'Karar Modüllerini İncele',
      targetId: 'moduller'
    },
    {
      id: 'vision',
      title: 'Doğru Yön. Güçlü Yarınlar.',
      subtitle: 'Yönümüz Güven — Temkin, sağlam kararlarla geleceği inşa eder.',
      category: '9:16 Dikey Vizyon Posteri',
      description: 'İstanbul Boğazı ve tarihi silüete dürbünle bakan vizyoner tüccar: "Doğru Yön / Net Hedef", "Sağlam Duruş / Sürdürülebilir Değer" ve "Geniş Bakış / Güçlü Gelecek" pusulası.',
      imageSrc: '/MAI_7223272f335c0a21.png',
      aspect: '9:16',
      highlights: ['Pusula & İhtiyat', 'Deniz Feneri & Sağlam Duruş', 'Dürbün & Geniş Bakış', 'Ölçülü Adımlar'],
      actionLabel: 'Temkin Manifestosunu Oku',
      targetId: 'manifesto'
    },
    {
      id: 'watermark',
      title: 'Kabartma Filigran & Güvenlik Spektrumu',
      subtitle: 'Atatürk Rölyefi • Ay-Yıldız Kabartma • Banka İntaglio Baskı',
      category: '1:1 Makro Optik Yakın Çekim',
      description: 'Kağıt dokusunda 365nm UV mor ışık altında parlayan lifler, intaglio kabartmalı ay-yıldız, mikro-baskı güvenlik desenleri ve makro seviyede tahrifat koruması.',
      imageSrc: '/MAI_dd6d9b651326aea5.png',
      aspect: '1:1',
      highlights: ['Ay-Yıldız Kabartma Rölyef', 'UV 365nm Floresan Lifler', 'MICR Manyetik Şerit', 'Giyos & Güvenlik Deseni'],
      actionLabel: 'Optik Kokpit v4.0 ile Tara',
      targetId: 'core-zero'
    }
  ];

  const filteredPosters = selectedAspect === 'ALL'
    ? posters
    : posters.filter(p => p.aspect === selectedAspect);

  const activePoster = posters.find(p => p.id === activePosterId) || posters[0];

  const handleScrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="brand-gallery" className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 bg-[#FAF7EE] border-t border-b border-[#EAE5DD]">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 border-b border-[#EAE5DD] pb-6">
        <div>
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#6B7A90] uppercase mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0E1E33] inline-block" />
            <span>KURUMSAL MARKA KİMLİĞİ & OPTİK GÖRSEL VİTRİNİ</span>
          </div>
          <h2 className="serif text-[36px] sm:text-[48px] lg:text-[56px] leading-[0.95] text-[#0E1E33] tracking-[-0.03em] m-0">
            Temkin Görsel Evreni
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6B7A90] mt-3 max-w-[65ch]">
            Yüksek çözünürlüklü marka kimliği, makro optik filigran taramaları ve adli spektrum posterleri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', '1:1', '9:16'].map((aspect) => (
            <button
              key={aspect}
              onClick={() => setSelectedAspect(aspect as any)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono transition-all font-semibold ${
                selectedAspect === aspect
                  ? 'bg-[#0E1E33] text-white shadow-xs'
                  : 'bg-white text-[#0E1E33] border border-[#EAE5DD] hover:bg-black/5'
              }`}
            >
              {aspect === 'ALL' ? 'Tüm Formatlar' : aspect}
            </button>
          ))}
        </div>
      </div>

      {/* Main Showcase */}
      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
        {/* Left: Featured Image Viewport */}
        <div className="rounded-[24px] bg-white border border-[#EAE5DD] p-4 lg:p-6 shadow-sm space-y-4">
          <div className="relative rounded-[18px] overflow-hidden bg-[#0E1E33] flex items-center justify-center group min-h-[420px]">
            <img
              src={activePoster.imageSrc}
              alt={activePoster.title}
              className={`w-full h-auto max-h-[580px] object-contain transition duration-500 group-hover:scale-[1.01] ${
                activePoster.id === 'watermark' && uvMode ? 'filter brightness-125 contrast-150 hue-rotate-180' : ''
              }`}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono border border-white/10 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a5b]" />
                <span>{activePoster.category}</span>
              </div>

              {activePoster.id === 'watermark' && (
                <button
                  onClick={() => setUvMode(!uvMode)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono border flex items-center gap-1.5 transition ${
                    uvMode
                      ? 'bg-purple-600/90 text-white border-purple-400 animate-pulse'
                      : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/80'
                  }`}
                >
                  {uvMode ? <Moon size={11} /> : <Sun size={11} />}
                  <span>{uvMode ? '365nm UV Spektrum Açık' : 'UV Mor Işık Simüle Et'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div>
              <h3 className="serif text-[22px] text-[#0E1E33] m-0">{activePoster.title}</h3>
              <p className="text-[12px] font-mono text-[#6B7A90] mt-0.5">{activePoster.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleScrollToTarget(activePoster.targetId)}
                className="flex-1 sm:flex-none h-10 px-5 rounded-full bg-[#0E1E33] text-white text-[12px] font-mono font-medium flex items-center justify-center gap-1.5 hover:bg-[#0E1E33]/90 transition"
              >
                <span>{activePoster.actionLabel}</span>
                <ArrowRight size={13} />
              </button>

              <a
                href={activePoster.imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-3.5 rounded-full bg-white border border-[#EAE5DD] text-[#0E1E33] text-[12px] font-mono font-medium flex items-center justify-center hover:bg-black/5 transition"
                title="Tam Boyut Gör"
              >
                <Eye size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Selection Cards & Information */}
        <div className="space-y-4">
          {filteredPosters.map((poster) => (
            <div
              key={poster.id}
              onClick={() => setActivePosterId(poster.id)}
              className={`p-4 rounded-[20px] border transition-all cursor-pointer flex gap-4 items-center ${
                activePoster.id === poster.id
                  ? 'bg-white border-[#0E1E33] shadow-md ring-1 ring-[#0E1E33]/20'
                  : 'bg-white/60 border-[#EAE5DD] hover:bg-white'
              }`}
            >
              <img
                src={poster.imageSrc}
                alt={poster.title}
                className="w-20 h-20 rounded-[12px] object-cover border border-[#EAE5DD] shrink-0"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#F5F1E9] text-[#0E1E33] font-semibold">
                    {poster.aspect}
                  </span>
                  {activePoster.id === poster.id && (
                    <CheckCircle2 size={15} className="text-[#1f8a5b]" />
                  )}
                </div>
                <h4 className="font-semibold text-[14px] text-[#0E1E33] leading-snug">
                  {poster.title}
                </h4>
                <p className="text-[11px] text-[#6B7A90] line-clamp-2 leading-relaxed font-sans m-0">
                  {poster.description}
                </p>
              </div>
            </div>
          ))}

          {/* Active Highlight Chips */}
          <div className="p-5 rounded-[20px] bg-white border border-[#EAE5DD] space-y-3 font-mono">
            <span className="text-[11px] text-[#6B7A90] uppercase font-bold tracking-wider block">
              Görsel Güvenlik & İhtiyat Öğeleri
            </span>
            <div className="flex flex-wrap gap-2">
              {activePoster.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#FAF7EE] border border-[#EAE5DD] text-[11px] text-[#0E1E33] flex items-center gap-1.5"
                >
                  <ShieldCheck size={12} className="text-[#1f8a5b]" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

