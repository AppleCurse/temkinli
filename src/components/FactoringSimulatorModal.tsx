import React, { useState } from 'react';
import { Calculator, Percent, ArrowDownRight, Check, X, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

interface FactoringSimulatorProps {
  amount: number;
  daysRemaining: number;
  temkinScore: number;
  isOpen: boolean;
  onClose: () => void;
}

export const FactoringSimulatorModal: React.FC<FactoringSimulatorProps> = ({
  amount,
  daysRemaining,
  temkinScore,
  isOpen,
  onClose
}) => {
  const [customDays, setCustomDays] = useState<number>(daysRemaining || 90);
  const [customAmount, setCustomAmount] = useState<number>(amount || 1250000);
  const [selectedChannel, setSelectedChannel] = useState<'BANK_FACTORING' | 'PRIVATE_FACTORING' | 'PARTICIPATION'>('BANK_FACTORING');

  if (!isOpen) return null;

  // Annual interest/discount rates based on channel and Temkin score
  const baseRate = selectedChannel === 'BANK_FACTORING' ? 44.0 : selectedChannel === 'PARTICIPATION' ? 42.5 : 48.0;
  const scoreDiscount = temkinScore > 80 ? -3.5 : temkinScore > 60 ? -1.0 : +4.5;
  const effectiveAnnualRate = Math.max(28, baseRate + scoreDiscount);

  // Discount calculation
  // Formula: Discount = Amount * (Rate / 360) * (Days / 100)
  const discountInterest = Math.round((customAmount * (effectiveAnnualRate / 100) * customDays) / 360);
  const commissionRate = selectedChannel === 'BANK_FACTORING' ? 0.0075 : 0.0125;
  const commissionAmount = Math.round(customAmount * commissionRate);
  const bsmv = Math.round((discountInterest + commissionAmount) * 0.05); // %5 BSMV
  const totalDeduction = discountInterest + commissionAmount + bsmv;
  const netCashAmount = Math.max(0, customAmount - totalDeduction);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FCFBF7] rounded-[28px] border border-[#EAE5DD] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 h-9 w-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0E1E33] transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator size={18} className="text-[#1f8a5b]" />
            <span className="text-[11px] font-mono tracking-widest text-[#6B7A90] uppercase">
              TEMKİN MALİ İSKONTO & TEMLİK HESAPLAYICI
            </span>
          </div>
          <h3 className="serif text-[24px] text-[#0E1E33] m-0">
            Şeffaf Kırdırma & Net Nakit Simülatörü
          </h3>
          <p className="text-[13px] text-[#6B7A90] m-0">
            Gizli dosya masrafı yok. Temkin Güven Skoruna (%{temkinScore}) göre piyasa maliyet analizi.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#6B7A90]">ÇEK TUTARI (₺)</label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-[12px] bg-white border border-[#EAE5DD] font-mono text-[14px] font-bold text-[#0E1E33]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#6B7A90]">KALAN VADE GÜNÜ</label>
            <input
              type="number"
              value={customDays}
              onChange={(e) => setCustomDays(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-[12px] bg-white border border-[#EAE5DD] font-mono text-[14px] font-bold text-[#0E1E33]"
            />
          </div>
        </div>

        {/* Channel selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'BANK_FACTORING', label: 'Banka Faktoring', rate: '%40.5' },
            { id: 'PARTICIPATION', label: 'Katılım Temlik', rate: '%39.0' },
            { id: 'PRIVATE_FACTORING', label: 'Özel Finansman', rate: '%44.5' },
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id as any)}
              className={`p-3 rounded-[14px] border text-left text-[11px] font-mono transition ${
                selectedChannel === ch.id
                  ? 'bg-[#0E1E33] text-white border-[#0E1E33] shadow-sm'
                  : 'bg-white text-[#0E1E33] border-[#EAE5DD] hover:bg-black/5'
              }`}
            >
              <span className="font-bold block">{ch.label}</span>
              <span className="opacity-80 block text-[10px]">{ch.rate} Yıllık</span>
            </button>
          ))}
        </div>

        {/* Calculation Summary Card */}
        <div className="p-5 rounded-[20px] bg-[#0E1E33] text-white space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[12px] text-white/70">NET ELE GEÇECEK TUTAR:</span>
            <span className="text-[26px] font-bold text-[#1f8a5b] tracking-tight">
              ₺ {netCashAmount.toLocaleString('tr-TR')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-white/80">
            <div>
              <span className="text-white/50 block text-[9px]">İSKONTO FAİZİ:</span>
              <span>- ₺ {discountInterest.toLocaleString('tr-TR')}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[9px]">KOMİSYON:</span>
              <span>- ₺ {commissionAmount.toLocaleString('tr-TR')}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[9px]">BSMV (%5):</span>
              <span>- ₺ {bsmv.toLocaleString('tr-TR')}</span>
            </div>
            <div>
              <span className="text-white/50 block text-[9px]">YILLIK MALİYET:</span>
              <span className="text-[#1f8a5b] font-bold">%{effectiveAnnualRate.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-full bg-white border border-[#EAE5DD] text-[12px] font-mono text-[#0E1E33] hover:bg-black/5 transition"
          >
            Kapat
          </button>
          <a
            href={`https://wa.me/908505120737?text=${encodeURIComponent(
              `Merhaba, ₺${customAmount.toLocaleString('tr-TR')} tutarındaki ${customDays} gün vadeli çekimin temlik/iskonto koşullarını görüşmek istiyorum.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-6 rounded-full bg-[#1f8a5b] text-white text-[12px] font-mono font-medium flex items-center gap-2 hover:bg-[#1f8a5b]/90 transition"
          >
            <Percent size={14} />
            <span>Faktoring Temsilcisiyle Görüş</span>
          </a>
        </div>
      </div>
    </div>
  );
};
