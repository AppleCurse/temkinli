import React from 'react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="bg-[#0E1E33] text-[#FCFBF7] rounded-[32px] mx-3 lg:mx-6 px-6 lg:px-16 py-16 lg:py-24 my-8">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-start">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#FCFBF7]/50 uppercase mb-4">
            TEMKİN MANİFESTOSU
          </div>
          <h2 className="serif text-[38px] sm:text-[54px] lg:text-[72px] leading-[0.95] tracking-[-0.03em]">
            Önce bilgi.<br />
            Sonra karar.<br />
            <span className="opacity-60 italic text-[32px] sm:text-[46px] lg:text-[60px] block mt-2">
              Hatta bazen hiç karar vermemek de bir karardır.
            </span>
          </h2>
        </div>

        <div className="text-[15px] sm:text-[16px] leading-[1.75] text-[#FCFBF7]/75 space-y-6 lg:pt-4">
          <p>
            Türkiye’de ticaret çekle yürür. Ama her çek aynı hikayeyi taşımaz. Bazısı pırıl pırıldır, bazısı 4. ciroda kirlenir. Biz faktoring firması değiliz. Parayı satmıyoruz, <strong className="text-white">ihtiyatı veriyoruz.</strong>
          </p>
          <p>
            <em className="serif italic text-[18px] text-white">“Temkinlemek”</em> fiili sözlükte yoktur, ticarette vardır. Bir işi temkinlemek: bütün tarafları, defterleri, ciro zincirini, karşılıksız geçmişini ve mahkeme kayıtlarını kontrol edip — sonra, sadece sonra imza atmaktır.
          </p>
          <div className="p-6 rounded-[20px] bg-white/5 border border-white/10 space-y-3">
            <p className="text-white serif italic text-[19px] leading-[1.4] m-0">
              “Çeki temkinledik mi?” diye sormadan mal verme. “Firmayı temkinlemeden” borçlandırma. Temkinlemeden imzalamam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
