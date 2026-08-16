import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  MessageCircle, 
  RotateCcw, 
  Sparkles,
  BookmarkPlus,
  Building2,
  FileText,
  BookOpen
} from 'lucide-react';
import { CheckAnalysisResult, SampleCheckPreset, VerdictType } from '../types';
import { SAMPLE_PRESETS } from '../data/sampleData';
import { TRADE_GLOSSARY } from '../data/glossary';
import { TermTooltip } from './TermTooltip';
import { FactoringSimulatorModal } from './FactoringSimulatorModal';
import { OfficialReportModal } from './OfficialReportModal';

interface CheckAnalyzerProps {
  onAnalysisStateChange: (
    frontUploaded: boolean,
    backUploaded: boolean,
    isAnalyzing: boolean,
    result: CheckAnalysisResult | null
  ) => void;
  onSaveToDefter?: (result: CheckAnalysisResult) => void;
}

export const CheckAnalyzer: React.FC<CheckAnalyzerProps> = ({
  onAnalysisStateChange,
  onSaveToDefter,
}) => {
  // Form State
  const [firmName, setFirmName] = useState('ABC Makina San. ve Tic. Ltd. Şti.');
  const [amountInput, setAmountInput] = useState('1.250.000');
  const [termDays, setTermDays] = useState('120');
  const [securityType, setSecurityType] = useState('Çek');

  // Modal State
  const [isFactoringOpen, setIsFactoringOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // File Upload State
  const [frontImage, setFrontImage] = useState<{ name: string; preview: string } | null>(null);
  const [backImage, setBackImage] = useState<{ name: string; preview: string } | null>(null);

  // Analysis Lifecycle State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CheckAnalysisResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  // Notify parent of state changes so TemkinBey speech bubble updates
  useEffect(() => {
    onAnalysisStateChange(!!frontImage, !!backImage, isAnalyzing, analysisResult);
  }, [frontImage, backImage, isAnalyzing, analysisResult, onAnalysisStateChange]);

  const handleFileUpload = (file: File, side: 'front' | 'back') => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = { name: file.name, preview: reader.result as string };
      if (side === 'front') setFrontImage(data);
      else setBackImage(data);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (preset: SampleCheckPreset) => {
    setFirmName(preset.firmName);
    setAmountInput(preset.amount.toLocaleString('tr-TR'));
    setTermDays(preset.termDays.toString());
    setSecurityType(preset.security);
    
    // Set mock image thumbnails
    setFrontImage({
      name: preset.frontImageName,
      preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
    });
    setBackImage({
      name: preset.backImageName,
      preview: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&auto=format&fit=crop&q=80',
    });

    setAnalysisResult(preset.result);
    setSavedSuccess(false);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSavedSuccess(false);

    // Calculate score based on inputs
    const numAmount = Number(amountInput.replace(/[^\d]/g, '')) || 1250000;
    const days = Number(termDays) || 120;

    setTimeout(() => {
      let baseScore = 70;
      if (days >= 180) baseScore -= 18;
      else if (days >= 120) baseScore -= 8;
      else if (days <= 45) baseScore += 10;

      if (securityType === 'Teminatsız') baseScore -= 15;
      if (securityType === 'Peşin + Çek') baseScore += 8;

      if (numAmount > 5000000) baseScore -= 10;

      if (frontImage && backImage) baseScore += 5;

      const finalScore = Math.max(15, Math.min(98, baseScore));
      let verdict: VerdictType = 'TEMKİNLİ_İLERLE';
      if (finalScore >= 75) verdict = 'ILERLE';
      else if (finalScore < 45) verdict = 'DUR';

      const mockResult: CheckAnalysisResult = {
        id: `CHK-${Date.now().toString().slice(-4)}`,
        firmName: firmName || 'Belirtilmedi',
        taxNumber: '1234567890',
        amount: numAmount,
        currency: 'TL',
        dueDate: `${days} gün sonra`,
        daysRemaining: days,
        issueCity: 'İstanbul OSB',
        bankName: 'Garanti BBVA - Kurumsal',
        checkNumber: `TR${Math.floor(10000000 + Math.random() * 90000000)}`,
        score: finalScore,
        verdict,
        verdictSummary:
          verdict === 'ILERLE'
            ? 'Keşideci ve ciro zinciri temiz. Vade–tutar oranları dengeli.'
            : verdict === 'TEMKİNLİ_İLERLE'
            ? '3. ciro halkasında geçmişte karşılıksız çek riski olan firma tespit edildi.'
            : 'Keşideci şirket hakkında konkordato kararı ve belgede tahrifat şüphesi saptandı.',
        verdictDetail:
          verdict === 'DUR'
            ? 'DİKKAT: Şirket hakkında devam eden konkordato koruma kararı bulunmaktadır. Teslimatı durdurmanız önerilir.'
            : verdict === 'TEMKİNLİ_İLERLE'
            ? 'Ciro silsilesindeki firmalardan birinin geçmiş karşılıksız kaydı vardır. Faturaya dayalı ek teyit alınması önerilir.'
            : 'Keşidecinin 10 yıllık finansal geçmişi temizdir. Çek ciro zincirinde kırılma saptanmamıştır.',
        confidenceScore: frontImage && backImage ? 92 : 78,
        tahsilatRiski: Math.round(100 - finalScore * 0.8),
        belgeRiski: frontImage && backImage ? 8 : 25,
        karsiTarafRiski: Math.round(100 - finalScore * 0.7),
        ciroChain: [
          { id: 1, from: firmName, to: '1. Ciro Alıcısı A.Ş.', status: 'temiz', note: 'Keşideci' },
          { id: 2, from: '1. Ciro Alıcısı A.Ş.', to: '2. Ciro Alıcısı Ltd.', status: verdict === 'DUR' ? 'riskli' : 'normal' },
          { id: 3, from: '2. Ciro Alıcısı Ltd.', to: 'Sizin Firmanız', status: verdict === 'TEMKİNLİ_İLERLE' ? 'riskli' : 'temiz', note: verdict === 'TEMKİNLİ_İLERLE' ? '⚠ Karşılıksız kaydı var' : 'Temiz' }
        ],
        keyRisks: [
          `${days} günlük vade sektörel standartların üzerinde.`,
          'Ciro zincirinde 3 firma geçiş yapmıştır.'
        ],
        recommendations: [
          'İmzadan ve teslimattan önce keşideci şirket banka onayını kontrol edin.',
          'Mümkünse peşinat oranını artırarak risk marjını daraltın.'
        ],
        analyzedAt: 'Bugün, ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2800);
  };

  const handleReset = () => {
    setFrontImage(null);
    setBackImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setSavedSuccess(false);
  };

  const handleSaveToDefterClick = () => {
    if (analysisResult) {
      if (onSaveToDefter) {
        onSaveToDefter(analysisResult);
      }
      setSavedSuccess(true);
    }
  };

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  };

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case 'ILERLE':
        return {
          bg: 'bg-[#1f8a5b]',
          text: 'text-white',
          icon: ShieldCheck,
          label: 'İLERLE — Güvenli İşlem',
          border: 'border-[#1f8a5b]'
        };
      case 'TEMKİNLİ_İLERLE':
        return {
          bg: 'bg-[#a56b13]',
          text: 'text-white',
          icon: AlertTriangle,
          label: 'TEMKİNLİ İLERLE — İhtiyat Gerekli',
          border: 'border-[#a56b13]'
        };
      case 'DUR':
        return {
          bg: 'bg-[#a23b35]',
          text: 'text-white',
          icon: ShieldAlert,
          label: 'DUR! — Yüksek Risk',
          border: 'border-[#a23b35]'
        };
    }
  };

  const whatsappMessage = analysisResult
    ? encodeURIComponent(
        `Merhaba Temkin Ekibi,
İşlem Raporu: ${analysisResult.firmName}
Tutar: ${formatTL(analysisResult.amount)} | Vade: ${analysisResult.daysRemaining} Gün
Temkin Puanı: ${analysisResult.score}/100 (${analysisResult.verdict})
Detaylı karar istihbarat raporunu incelemek istiyorum.`
      )
    : encodeURIComponent('Merhaba, çeki temkinleme konusunda bilgi almak istiyorum.');

  return (
    <div id="demo" className="scroll-mt-24">
      {/* Section Heading */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B7A90] uppercase mb-2">
            CANLI ANALİZ SİMÜLATÖRÜ
          </div>
          <h2 className="serif text-[36px] sm:text-[52px] lg:text-[68px] leading-[0.95] tracking-[-0.03em] text-[#0E1E33] max-w-[16ch]">
            Sisteme çek yükle. Gerisini Temkin Bey’e bırak.
          </h2>
        </div>
        <p className="text-[13px] text-[#6B7A90] max-w-[32ch] leading-[1.6]">
          Çekin ön ve arka yüzünü yükleyin veya hazır örnek senaryolardan birini seçerek analizi test edin.
        </p>
      </div>

      {/* Preset Pickers */}
      <div className="mb-8 p-5 rounded-[22px] bg-[#FAF7EE] border border-[#EAE5DD] shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[12px] font-mono font-bold text-[#0E1E33]">
            <Sparkles size={16} className="text-[#a56b13]" />
            <span>HIZLI SENARYO TESTİ & ÖRNEK ÇEKLER:</span>
          </div>
          <span className="text-[11px] font-mono text-[#6B7A90]">
            Tek tıkla gerçek veritabanı simülasyonunu yükleyin
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {SAMPLE_PRESETS.map((p, idx) => {
            const isSelected = firmName === p.firmName;
            return (
              <button
                key={idx}
                onClick={() => handlePresetSelect(p)}
                className={`p-3.5 rounded-[16px] text-left transition-all flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E1E33] text-white border-[#0E1E33] shadow-md scale-[1.02]'
                    : 'bg-white hover:bg-white/80 text-[#0E1E33] border-[#EAE5DD] hover:border-[#0E1E33]/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        p.badge === 'İLERLE'
                          ? 'bg-[#1f8a5b]/20 text-[#1f8a5b]'
                          : p.badge === 'TEMKİNLİ İLERLE'
                          ? 'bg-[#a56b13]/20 text-[#a56b13]'
                          : 'bg-[#a23b35]/20 text-[#a23b35]'
                      }`}
                    >
                      {p.badge}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-white/70' : 'text-[#6B7A90]'}`}>
                      {p.termDays} Gün Vade
                    </span>
                  </div>
                  <h4 className={`text-[13px] font-semibold leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-[#0E1E33]'}`}>
                    {p.firmName}
                  </h4>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed font-sans ${isSelected ? 'text-white/80' : 'text-[#6B7A90]'}`}>
                    {p.subtitle}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold">₺ {p.amount.toLocaleString('tr-TR')}</span>
                  <span className="text-[10px] underline">{isSelected ? '✓ Seçildi' : 'Test Et →'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        {/* Left Column: Form & Uploader */}
        <div className="space-y-6">
          {/* Main Input Form */}
          <div className="rounded-[24px] bg-white border border-[#EAE5DD] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-3">
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7A90]">
                İŞLEM VE FİRMA BİLGİLERİ
              </span>
              <Building2 size={16} className="text-[#6B7A90]" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-[#6B7A90] uppercase flex items-center gap-1.5">
                  <span>FİRMA UNVANI /</span>
                  <TermTooltip termKey="kesideci" showIcon>
                    KEŞİDECİ
                  </TermTooltip>
                </label>
                <input
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="ABC Makina San. Ltd. Şti."
                  className="w-full h-11 px-4 rounded-[12px] bg-[#FCFBF7] border border-[#EAE5DD] text-[14px] font-medium text-[#0E1E33] focus:outline-none focus:border-[#0E1E33]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#6B7A90] uppercase">
                  İŞLEM TUTARI (TL)
                </label>
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="1.250.000"
                  className="w-full h-11 px-4 rounded-[12px] bg-[#FCFBF7] border border-[#EAE5DD] text-[14px] font-medium text-[#0E1E33] focus:outline-none focus:border-[#0E1E33]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#6B7A90] uppercase">
                  VADE SÜRESİ
                </label>
                <select
                  value={termDays}
                  onChange={(e) => setTermDays(e.target.value)}
                  className="w-full h-11 px-3 rounded-[12px] bg-[#FCFBF7] border border-[#EAE5DD] text-[14px] font-medium text-[#0E1E33] focus:outline-none focus:border-[#0E1E33]"
                >
                  <option value="30">30 Gün (Kısa Vade)</option>
                  <option value="60">60 Gün (Standart)</option>
                  <option value="90">90 Gün (Orta Vade)</option>
                  <option value="120">120 Gün (Uzun Vade)</option>
                  <option value="180">180 Gün (Yüksek Vade Riski)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-[#6B7A90] uppercase flex items-center justify-between">
                  <span>EK TEMİNAT DURUMU</span>
                  <TermTooltip termKey="acik_hesap">
                    <span className="text-[10px] lowercase opacity-80">(açık hesap nedir?)</span>
                  </TermTooltip>
                </label>
                <select
                  value={securityType}
                  onChange={(e) => setSecurityType(e.target.value)}
                  className="w-full h-11 px-3 rounded-[12px] bg-[#FCFBF7] border border-[#EAE5DD] text-[14px] font-medium text-[#0E1E33] focus:outline-none focus:border-[#0E1E33]"
                >
                  <option value="Çek">Yalnızca Müşteri Çeki</option>
                  <option value="Peşin + Çek">%20 Peşin + Kalan Çek</option>
                  <option value="Çek + Senet">Çek + Şahsi Kefalet Senedi</option>
                  <option value="Teminatsız">Açık Hesap (Teminatsız)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Front & Back Image Dropzones */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Front Image Box */}
            <div
              onClick={() => !frontImage && frontInputRef.current?.click()}
              className={`relative rounded-[20px] border-2 border-dashed bg-white p-5 min-h-[200px] flex flex-col cursor-pointer transition hover:border-[#0E1E33]/40 ${
                frontImage ? 'border-solid border-[#0E1E33]/30' : 'border-[#EAE5DD]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7A90]">
                  ÖN YÜZ
                </span>
                {frontImage ? (
                  <span className="h-6 w-6 rounded-full bg-[#0E1E33] text-white flex items-center justify-center">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border border-[#EAE5DD] flex items-center justify-center text-[#6B7A90]">
                    <Upload size={12} />
                  </span>
                )}
              </div>

              {!frontImage ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-4">
                  <FileText size={28} className="text-[#6B7A90]/50" />
                  <div className="text-[13px] font-medium text-[#0E1E33]">Çek Ön Yüzünü Yükle</div>
                  <div className="text-[11px] text-[#6B7A90]">
                    <TermTooltip termKey="kesideci" showIcon>Keşideci</TermTooltip> & Tutar için
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-3">
                  <img
                    src={frontImage.preview}
                    alt="ön yüz"
                    className="w-full h-[100px] object-cover rounded-[12px] border border-[#EAE5DD]"
                  />
                  <div className="text-[12px] font-mono truncate text-[#0E1E33]/80">
                    {frontImage.name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFrontImage(null);
                    }}
                    className="self-start text-[11px] text-[#a23b35] underline hover:opacity-80"
                  >
                    Kaldır
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 rounded-[20px] bg-white/90 backdrop-blur-[2px] flex flex-col items-center justify-center overflow-hidden z-10">
                  <div className="relative w-full h-[2px] bg-black/10 overflow-hidden">
                    <div className="absolute inset-y-0 w-1/2 bg-[#0E1E33] animate-scanline" />
                  </div>
                  <div className="mt-3 text-[11px] font-mono tracking-[0.2em] text-[#0E1E33]">
                    KEŞİDECİ OKUNUYOR...
                  </div>
                </div>
              )}
            </div>

            {/* Back Image Box */}
            <div
              onClick={() => !backImage && backInputRef.current?.click()}
              className={`relative rounded-[20px] border-2 border-dashed bg-white p-5 min-h-[200px] flex flex-col cursor-pointer transition hover:border-[#0E1E33]/40 ${
                backImage ? 'border-solid border-[#0E1E33]/30' : 'border-[#EAE5DD]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7A90]">
                  ARKA YÜZ / CİRO
                </span>
                {backImage ? (
                  <span className="h-6 w-6 rounded-full bg-[#0E1E33] text-white flex items-center justify-center">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border border-[#EAE5DD] flex items-center justify-center text-[#6B7A90]">
                    <Upload size={12} />
                  </span>
                )}
              </div>

              {!backImage ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-4">
                  <FileText size={28} className="text-[#6B7A90]/50" />
                  <div className="text-[13px] font-medium text-[#0E1E33]">
                    <TermTooltip termKey="ciro_silsilesi">Ciro Zinciri</TermTooltip> — Arka Yüz
                  </div>
                  <div className="text-[11px] text-[#6B7A90]">Asıl risk ciroda saklı</div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-3">
                  <img
                    src={backImage.preview}
                    alt="arka yüz"
                    className="w-full h-[100px] object-cover rounded-[12px] border border-[#EAE5DD]"
                  />
                  <div className="text-[12px] font-mono truncate text-[#0E1E33]/80">
                    {backImage.name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBackImage(null);
                    }}
                    className="self-start text-[11px] text-[#a23b35] underline hover:opacity-80"
                  >
                    Kaldır
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 rounded-[20px] bg-white/90 backdrop-blur-[2px] flex flex-col items-center justify-center overflow-hidden z-10">
                  <div className="relative w-full h-[2px] bg-black/10 overflow-hidden">
                    <div className="absolute inset-y-0 w-1/2 bg-[#0E1E33] animate-scanline" />
                  </div>
                  <div className="mt-3 text-[11px] font-mono tracking-[0.2em] text-[#0E1E33]">
                    CİRO ZİNCİRİ TARANIYOR...
                  </div>
                </div>
              )}
            </div>
          </div>

          <input
            ref={frontInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'front')}
          />
          <input
            ref={backInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'back')}
          />

          {/* Action Trigger Button */}
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="w-full h-14 rounded-full bg-[#0E1E33] text-white text-[15px] font-medium flex items-center justify-center gap-3 hover:bg-[#0E1E33]/90 transition shadow-md disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Temkinleniyor... (Keşideci, Ciro, Karşılıksız Defteri)</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>ÇEKİ VE FİRMAYI TEMKİNLE →</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Dynamic Analysis Output Card */}
        <div>
          {analysisResult ? (
            <div className="rounded-[28px] bg-white border border-[#EAE5DD] p-6 lg:p-8 space-y-6 shadow-sm">
              {/* Verdict Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE5DD] pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#1f8a5b] animate-dot-pulse" />
                  <span className="text-[11px] font-mono tracking-[0.18em] text-[#0E1E33]">
                    ANALİZ DOSYASI: {analysisResult.id}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-mono text-[#6B7A90] hover:text-[#0E1E33] flex items-center gap-1 underline"
                >
                  <RotateCcw size={12} />
                  <span>Sıfırla</span>
                </button>
              </div>

              {/* Big Score & Verdict Badge */}
              {(() => {
                const badgeInfo = getVerdictBadge(analysisResult.verdict);
                const BadgeIcon = badgeInfo.icon;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="h-[68px] w-[68px] rounded-full bg-[#0E1E33] text-white flex flex-col items-center justify-center leading-none shadow-sm">
                        <span className="text-[24px] serif font-normal">{analysisResult.score}</span>
                        <TermTooltip termKey="temkin_puani">
                          <span className="text-[9px] font-mono opacity-80 cursor-help">/ 100 ℹ</span>
                        </TermTooltip>
                      </div>

                      <div className="space-y-1">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-mono font-medium ${badgeInfo.bg} ${badgeInfo.text}`}
                        >
                          <BadgeIcon size={14} />
                          <span>{badgeInfo.label}</span>
                        </div>
                        <div className="text-[12px] text-[#6B7A90]">
                          <TermTooltip termKey="bilgi_guveni" showIcon>
                            Bilgi Güveni:
                          </TermTooltip>{' '}
                          <strong className="text-[#0E1E33]">{analysisResult.confidenceScore}/100</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-[16px] bg-[#F5F1E9] border border-[#EAE5DD]">
                      <div className="text-[11px] font-mono text-[#6B7A90] mb-1">HÜKÜM ÖZETİ</div>
                      <p className="text-[14px] text-[#0E1E33] font-medium leading-[1.5]">
                        {analysisResult.verdictSummary}
                      </p>
                      <p className="text-[13px] text-[#6B7A90] leading-[1.6] mt-2">
                        {analysisResult.verdictDetail}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Sub-Risk Bars with Tooltips */}
              <div className="space-y-2 text-[12px] font-mono pt-2">
                <div className="flex items-center justify-between text-[#6B7A90]">
                  <TermTooltip termKey="tahsilat_riski" showIcon>
                    <span>Tahsilat Riski:</span>
                  </TermTooltip>
                  <span className="font-semibold text-[#0E1E33]">{analysisResult.tahsilatRiski}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F1E9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0E1E33]"
                    style={{ width: `${analysisResult.tahsilatRiski}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[#6B7A90] pt-1">
                  <TermTooltip termKey="belge_riski" showIcon>
                    <span>Belge / Tahrifat Riski:</span>
                  </TermTooltip>
                  <span className="font-semibold text-[#0E1E33]">{analysisResult.belgeRiski}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F1E9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0E1E33]"
                    style={{ width: `${analysisResult.belgeRiski}%` }}
                  />
                </div>
              </div>

              {/* Ciro Zinciri (Endorsement Chain) Visualizer */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-[0.16em] text-[#6B7A90] uppercase">
                    <TermTooltip termKey="ciro_silsilesi" showIcon>
                      CİRO ZİNCİRİ
                    </TermTooltip>{' '}
                    ({analysisResult.ciroChain.length} HALKA)
                  </span>
                  <TermTooltip termKey="karsi_taraf">
                    <span className="text-[10px] font-mono text-[#6B7A90] underline">karşı taraf riski nedir?</span>
                  </TermTooltip>
                </div>

                <div className="space-y-2">
                  {analysisResult.ciroChain.map((link, idx) => (
                    <div
                      key={link.id}
                      className={`p-3 rounded-[12px] text-[13px] flex items-center justify-between gap-2 border ${
                        link.status === 'riskli'
                          ? 'bg-[#0E1E33] text-white border-[#0E1E33]'
                          : 'bg-[#FCFBF7] text-[#0E1E33] border-[#EAE5DD]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-white/20 border border-current flex items-center justify-center text-[10px] font-mono">
                          {idx + 1}
                        </span>
                        <span className="font-medium">{link.from}</span>
                        <span className="opacity-50">→</span>
                        <span className="opacity-90">{link.to}</span>
                      </div>

                      {link.note && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            link.status === 'riskli'
                              ? 'bg-amber-500/20 text-amber-200'
                              : 'bg-[#F5F1E9] text-[#6B7A90]'
                          }`}
                        >
                          {link.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Recommendations */}
              <div className="space-y-2 pt-2 border-t border-[#EAE5DD]">
                <div className="text-[11px] font-mono text-[#6B7A90]">TAVSİYE EDİLEN EYLEM</div>
                <ul className="text-[13px] text-[#0E1E33] space-y-1 list-disc pl-4 leading-[1.6]">
                  {analysisResult.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Actions: Factoring, Official Report & WhatsApp */}
              <div className="pt-4 flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/908505120737?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] h-11 rounded-full bg-[#0E1E33] text-white text-[12px] font-mono font-medium flex items-center justify-center gap-1.5 hover:bg-[#0E1E33]/90 transition"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>Temkin Bey'e Danış</span>
                </a>

                <button
                  onClick={() => setIsFactoringOpen(true)}
                  className="h-11 px-4 rounded-full bg-white border border-[#EAE5DD] text-[#0E1E33] text-[12px] font-mono font-medium flex items-center gap-1.5 hover:bg-black/5 transition"
                >
                  <span>⚖️ İskonto Hesapla</span>
                </button>

                <button
                  onClick={() => setIsReportOpen(true)}
                  className="h-11 px-4 rounded-full bg-white border border-[#EAE5DD] text-[#0E1E33] text-[12px] font-mono font-medium flex items-center gap-1.5 hover:bg-black/5 transition"
                >
                  <span>📄 Resmi Rapor</span>
                </button>

                <button
                  onClick={handleSaveToDefterClick}
                  disabled={savedSuccess}
                  className={`h-11 px-4 rounded-full border text-[12px] font-mono font-medium flex items-center justify-center gap-1.5 transition ${
                    savedSuccess
                      ? 'bg-[#1f8a5b] text-white border-[#1f8a5b]'
                      : 'bg-white text-[#0E1E33] border-[#EAE5DD] hover:bg-black/5'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <Check size={14} />
                      <span>Kaydedildi</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus size={14} />
                      <span>Kaydet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] bg-white border border-[#EAE5DD] p-8 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-[#F5F1E9] flex items-center justify-center mx-auto text-[#0E1E33]">
                <FileText size={28} />
              </div>

              <div className="space-y-2">
                <h3 className="serif text-[28px] text-[#0E1E33]">Karar İstihbarat Dosyası</h3>
                <p className="text-[14px] text-[#6B7A90] max-w-[34ch] mx-auto leading-[1.6]">
                  Sol taraftan çek bilgilerini doldurun veya hazır örnek senaryolardan birini seçerek analizi başlatın.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE5DD] text-left space-y-3 font-mono text-[11px] text-[#6B7A90]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#1f8a5b]" />
                  <span>
                    <TermTooltip termKey="mersis" showIcon>MERSİS & Ticaret Sicil</TermTooltip> sorgulaması
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#1f8a5b]" />
                  <span>
                    <TermTooltip termKey="ciro_silsilesi" showIcon>Ciro zincirinde</TermTooltip> riskli firma taraması
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#1f8a5b]" />
                  <span>
                    <TermTooltip termKey="konkordato" showIcon>Konkordato</TermTooltip> &{' '}
                    <TermTooltip termKey="karsiliksiz_defter" showIcon>Karşılıksız çek defteri</TermTooltip> kontrolü
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Quick Trade Terms Explorer Ribbon */}
      <div className="mt-8 p-4 sm:p-5 rounded-[20px] bg-[#FCFBF7] border border-[#EAE5DD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <BookOpen size={16} className="text-[#0E1E33]" />
          <div>
            <span className="text-[12px] font-mono font-medium text-[#0E1E33] tracking-wide block">
              TİCARİ TERİMLER & SÖZLÜK REHBERİ
            </span>
            <span className="text-[11px] text-[#6B7A90]">
              Terimlerin üzerine gelin veya tıklayarak Temkin karar kılavuzunu inceleyin
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(TRADE_GLOSSARY).slice(0, 5).map((key) => (
            <TermTooltip key={key} termKey={key}>
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#EAE5DD] text-[11px] font-mono text-[#0E1E33] hover:border-[#0E1E33] transition shadow-2xs">
                {TRADE_GLOSSARY[key].term}
              </span>
            </TermTooltip>
          ))}
        </div>
      </div>
      {/* Factoring Simulator Modal */}
      <FactoringSimulatorModal
        isOpen={isFactoringOpen}
        onClose={() => setIsFactoringOpen(false)}
        amount={analysisResult?.amount || Number(amountInput.replace(/[^\d]/g, '')) || 1250000}
        daysRemaining={analysisResult?.daysRemaining || Number(termDays) || 120}
        temkinScore={analysisResult?.score || 85}
      />

      {/* Official Printable Report Modal */}
      <OfficialReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        bankName={analysisResult?.bankName || 'Garanti BBVA - Kurumsal'}
        checkNumber={analysisResult?.checkNumber || '88492019'}
        amount={analysisResult?.amount || 1250000}
        score={analysisResult?.score || 85}
        verdict={analysisResult?.verdict || 'TEMKİNLİ_İLERLE'}
        blockHash="7a8f9c01de23b45688492019"
        ipfsCid="QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
        density={0.052}
      />
    </div>
  );
};
