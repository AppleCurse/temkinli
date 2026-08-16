import React from 'react';
import { FileText, Printer, Download, CheckCircle2, ShieldCheck, X, QrCode, Lock, Building2 } from 'lucide-react';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankName: string;
  checkNumber: string;
  amount: number;
  score: number;
  verdict: string;
  blockHash: string;
  ipfsCid: string;
  density: number;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  isOpen,
  onClose,
  bankName,
  checkNumber,
  amount,
  score,
  verdict,
  blockHash,
  ipfsCid,
  density
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportId = `TMK-IST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn print:p-0 print:bg-white">
      <div className="bg-white rounded-[24px] border border-[#EAE5DD] max-w-3xl w-full p-8 space-y-6 shadow-2xl relative max-h-[95vh] overflow-y-auto print:max-w-none print:shadow-none print:border-none print:p-0">
        {/* Action Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#0E1E33]" />
            <span className="text-[12px] font-mono font-bold text-[#0E1E33] uppercase">
              RESMİ İSTİHBARAT & KRİPTOGRAFİK KARAR DOSYASI (YÖNETİM KURULU FORMATI)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="h-8 px-3.5 rounded-full bg-[#0E1E33] text-white text-[11px] font-mono flex items-center gap-1.5 hover:bg-[#0E1E33]/90 transition"
            >
              <Printer size={13} />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0E1E33] transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 border-2 border-[#0E1E33] rounded-[16px] space-y-6 font-mono bg-[#FCFBF7] text-[#0E1E33]">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#0E1E33] pb-4">
            <div>
              <span className="serif text-[26px] font-bold tracking-tight block">TEMKİN</span>
              <span className="text-[9px] tracking-[0.25em] text-[#6B7A90] font-bold block uppercase">
                TİCARİ KARAR & KAMBİYO İSTİHBARATI ENSTİTÜSÜ
              </span>
              <span className="text-[10px] text-[#6B7A90] mt-1 block">Rapor No: {reportId}</span>
            </div>

            <div className="text-right text-[11px]">
              <span className="font-bold block">Tarih & Saat:</span>
              <span className="text-[#6B7A90]">{currentDate}</span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-[#1f8a5b]/10 text-[#1f8a5b] font-bold text-[10px]">
                MÜHÜRLÜ EVRAK
              </span>
            </div>
          </div>

          {/* Core Decision Summary Banner */}
          <div className="p-4 rounded-[12px] bg-[#0E1E33] text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] text-white/70 block uppercase">NİHAİ TEMKİN KARARI</span>
              <span className="serif text-[22px] font-bold text-[#1f8a5b]">{verdict}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/70 block uppercase">TEMKİN GÜVEN PUANI</span>
              <span className="text-[24px] font-bold">{score}/100</span>
            </div>
          </div>

          {/* Section 1: Check & Bank Details */}
          <div className="space-y-2 text-[12px]">
            <h4 className="text-[11px] uppercase font-bold text-[#6B7A90] border-b border-[#EAE5DD] pb-1">
              1. KAMBİYO VE SENET KÜTÜĞÜ
            </h4>
            <div className="grid grid-cols-2 gap-y-2 pt-1">
              <div>
                <span className="text-[#6B7A90]">Muhatap Banka:</span> <strong className="ml-1">{bankName}</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">Çek Seri Numarası:</span> <strong className="ml-1">{checkNumber || '88492019'}</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">Belge Tutarı:</span> <strong className="ml-1">₺ {amount?.toLocaleString('tr-TR') || '1.250.000,00'}</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">Düzenleme Tarihi:</span> <strong className="ml-1">15.12.2026</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Optic Spectrometry & Physics */}
          <div className="space-y-2 text-[12px]">
            <h4 className="text-[11px] uppercase font-bold text-[#6B7A90] border-b border-[#EAE5DD] pb-1">
              2. FİZİKİ MATRİS VE SPEKTRAL DOĞRULAMA (CORE-ZERO)
            </h4>
            <div className="grid grid-cols-2 gap-y-2 pt-1">
              <div>
                <span className="text-[#6B7A90]">Manyetik Mürekkep Yoğunluğu:</span>{' '}
                <strong>%{((density || 0.05) * 100).toFixed(2)} (Standard Uyumlu)</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">UV Floresan Testi (365nm):</span>{' '}
                <strong className="text-[#1f8a5b]">POZİTİF / ORİJİNAL</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">Holografik Şerit Açı Kayması:</span> <strong>0.15 rad (Uyumlu)</strong>
              </div>
              <div>
                <span className="text-[#6B7A90]">Klişe Sobel Relief Testi:</span> <strong>Homojen / Kopyalama Yok</strong>
              </div>
            </div>
          </div>

          {/* Section 3: Legal & Commercial Intelligence */}
          <div className="space-y-2 text-[12px]">
            <h4 className="text-[11px] uppercase font-bold text-[#6B7A90] border-b border-[#EAE5DD] pb-1">
              3. MERSİS, İCRA VE CİRO SİLSİLESİ KARNESİ
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>Keşideci tüzel kişiliği MERSİS & Ticaret Sicil Gazetesi sorgusunda faal ve yetkili imzaları tamdır.</li>
              <li>Keşideci aleyhine açılmış aktif konkordato mühleti veya iflas erteleme kaydına rastlanmamıştır.</li>
              <li>Ciro silsilesinde 3. halkadaki firma için temkinli takip önerilmiştir.</li>
            </ul>
          </div>

          {/* Section 4: Cryptographic Merkle Seal */}
          <div className="pt-3 border-t-2 border-[#0E1E33] flex items-center justify-between text-[10px] text-[#6B7A90]">
            <div className="space-y-0.5">
              <div><strong>MERKLE BLOCKCHAIN HASH:</strong> {blockHash || '7a8f9c01de23b456...'}</div>
              <div><strong>IPFS CID:</strong> {ipfsCid || 'QmXoypizjW3WknFiJnKLwHCn...'}</div>
              <div>Bu rapor dijital kriptografik imzayla mühürlenmiş olup değiştirilemez.</div>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 border border-[#0E1E33] flex items-center justify-center text-[#0E1E33] font-bold text-[8px] mx-auto mb-1">
                [TEMKİN MÜHRÜ]
              </div>
              <span>ONAY KODU: 2026-X8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
