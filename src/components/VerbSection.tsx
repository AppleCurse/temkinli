import React from 'react';

export const VerbSection: React.FC = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-[#EAE5DD]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B7A90] uppercase mb-4">
            TİCARİ DEYİM VE FİİL
          </div>
          <h2 className="serif text-[54px] sm:text-[76px] lg:text-[96px] leading-[0.88] tracking-[-0.04em] text-[#0E1E33]">
            temkin<br />
            <span className="italic text-[#0E1E33]/60">lemek</span>
          </h2>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#EAE5DD] px-4 h-8 text-[12px] font-mono text-[#0E1E33] bg-[#FCFBF7]">
            [ tem-kin-le-mek ] • geçişli fiil • ticaret ağzı
          </div>
        </div>

        <div className="space-y-8">
          {[
            {
              quote: 'Çeki temkinledik mi?',
              explanation: 'İmzadan ve teslimattan önceki son eylem. Keşideci, ciro zinciri, karşılıksız çek defteri — hepsine bakıldı mı?'
            },
            {
              quote: 'Firmayı temkinlemeden mal verme.',
              explanation: 'Tabelaya değil, MERSİS siciline güven. Ortaklık yapısı, konkordato ve adres devamlılığı sorgulandı mı?'
            },
            {
              quote: 'Temkinlemeden imzalamam.',
              explanation: 'En pahalı imza, emin olmadan atılandır. Önce bilgi, sonra eylem.'
            }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-[#EAE5DD] pb-6 space-y-2">
              <div className="serif text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.1] text-[#0E1E33]">
                “{item.quote}”
              </div>
              <p className="text-[14px] leading-[1.65] text-[#6B7A90] max-w-[48ch]">
                {item.explanation}
              </p>
            </div>
          ))}

          <div className="text-[12px] font-mono text-[#6B7A90] leading-[1.6] max-w-[50ch] p-4 rounded-[16px] bg-[#F5F1E9]">
            * Not: TDK’de “temkin” kelimesi ihtiyat, sakınma demektir. Ticaret insanı bunu günlük dilde “temkinli davranmak, ihtiyat payı bırakmak” anlamında fiilleştirmiştir.
          </div>
        </div>
      </div>
    </section>
  );
};
