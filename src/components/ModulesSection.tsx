import React from 'react';
import { TermTooltip } from './TermTooltip';

export const ModulesSection: React.FC = () => {
  return (
    <section id="moduller" className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-28">
      <div className="flex flex-wrap items-baseline justify-between gap-6 mb-12">
        <h2 className="serif text-[42px] sm:text-[64px] lg:text-[84px] leading-[0.9] tracking-[-0.04em] text-[#0E1E33]">
          Dört modül. Tek bir karar.
        </h2>
        <div className="text-[12px] font-mono tracking-[0.18em] text-[#6B7A90]">
          SİSTEM BİLEŞENLERİ / 01—04
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Module 01: ÇEK */}
        <div 
          id="cek" 
          className="rounded-[24px] border border-[#EAE5DD] p-8 lg:p-10 flex flex-col justify-between min-h-[360px] bg-white shadow-2xs hover:shadow-sm transition"
        >
          <div>
            <div className="flex items-start justify-between mb-8">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#6B7A90]">01</span>
              <span className="h-7 px-3.5 rounded-full bg-[#F5F1E9] text-[11px] font-mono tracking-wide flex items-center text-[#0E1E33]">
                ÇEK İSTİHBARATI
              </span>
            </div>
            <h3 className="serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.05] tracking-[-0.02em] text-[#0E1E33]">
              “Bu imza, bu bedeli taşır mı?”
            </h3>
          </div>

          <div className="space-y-4 mt-8">
            <p className="text-[14px] leading-[1.65] text-[#6B7A90] max-w-[34ch]">
              <TermTooltip termKey="kesideci">Keşideci analizi</TermTooltip>, <TermTooltip termKey="karsiliksiz_defter">karşılıksız çek defteri</TermTooltip>, <TermTooltip termKey="ciro_silsilesi">ciro silsilesi</TermTooltip> okuma ve vade–tutar uyumu. Ön ve arka yüzü yükleyin, belgenin gerçek hikayesini çıkaralım.
            </p>
            <ul className="text-[13px] leading-[1.65] text-[#0E1E33]/85 space-y-1.5 list-disc pl-4 font-mono">
              <li>Karşılıksız geçmişi ve açık icra davaları</li>
              <li>
                <TermTooltip termKey="ciro_silsilesi">Ciro zincirinde</TermTooltip> kırılma & riskli firma tespiti
              </li>
              <li>
                <TermTooltip termKey="belge_riski">Sahte / tahrifat</TermTooltip> optik tarama uyarı skoru
              </li>
            </ul>
          </div>
        </div>

        {/* Module 02: FİRMA */}
        <div 
          id="firma" 
          className="rounded-[24px] border border-[#EAE5DD] p-8 lg:p-10 flex flex-col justify-between min-h-[360px] bg-white shadow-2xs hover:shadow-sm transition"
        >
          <div>
            <div className="flex items-start justify-between mb-8">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#6B7A90]">02</span>
              <span className="h-7 px-3.5 rounded-full bg-[#F5F1E9] text-[11px] font-mono tracking-wide flex items-center text-[#0E1E33]">
                FİRMA İSTİHBARATI
              </span>
            </div>
            <h3 className="serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.05] tracking-[-0.02em] text-[#0E1E33]">
              “Bu tabelanın arkasında kim var?”
            </h3>
          </div>

          <div className="space-y-4 mt-8">
            <p className="text-[14px] leading-[1.65] text-[#6B7A90] max-w-[34ch]">
              Ticaret sicil, <TermTooltip termKey="konkordato">konkordato</TermTooltip>, iflas, ortaklık yapısı, adres devamlılığı ve sektör istihbaratı. Tabelaya değil, resmi sicile ve fiili borçlanma eğilimine bakın.
            </p>
            <ul className="text-[13px] leading-[1.65] text-[#0E1E33]/85 space-y-1.5 list-disc pl-4 font-mono">
              <li>
                <TermTooltip termKey="mersis">MERSİS</TermTooltip> ve Ticaret Sicil tam eşleşmesi
              </li>
              <li>
                Geçici/kesin <TermTooltip termKey="konkordato">konkordato mühleti</TermTooltip> taraması
              </li>
              <li>Ortak ve yetkili risk kümelenmesi haritası</li>
            </ul>
          </div>
        </div>

        {/* Module 03: RİSK */}
        <div 
          id="risk" 
          className="rounded-[24px] border border-[#EAE5DD] p-8 lg:p-10 flex flex-col justify-between min-h-[360px] bg-white shadow-2xs hover:shadow-sm transition"
        >
          <div>
            <div className="flex items-start justify-between mb-8">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#6B7A90]">03</span>
              <span className="h-7 px-3.5 rounded-full bg-[#F5F1E9] text-[11px] font-mono tracking-wide flex items-center text-[#0E1E33]">
                RİSK DERECELENDİRME
              </span>
            </div>
            <h3 className="serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.05] tracking-[-0.02em] text-[#0E1E33]">
              “Bu kapıdan girmek güvenli mi?”
            </h3>
          </div>

          <div className="space-y-4 mt-8">
            <p className="text-[14px] leading-[1.65] text-[#6B7A90] max-w-[34ch]">
              Sektörel risk, coğrafi yoğunlaşma, vade uyumsuzluğu ve çekin dolaşım haritası. Risk tek yerde değildir; zincirdeki en zayıf halkanın direnci kadardır.
            </p>
            <ul className="text-[13px] leading-[1.65] text-[#0E1E33]/85 space-y-1.5 list-disc pl-4 font-mono">
              <li>
                0–100 Dinamik <TermTooltip termKey="temkin_puani">Temkin Skorlama</TermTooltip>
              </li>
              <li>
                <TermTooltip termKey="ciro_silsilesi">Ciro silsilesindeki</TermTooltip> en zayıf halka uyarısı
              </li>
              <li>Net Karar: İlerle / Temkinli İlerle / Dur</li>
            </ul>
          </div>
        </div>

        {/* Module 04: FİNANSMAN */}
        <div 
          id="finansman" 
          className="rounded-[24px] p-8 lg:p-10 flex flex-col justify-between min-h-[360px] bg-[#0E1E33] text-[#FCFBF7] shadow-sm"
        >
          <div>
            <div className="flex items-start justify-between mb-8">
              <span className="text-[12px] font-mono tracking-[0.2em] text-[#FCFBF7]/50">04</span>
              <span className="h-7 px-3.5 rounded-full bg-white/10 text-[11px] font-mono tracking-wide flex items-center text-white">
                FİNANSMAN EŞLEŞTİRME
              </span>
            </div>
            <h3 className="serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.05] tracking-[-0.02em] text-white">
              “Nakit gerekiyorsa, en temiziyle.”
            </h3>
          </div>

          <div className="space-y-4 mt-8">
            <p className="text-[14px] leading-[1.65] text-[#FCFBF7]/70 max-w-[34ch]">
              Biz kredi vermeyiz. Ancak temkinlediğimiz çek için en temiz finansman kanalını — banka, katılım bankası, fon — şeffaf oranla eşleştiririz.
            </p>
            <ul className="text-[13px] leading-[1.65] text-white/90 space-y-1.5 list-disc pl-4 font-mono">
              <li>
                <TermTooltip termKey="temkin_puani">
                  <span className="text-white border-white/60">Temkin Puanı</span>
                </TermTooltip>{' '}
                yüksekse anında kırdırma teklifi
              </li>
              <li>Tamamen net komisyon, gizli masraf yok</li>
              <li>İsterseniz sadece rapor alır, nakite girmessiniz</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
