import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Zap, Eye, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  const liveTickers = [
    { text: 'Garanti BBVA Kurumsal • 1.250.000 ₺ Çek Doğrulandı', status: 'clean', time: '10 sn önce' },
    { text: 'Adana / İkiz Çek Uyarısı • 4.800.000 ₺ Manyetik MICR Uyuşmazlığı Engellendi', status: 'danger', time: '2 dk önce' },
    { text: 'İkitelli OSB • 850.000 ₺ Alacak Temlik İskonto Simülasyonu Tamamlandı', status: 'factoring', time: '4 dk önce' },
    { text: 'Ziraat Bankası • 3.100.000 ₺ Karekod KKB Geçmişi: 10/10 Kusursuz Sicil', status: 'clean', time: '6 dk önce' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentTicker = liveTickers[tickerIndex];

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 lg:pt-16 pb-12 lg:pb-20">
      {/* Real-time Commercial Intelligence Ticker */}
      <div className="mb-8 p-2.5 sm:p-3 rounded-full bg-[#FAF7EE] border border-[#EAE5DD] flex items-center justify-between gap-4 overflow-hidden shadow-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1f8a5b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1f8a5b]"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-[#0E1E33] hidden sm:inline">
            CANLI İSTİHBARAT AKIŞI:
          </span>
        </div>

        <div className="flex-1 flex items-center justify-between text-[11px] sm:text-[12px] font-mono text-[#0E1E33]/90 truncate">
          <span className="truncate flex items-center gap-2">
            {currentTicker.status === 'clean' && <CheckCircle2 size={13} className="text-[#1f8a5b] shrink-0" />}
            {currentTicker.status === 'danger' && <XCircle size={13} className="text-[#b83232] shrink-0" />}
            {currentTicker.status === 'factoring' && <Sparkles size={13} className="text-[#a56b13] shrink-0" />}
            <strong className="font-semibold">{currentTicker.text}</strong>
          </span>
          <span className="text-[10px] text-[#6B7A90] shrink-0 hidden md:inline ml-2">{currentTicker.time}</span>
        </div>

        <button
          onClick={() => onNavigate('core-zero')}
          className="text-[10px] font-mono text-[#0E1E33] font-semibold hover:underline shrink-0 hidden lg:flex items-center gap-1"
        >
          <span>Kokpite Git</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-end">
        {/* Left Typography & Value Proposition */}
        <div className="space-y-6">
          <div className="text-[10px] lg:text-[11px] font-mono tracking-[0.22em] text-[#6B7A90] uppercase flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0E1E33] inline-block"></span>
            <span>EST. 2026 / İSTANBUL — TİCARİ KARAR & İHTİYAT SİSTEMİ</span>
          </div>

          <h1 className="serif text-[#0E1E33] leading-[0.85] tracking-[-0.04em] font-normal">
            <span className="block text-[58px] sm:text-[84px] lg:text-[116px]">Ticaret</span>
            <span className="block text-[58px] sm:text-[84px] lg:text-[116px] -mt-2">aceleyi</span>
            <span className="block text-[58px] sm:text-[84px] lg:text-[116px] -mt-2 flex flex-wrap items-baseline gap-4 sm:gap-6">
              <span>sevmez.</span>
              <span className="serif italic text-[22px] sm:text-[30px] lg:text-[38px] font-normal text-[#0E1E33]/70 tracking-[-0.02em] -translate-y-2 lg:-translate-y-4">
                Karar vermeden<br className="hidden sm:inline" /> önce.
              </span>
            </span>
          </h1>

          <p className="text-[15px] sm:text-[17px] leading-[1.65] text-[#0E1E33]/85 max-w-[62ch] font-sans">
            Anadolu’da ticaret asırlardır önce temkinle, basiretle yapılır. Biz bu ihtiyatı 30 bankanın optik güvenlik klişesi, 365nm UV mor ışık spektrometrisi, ciro zinciri tespiti ve faktoring simülatörüyle dijitalleştirdik.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('core-zero')}
              className="h-13 px-8 rounded-full bg-[#0E1E33] text-white text-[14px] font-mono font-medium flex items-center gap-2 hover:bg-[#0E1E33]/90 transition shadow-md hover:scale-[1.02]"
            >
              <Zap size={16} className="text-[#25D366]" />
              <span>Optik Kokpit v4.0'ı Aç</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => onNavigate('analyzer')}
              className="h-13 px-7 rounded-full bg-white border border-[#EAE5DD] text-[#0E1E33] text-[14px] font-mono font-medium hover:bg-black/5 transition shadow-xs"
            >
              <span>Hemen Çek Tara</span>
            </button>

            <button
              onClick={() => onNavigate('brand-gallery')}
              className="h-13 px-6 rounded-full border border-transparent text-[#6B7A90] hover:text-[#0E1E33] text-[13px] font-mono font-medium transition flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Görsel Vitrin</span>
            </button>
          </div>
        </div>

        {/* Right Luxury Brand Artwork Card & Quick Stats */}
        <div className="space-y-4">
          <div
            onClick={() => onNavigate('brand-gallery')}
            className="group relative rounded-[24px] overflow-hidden bg-[#0E1E33] border border-[#EAE5DD] shadow-lg cursor-pointer transition transform hover:-translate-y-1"
          >
            <img
              src="/MAI_7223272f335c0a21.png"
              alt="Temkin Vizyon Posteri"
              className="w-full h-[320px] object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E33] via-[#0E1E33]/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  VİZYON & İHTİYAT
                </span>
                <span className="text-[11px] font-mono text-white/70 flex items-center gap-1">
                  <span>İncele</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <h3 className="serif text-[20px] text-white m-0">Doğru Yön. Güçlü Yarınlar.</h3>
              <p className="text-[12px] text-white/75 line-clamp-1 font-sans">
                Sağlam Duruş • Geniş Bakış • Ölçülü Adımlar
              </p>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
            <div className="p-3 rounded-[16px] bg-white border border-[#EAE5DD] shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f8a5b]" />
              <div>
                <strong className="block text-[#0E1E33]">30 Banka Profili</strong>
                <span className="text-[10px] text-[#6B7A90]">Klişe & Filigran</span>
              </div>
            </div>
            <div className="p-3 rounded-[16px] bg-white border border-[#EAE5DD] shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              <div>
                <strong className="block text-[#0E1E33]">0.04 ms Yanıt</strong>
                <span className="text-[10px] text-[#6B7A90]">WASM C++ Hızı</span>
              </div>
            </div>
            <div className="p-3 rounded-[16px] bg-white border border-[#EAE5DD] shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
              <div>
                <strong className="block text-[#0E1E33]">365nm UV Spektrum</strong>
                <span className="text-[10px] text-[#6B7A90]">Görünmez Lifler</span>
              </div>
            </div>
            <div className="p-3 rounded-[16px] bg-white border border-[#EAE5DD] shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eab308]" />
              <div>
                <strong className="block text-[#0E1E33]">Ciro Zinciri & Ağ</strong>
                <span className="text-[10px] text-[#6B7A90]">Konkordato Riski</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

