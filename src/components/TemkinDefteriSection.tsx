import React, { useState } from 'react';
import { Search, History, Filter, ShieldCheck, AlertTriangle, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { DefterEntry, VerdictType } from '../types';

interface TemkinDefteriProps {
  entries: DefterEntry[];
}

export const TemkinDefteriSection: React.FC<TemkinDefteriProps> = ({ entries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<string>('ALL');

  const filteredEntries = entries.filter((item) => {
    const matchesSearch =
      item.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.checkNumber && item.checkNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.taxNumber && item.taxNumber.includes(searchTerm));

    const matchesVerdict = filterVerdict === 'ALL' || item.verdict === filterVerdict;

    return matchesSearch && matchesVerdict;
  });

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case 'ILERLE':
        return { label: 'İLERLE', bg: 'bg-[#1f8a5b]/10 text-[#1f8a5b]', border: 'border-[#1f8a5b]/20', icon: ShieldCheck };
      case 'TEMKİNLİ_İLERLE':
        return { label: 'TEMKİNLİ', bg: 'bg-[#a56b13]/10 text-[#a56b13]', border: 'border-[#a56b13]/20', icon: AlertTriangle };
      case 'DUR':
        return { label: 'DUR', bg: 'bg-[#a23b35]/10 text-[#a23b35]', border: 'border-[#a23b35]/20', icon: ShieldAlert };
    }
  };

  const formatTL = (num: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section id="defter" className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-28 border-t border-[#EAE5DD]">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        {/* Left Column: Intro */}
        <div className="space-y-6">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B7A90] uppercase">
            TİCARİ HAFIZA & GEÇMİŞ
          </div>
          <h2 className="serif text-[42px] sm:text-[58px] lg:text-[72px] leading-[0.9] tracking-[-0.04em] text-[#0E1E33]">
            Temkin<br />
            <span className="italic text-[#0E1E33]/70">Defteri</span>
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#6B7A90] max-w-[36ch]">
            Bugünkü karar, yarının istihbarat verisi olur. Aynı firmaya tekrar baktığınızda önceki skor, kararlar ve risk değişimi tek görünümde önünüze gelir.
          </p>

          <div className="p-5 rounded-[20px] bg-[#F5F1E9] border border-[#EAE5DD] space-y-2">
            <div className="text-[11px] font-mono text-[#6B7A90] uppercase">ÖRNEK TİCARİ HAFIZA SORGUSU</div>
            <div className="serif italic text-[22px] text-[#0E1E33]">
              “Sekiz ay önce skoru 42 idi. Bugün 68. Değişen ne?”
            </div>
            <div className="text-[12px] font-mono text-[#0E1E33]/70 pt-1">
              RİSK DEĞİŞİMİ: +26 PUAN İYİLEŞME | ÖNCEKİ KARAR: DİK
            </div>
          </div>
        </div>

        {/* Right Column: Ledger Table */}
        <div className="space-y-4">
          {/* Controls: Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7A90]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Firma unvanı veya çek no ara..."
                className="w-full h-10 pl-9 pr-4 rounded-full bg-white border border-[#EAE5DD] text-[13px] text-[#0E1E33] placeholder:text-[#6B7A90]/60 focus:outline-none focus:border-[#0E1E33]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { label: 'HEPSİ', val: 'ALL' },
                { label: 'İLERLE', val: 'ILERLE' },
                { label: 'TEMKİNLİ', val: 'TEMKİNLİ_İLERLE' },
                { label: 'DUR', val: 'DUR' },
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => setFilterVerdict(btn.val)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap border transition ${
                    filterVerdict === btn.val
                      ? 'bg-[#0E1E33] text-white border-[#0E1E33]'
                      : 'bg-white text-[#6B7A90] border-[#EAE5DD] hover:text-[#0E1E33]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-[24px] bg-white border border-[#EAE5DD] overflow-hidden shadow-2xs">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center text-[#6B7A90] text-[13px] font-mono">
                Aramanızla eşleşen kaydolmuş bir çek dosyası bulunamadı.
              </div>
            ) : (
              <div className="divide-y divide-[#EAE5DD]">
                {filteredEntries.map((item) => {
                  const badge = getVerdictBadge(item.verdict);
                  const IconComp = badge.icon;
                  return (
                    <div key={item.id} className="p-4 sm:p-5 hover:bg-[#FCFBF7] transition space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-[#6B7A90]">{item.date}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F1E9] text-[#0E1E33]">
                              {item.id}
                            </span>
                          </div>
                          <div className="text-[15px] font-semibold text-[#0E1E33] mt-1">
                            {item.firmName}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right font-mono">
                            <div className="text-[14px] font-medium text-[#0E1E33]">
                              {formatTL(item.amount)}
                            </div>
                            <div className="text-[11px] text-[#6B7A90]">{item.termDays} Gün Vade</div>
                          </div>

                          <div
                            className={`px-2.5 py-1 rounded-full text-[11px] font-mono border flex items-center gap-1.5 ${badge.bg} ${badge.border}`}
                          >
                            <IconComp size={13} />
                            <span>{badge.label}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[12px] text-[#6B7A90] pt-1">
                        <p className="m-0 truncate max-w-[45ch]">{item.summary}</p>
                        <div className="font-mono text-[11px] text-[#0E1E33]">
                          Skor: <strong>{item.score}/100</strong>
                          {item.previousScore && (
                            <span className="ml-2 text-[10px] text-[#1f8a5b]">
                              (Önceki: {item.previousScore})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
