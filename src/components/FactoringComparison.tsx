import React from 'react';

export const FactoringComparison: React.FC = () => {
  return (
    <section className="bg-white border-y border-[#EAE5DD] my-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B7A90] uppercase mb-3">
            FARKIMIZ
          </div>
          <h2 className="serif text-[38px] sm:text-[54px] lg:text-[68px] leading-[0.92] tracking-[-0.03em] text-[#0E1E33]">
            Biz factoring<br />
            değiliz.
          </h2>
          <p className="mt-6 text-[14px] sm:text-[15px] leading-[1.7] text-[#6B7A90] max-w-[38ch]">
            Factoring parayı satar. Biz ihtiyatı veririz. Bazen en doğru finansman, hiç borçlanmamaktır. Karar sizin — istihbarat ve net eylem bilgisi bizden.
          </p>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[560px] rounded-[20px] border border-[#EAE5DD] overflow-hidden shadow-2xs">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#F5F1E9] text-[11px] font-mono tracking-[0.16em] p-4 text-[#6B7A90]">
              <div>KRİTER</div>
              <div>KLASİK FACTORING</div>
              <div className="font-semibold text-[#0E1E33]">TEMKİN</div>
            </div>

            {[
              ['Ne verir?', 'Nakit, yüksek komisyonla', 'Karar istihbaratı, rapor, skor'],
              ['Kime yarar?', 'Sadece nakite sıkışana', 'İmzadan ve teslimattan önce durana'],
              ['Risk kime ait?', 'Faktoringde + Rücuen Sende', 'Sende — ama bilerek ve önlemle'],
              ['Ücret yapısı?', '% yüksek iskonto, gizli masraf', 'Sabit dosya raporu / Şeffaf oran'],
              ['Slogan', 'Çekini getir, nakit götür', 'Karar vermeden önce.']
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_1fr_1fr] p-4 text-[13px] border-t border-[#EAE5DD] items-center"
              >
                <div className="text-[#6B7A90] font-mono text-[12px]">{row[0]}</div>
                <div className="text-[#0E1E33]/70">{row[1]}</div>
                <div className="font-medium text-[#0E1E33]">{row[2]}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] font-mono text-[#6B7A90]">
            * TEMKİN doğrudan borç verme veya kredi kuruluşu değildir. Finansman eşleştirme opsiyonel bir modüldür.
          </div>
        </div>
      </div>
    </section>
  );
};
