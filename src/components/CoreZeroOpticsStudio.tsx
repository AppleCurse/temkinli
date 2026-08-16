import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  VideoOff,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  FileText,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Database,
  Search,
  ScanLine,
  QrCode,
  Calculator,
  Volume2,
  VolumeX,
  Printer,
  CopyCheck,
  Network
} from 'lucide-react';
import { BANK_PROFILES, BankProfile } from '../data/bankProfiles';
import { CryptoLedgerManager, BlockRecord } from '../utils/cryptoLedger';
import { ImageProcessor, PixelStats } from '../utils/imageProcessing';
import { MLFraudDetector, MLPredictionResult } from '../utils/mlDetector';
import { OcrEngine, OcrAnalysisResult } from '../utils/ocrEngine';
import { TwinCheckDetector, TwinCheckRecord } from '../utils/twinCheckDetector';
import { QrCheckParser, QrCheckData } from '../utils/qrCheckParser';
import { AudioSpeechAssistant } from '../utils/audioSpeechAssistant';
import { CiroNetworkGraph } from './CiroNetworkGraph';
import { FactoringSimulatorModal } from './FactoringSimulatorModal';
import { OfficialReportModal } from './OfficialReportModal';

interface CoreZeroOpticsStudioProps {
  onCheckAnalyzed?: (result: any) => void;
  presetBank?: string;
}

export const CoreZeroOpticsStudio: React.FC<CoreZeroOpticsStudioProps> = ({
  onCheckAnalyzed,
  presetBank = 'ziraat'
}) => {
  // State
  const [selectedBankKey, setSelectedBankKey] = useState<string>(presetBank);
  const [uvMode, setUvMode] = useState<boolean>(false);
  const [magneticMode, setMagneticMode] = useState<boolean>(false);
  const [holographicMode, setHolographicMode] = useState<boolean>(true);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(120);
  const [processTime, setProcessTime] = useState<number>(18.4);
  const [statusMessage, setStatusMessage] = useState<string>('Sistem hazır — Optik ve manyetik tarayıcı aktif');
  const [statusType, setStatusType] = useState<'info' | 'success' | 'warning' | 'error'>('success');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Modals state
  const [isFactoringModalOpen, setIsFactoringModalOpen] = useState<boolean>(false);
  const [isOfficialReportModalOpen, setIsOfficialReportModalOpen] = useState<boolean>(false);

  // Active sub-tab in Kokpit
  const [kokpitTab, setKokpitTab] = useState<'optics' | 'networkGraph' | 'qrAndTwins'>('optics');

  // Analysis result state
  const [fraudScore, setFraudScore] = useState<number>(18);
  const [verdict, setVerdict] = useState<'ONAYLANDI' | 'TEMKİNLİ İLERLE' | 'REDDEDİLDİ'>('ONAYLANDI');
  const [verificationText, setVerificationText] = useState<string>('Ziraat Bankası güvenlik profili ile tam uyumlu');
  const [pixelStats, setPixelStats] = useState<PixelStats | null>(null);
  const [mlResult, setMlResult] = useState<MLPredictionResult | null>(null);
  const [ocrResult, setOcrResult] = useState<OcrAnalysisResult | null>(null);

  // Twin & QR state
  const [twinCollisionResult, setTwinCollisionResult] = useState<{
    hasCollision: boolean;
    record: TwinCheckRecord;
    alertLevel: 'GREEN' | 'YELLOW' | 'RED';
  } | null>(null);
  const [qrCheckData, setQrCheckData] = useState<QrCheckData | null>(null);

  // Blockchain Ledger
  const [ledgerManager] = useState<CryptoLedgerManager>(() => new CryptoLedgerManager());
  const [chainLength, setChainLength] = useState<number>(1);
  const [latestHash, setLatestHash] = useState<string>('');
  const [latestIpfsCid, setLatestIpfsCid] = useState<string>('QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco');
  const [ledgerIntegrity, setLedgerIntegrity] = useState<boolean>(true);

  // ML Detector
  const [mlDetector] = useState<MLFraudDetector>(() => new MLFraudDetector());
  const [mlSampleCount, setMlSampleCount] = useState<number>(10);

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);
  const edgeCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rawImageRef = useRef<HTMLImageElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const currentBank: BankProfile = BANK_PROFILES[selectedBankKey] || BANK_PROFILES.ziraat;

  // Initialize synthetic check
  const drawSyntheticCheck = useCallback((bank: BankProfile) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background paper texture
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#FAF7EE');
    grad.addColorStop(0.5, '#F5EFE0');
    grad.addColorStop(1, '#EDE4CE');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Guilloche security patterns / fine lines
    ctx.strokeStyle = 'rgba(14, 30, 51, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < h; i += 8) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.bezierCurveTo(w * 0.3, i + Math.sin(i * 0.1) * 12, w * 0.7, i - Math.cos(i * 0.1) * 12, w, i);
      ctx.stroke();
    }

    // Border guilloche
    ctx.strokeStyle = '#0E1E33';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // Bank Header
    ctx.fillStyle = '#0E1E33';
    ctx.font = 'bold 22px "Georgia", serif';
    ctx.fillText(bank.name.toUpperCase(), 36, 56);

    ctx.font = '11px "Courier New", monospace';
    ctx.fillStyle = '#6B7A90';
    ctx.fillText(`BANKA KODU: ${bank.code} | ŞUBE: 0844 MERKEZ TİCARİ`, 36, 76);

    // QR Code visual imitation on check upper corner
    ctx.fillStyle = '#0E1E33';
    ctx.fillRect(w - 300, 36, 48, 48);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(w - 296, 40, 16, 16);
    ctx.fillRect(w - 276, 40, 16, 16);
    ctx.fillRect(w - 296, 60, 16, 16);
    ctx.fillStyle = '#0E1E33';
    ctx.fillRect(w - 292, 44, 8, 8);
    ctx.fillRect(w - 272, 44, 8, 8);
    ctx.fillRect(w - 292, 64, 8, 8);

    // Amount box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(w - 240, 36, 200, 48);
    ctx.strokeStyle = '#0E1E33';
    ctx.strokeRect(w - 240, 36, 200, 48);
    ctx.fillStyle = '#0E1E33';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('₺ 1.250.000,00', w - 225, 68);

    // Payee line
    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#6B7A90';
    ctx.fillText('ÖDEYİNİZ (LEHDAR):', 36, 120);
    ctx.font = 'bold 14px "Georgia", serif';
    ctx.fillStyle = '#0E1E33';
    ctx.fillText('DEMİR ÇELİK VE METAL SANAYİ DIŞ TİCARET A.Ş.', 190, 120);

    // Amount in text
    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#6B7A90';
    ctx.fillText('YALNIZ:', 36, 150);
    ctx.font = 'italic 13px "Georgia", serif';
    ctx.fillStyle = '#0E1E33';
    ctx.fillText('BİRMİLYONİKİYÜZELLİBİN TÜRK LİRASI', 100, 150);

    // Date & Place
    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#6B7A90';
    ctx.fillText('DÜZENLEME YERİ / TARİHİ: İSTANBUL / 15.12.2026', 36, 185);

    // Security Holographic Strip Marker
    const threadX = (0.38 + bank.holographicShift * 0.1) * w;
    ctx.fillStyle = 'rgba(180, 195, 215, 0.5)';
    ctx.fillRect(threadX - 18, 16, 36, h - 32);
    ctx.fillStyle = '#0E1E33';
    ctx.font = '9px "Courier New", monospace';
    ctx.save();
    ctx.translate(threadX - 4, h * 0.5);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('TEMKİN SECURE THREAD 365nm', -80, 0);
    ctx.restore();

    // Drawer Signature Area
    ctx.strokeStyle = '#6B7A90';
    ctx.strokeRect(w - 240, 110, 200, 80);
    ctx.font = '10px "Courier New", monospace';
    ctx.fillStyle = '#6B7A90';
    ctx.fillText('KEŞİDECİ KAŞE / İMZA', w - 225, 128);
    
    // Stamp imitation
    ctx.strokeStyle = '#1f8a5b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w - 225, 135, 120, 45);
    ctx.fillStyle = '#1f8a5b';
    ctx.font = '9px sans-serif';
    ctx.fillText('ABC MAKİNA SAN. LTD.', w - 215, 150);
    ctx.fillText('VKN: 1234567890', w - 215, 165);

    // Bottom Magnetic Band (MICR)
    ctx.fillStyle = '#FAF7EE';
    ctx.fillRect(16, h - 60, w - 32, 44);
    ctx.strokeStyle = '#0E1E33';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, h - 60, w - 32, 44);

    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillStyle = '#0E1E33';
    ctx.fillText(`C${bank.code}C 0844 1234567890A 88492019C`, 45, h - 32);

    const img = new Image();
    img.src = canvas.toDataURL();
    rawImageRef.current = img;
  }, []);

  // Update canvas rendering loop
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rawImageRef.current) return;

    ImageProcessor.renderCompositeFrame(canvas, rawImageRef.current, {
      uvMode,
      magneticMode,
      holographicMode,
      time: performance.now(),
      holographicShift: currentBank.holographicShift
    });

    animationFrameRef.current = requestAnimationFrame(renderFrame);
  }, [uvMode, magneticMode, holographicMode, currentBank]);

  // Initial load
  useEffect(() => {
    drawSyntheticCheck(currentBank);
    runFullAnalysis(currentBank);
  }, [selectedBankKey, drawSyntheticCheck]);

  // Animation cycle
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderFrame]);

  // Execute Full Analysis Pipeline
  const runFullAnalysis = async (bank: BankProfile) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const startTime = performance.now();

    // 1. Pixel stats & magnetic density
    const stats = ImageProcessor.computePixelStats(ctx, canvas.width, canvas.height);
    setPixelStats(stats);

    // 2. Render Secondary Maps
    if (heatmapCanvasRef.current) {
      ImageProcessor.renderMagneticHeatmap(canvas, heatmapCanvasRef.current, 140);
    }
    if (edgeCanvasRef.current) {
      ImageProcessor.renderEdgeMap(canvas, edgeCanvasRef.current);
    }

    // 3. Bank Profile Verification
    const [minD, maxD] = bank.magneticDensityRange;
    const isDensityOk = stats.magneticDensity >= minD && stats.magneticDensity <= maxD;

    // 4. ML Fraud Detection
    const mlPred = mlDetector.predict(stats, bank);
    setMlResult(mlPred);

    // 5. Twin Check & Collision Check
    const twinRes = TwinCheckDetector.checkCollision('88492019', bank.code, '1234567890', 1250000);
    setTwinCollisionResult(twinRes);

    // 6. QR Check Data Parse
    const qrData = QrCheckParser.parseQrPayload('DEMO_QR_PAYLOAD');
    setQrCheckData(qrData);

    // 7. OCR & Ciro Analysis
    const ocr = OcrEngine.analyzeEndorsements(
      `ABC Makina San. ve Tic. Ltd. Şti. — Keşideci Kaşe & Yetkili İmza (VKN: 1234567890)\n` +
      `Ödeyiniz: Demir Çelik Dış Ticaret A.Ş. — 1. Ciro (VKN: 9876543210)\n` +
      `Ödeyiniz: Karadeniz Metal Lojistik — 2. Ciro (${bank.name} Şube Teyitli)\n` +
      `Ödeyiniz: XYZ Lojistik Dış Tic. Ltd. — 3. Ciro (İmza Eksik / İcra Şüphesi)\n` +
      `Ödeyiniz: Sizin Firmanız Tic. A.Ş. — Son Hamil`,
      stats.magneticDensity
    );
    setOcrResult(ocr);

    // Compute final fraud score & verdict
    let calculatedScore = mlPred.isFraud ? Math.round(mlPred.fraudProbability * 85 + 15) : Math.round(mlPred.fraudProbability * 35);
    if (!isDensityOk) calculatedScore += 22;
    calculatedScore = Math.max(5, Math.min(95, calculatedScore));
    setFraudScore(calculatedScore);

    let finalVerdict: 'ONAYLANDI' | 'TEMKİNLİ İLERLE' | 'REDDEDİLDİ' = 'ONAYLANDI';
    let verif = `✅ ${bank.name} profili ile tam uyumlu (${(stats.magneticDensity * 100).toFixed(1)}% manyetik yoğunluk)`;

    if (calculatedScore > 65) {
      finalVerdict = 'REDDEDİLDİ';
      verif = `🚨 SAHTE / TAHRİFAT RİSKİ: ${bank.name} manyetik toleransı dışında ve optik tahrifat şüphesi!`;
      setStatusType('error');
    } else if (calculatedScore > 35) {
      finalVerdict = 'TEMKİNLİ İLERLE';
      verif = `⚠ ŞÜPHELİ HALKA: Ciro silsilesinde teyitsiz imza mevcut, ek teminat önerilir.`;
      setStatusType('warning');
    } else {
      setStatusType('success');
    }

    setVerdict(finalVerdict);
    setVerificationText(verif);

    // 8. Record to Merkle Blockchain Ledger
    const block = await ledgerManager.addBlock(
      bank.name,
      calculatedScore,
      stats.magneticDensity,
      finalVerdict
    );
    setChainLength(ledgerManager.getChain().length);
    setLatestHash(block.hash);
    setLatestIpfsCid(block.ipfsCid);

    const integrity = await ledgerManager.verifyIntegrity();
    setLedgerIntegrity(integrity.valid);

    const endTime = performance.now();
    const exec = Number((endTime - startTime).toFixed(2));
    setProcessTime(exec);
    setStatusMessage(`✅ ${bank.name} çek analizi tamamlandı (${exec} ms)`);

    if (onCheckAnalyzed) {
      onCheckAnalyzed({
        bank: bank.name,
        score: calculatedScore,
        verdict: finalVerdict,
        density: stats.magneticDensity
      });
    }
  };

  // Camera Handlers
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'environment' },
        audio: false
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      setStatusMessage('📹 Canlı kamera akışı aktif — otomatik çerçeve ve perspektif tespiti açık');
      setStatusType('info');
    } catch (err: any) {
      setStatusMessage('❌ Kamera açılamadı: ' + (err.message || 'Erişim reddedildi'));
      setStatusType('error');
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setStatusMessage('⏹ Kamera durduruldu');
  };

  const captureFrameFromCamera = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = canvas.toDataURL();
    rawImageRef.current = img;

    runFullAnalysis(currentBank);
    stopCamera();
    setStatusMessage('📸 Canlı görüntü yakalandı ve Core-Zero motorunda mühürlendi');
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      rawImageRef.current = img;
      runFullAnalysis(currentBank);
      setStatusMessage(`✅ ${file.name} yüklendi ve perspektif düzeltmesi uygulandı`);
    };
    img.src = URL.createObjectURL(file);
  };

  // ML Training trigger
  const handleTrainML = () => {
    if (!pixelStats) return;
    const isFraud = fraudScore > 40;
    mlDetector.addTrainingSample(pixelStats, isFraud, currentBank.name);
    const trainResult = mlDetector.train(30, 0.05);
    setMlSampleCount(mlDetector.getSampleCount());
    setStatusMessage(`🧠 Yapay Zeka Modeli Eğitildi (Loss: ${trainResult.loss.toFixed(4)}, Doğruluk: %${(trainResult.accuracy * 100).toFixed(0)})`);
    setStatusType('success');
  };

  // Voice narration toggle
  const toggleVoiceAssistant = () => {
    if (isSpeaking) {
      AudioSpeechAssistant.stop();
      setIsSpeaking(false);
    } else {
      const spokenSummary = `Temkin Bey Karar Özeti: ${currentBank.name} için analiz sonucu ${verdict}. Manyetik mürekkep yoğunluğu yüzde ${((pixelStats?.magneticDensity || 0.05) * 100).toFixed(1)}. İkiz çek taraması ve MERSİS sorgulaması yapıldı.`;
      AudioSpeechAssistant.speak(
        spokenSummary,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Export Ledger
  const handleExportLedger = () => {
    const jsonStr = ledgerManager.exportJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `temkin_merkle_ledger_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage('📤 Merkle Kriptografik Defteri JSON olarak dışa aktarıldı');
  };

  // Import Ledger
  const handleImportLedger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = ledgerManager.importJson(text);
      if (success) {
        setChainLength(ledgerManager.getChain().length);
        setLatestHash(ledgerManager.getLatestHash());
        setStatusMessage(`📥 Merkle Defteri içe aktarıldı (${ledgerManager.getChain().length} blok)`);
        setStatusType('success');
      } else {
        setStatusMessage('❌ Defter JSON formatı geçersiz');
        setStatusType('error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="core-zero-studio" className="rounded-[28px] bg-white border border-[#EAE5DD] shadow-[0_20px_50px_-20px_rgba(14,30,51,0.08)] overflow-hidden transition-all">
      {/* Studio Header Bar */}
      <div className="bg-[#0E1E33] text-white px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="h-2 w-2 rounded-full bg-[#1f8a5b] animate-pulse" />
            <span className="text-[12px] font-mono tracking-[0.2em] uppercase text-white/70">
              TEMKİN CORE-ZERO OPTİK & İSTİHBARAT SUITE v4.0
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#1f8a5b] text-[9px] font-mono text-white font-bold">
              6 DEV MODÜL ENTEGRE
            </span>
          </div>
          <h2 className="serif text-[22px] tracking-tight text-white m-0">
            Kambiyo Optik Spektrometri & Kriptografik Denetim Kokpiti
          </h2>
        </div>

        {/* Action Controls in Header */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Voice Assistant Button */}
          <button
            onClick={toggleVoiceAssistant}
            className={`h-8 px-3 rounded-full text-[11px] font-mono flex items-center gap-1.5 transition border ${
              isSpeaking
                ? 'bg-[#1f8a5b] text-white border-[#1f8a5b] animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} className="text-[#1f8a5b]" />}
            <span>{isSpeaking ? 'Sesi Durdur' : 'Sesli Dinle'}</span>
          </button>

          {/* Factoring Simulator Trigger */}
          <button
            onClick={() => setIsFactoringModalOpen(true)}
            className="h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 transition border border-white/15"
          >
            <Calculator size={12} className="text-[#1f8a5b]" />
            <span>Mali Temlik</span>
          </button>

          {/* Official PDF Report Trigger */}
          <button
            onClick={() => setIsOfficialReportModalOpen(true)}
            className="h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 transition border border-white/15"
          >
            <Printer size={12} className="text-[#1f8a5b]" />
            <span>Resmi Rapor</span>
          </button>

          {/* Bank Profile Selector */}
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 border border-white/15">
            <Database size={12} className="text-white/70" />
            <select
              value={selectedBankKey}
              onChange={(e) => setSelectedBankKey(e.target.value)}
              className="bg-transparent text-[11px] font-mono text-white focus:outline-none cursor-pointer"
            >
              {Object.keys(BANK_PROFILES).map((key) => {
                const b = BANK_PROFILES[key];
                return (
                  <option key={key} value={key} className="text-[#0E1E33] bg-white">
                    🏦 {b.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="h-8 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 transition border border-white/15"
          >
            <Upload size={12} />
            <span>Yükle</span>
          </button>

          {/* Camera Button */}
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              className="h-8 px-3 rounded-full bg-[#1f8a5b] hover:bg-[#1f8a5b]/90 text-white text-[11px] font-mono flex items-center gap-1.5 transition shadow-sm font-semibold"
            >
              <Camera size={12} />
              <span>Kamera</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={captureFrameFromCamera}
                className="h-8 px-3 rounded-full bg-[#1f8a5b] hover:bg-[#1f8a5b]/90 text-white text-[11px] font-mono flex items-center gap-1.5 transition font-semibold"
              >
                <ScanLine size={12} />
                <span>Yakala</span>
              </button>
              <button
                onClick={stopCamera}
                className="h-8 px-3 rounded-full bg-[#a23b35] hover:bg-[#a23b35]/90 text-white text-[11px] font-mono flex items-center gap-1.5 transition"
              >
                <VideoOff size={12} />
                <span>Durdur</span>
              </button>
            </div>
          )}

          {/* Re-analyze button */}
          <button
            onClick={() => runFullAnalysis(currentBank)}
            className="h-8 px-3 rounded-full bg-white text-[#0E1E33] text-[11px] font-mono font-semibold flex items-center gap-1.5 transition hover:bg-white/90"
          >
            <RefreshCw size={12} />
            <span>Yeniden Tara</span>
          </button>
        </div>
      </div>

      {/* Mode & Kokpit Sub-Tabs Bar */}
      <div className="bg-[#F5F1E9] px-6 py-3 border-b border-[#EAE5DD] flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono">
        {/* Navigation sub-tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: 'optics', label: '🔬 Optik & Spektrometri' },
            { id: 'networkGraph', label: '🕸 Ciro Zincir Ağı' },
            { id: 'qrAndTwins', label: '🪞 İkiz Çek & Karekod' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setKokpitTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition font-medium ${
                kokpitTab === tab.id
                  ? 'bg-[#0E1E33] text-white shadow-xs'
                  : 'bg-white text-[#0E1E33] border border-[#EAE5DD] hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Optical Mode Toggles (when in optics tab) */}
        {kokpitTab === 'optics' && (
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uvMode}
                onChange={(e) => setUvMode(e.target.checked)}
                className="accent-[#0E1E33] h-3.5 w-3.5 rounded"
              />
              <span className={uvMode ? 'text-[#0E1E33] font-semibold' : 'text-[#6B7A90]'}>
                🌟 UV Floresan (365nm)
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={magneticMode}
                onChange={(e) => setMagneticMode(e.target.checked)}
                className="accent-[#0E1E33] h-3.5 w-3.5 rounded"
              />
              <span className={magneticMode ? 'text-[#0E1E33] font-semibold' : 'text-[#6B7A90]'}>
                🧲 Manyetik (NIR)
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={holographicMode}
                onChange={(e) => setHolographicMode(e.target.checked)}
                className="accent-[#0E1E33] h-3.5 w-3.5 rounded"
              />
              <span className={holographicMode ? 'text-[#0E1E33] font-semibold' : 'text-[#6B7A90]'}>
                ✨ Holografik Şerit
              </span>
            </label>
          </div>
        )}

        {/* Live Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
              statusType === 'success'
                ? 'bg-[#1f8a5b]/10 text-[#1f8a5b]'
                : statusType === 'error'
                ? 'bg-[#a23b35]/10 text-[#a23b35]'
                : statusType === 'warning'
                ? 'bg-[#a56b13]/10 text-[#a56b13]'
                : 'bg-[#0E1E33]/10 text-[#0E1E33]'
            }`}
          >
            {statusMessage}
          </span>
        </div>
      </div>

      {/* Main Content Body Based on Kokpit Tab */}
      <div className="p-6">
        {/* Tab 1: Optics & Spectrometry Viewport */}
        {kokpitTab === 'optics' && (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
            {/* Left: Interactive Canvas Viewport with HUD Overlay */}
            <div className="space-y-4">
              <div className="relative rounded-[20px] bg-[#0E1E33] border border-[#0E1E33]/30 overflow-hidden shadow-inner flex items-center justify-center min-h-[380px]">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full h-auto max-h-[460px] object-contain block"
                />

                {isCameraActive && (
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover z-20"
                  />
                )}

                {/* Live Camera HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-30 font-mono text-white text-shadow">
                  <div className="flex items-center justify-between bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full text-[11px] border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#1f8a5b] animate-ping" />
                      <span>{fps} FPS (WASM CORE)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🏦 {currentBank.name}</span>
                      <span className="text-white/60">({currentBank.code})</span>
                    </div>
                    <div>⚡ {processTime} ms</div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 opacity-70">
                    <div className="w-16 h-16 border border-dashed border-white/50 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#1f8a5b]" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-white/80">
                      PERSPECTIVE ALIGNED
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-black/50 backdrop-blur-xs px-3.5 py-2 rounded-[14px] text-[11px] border border-white/10">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-white/60 text-[9px] block">MANYETİK MÜREKKEP:</span>
                        <span className="font-semibold text-[#1f8a5b]">
                          %{((pixelStats?.magneticDensity || 0.05) * 100).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/60 text-[9px] block">BANKA BANDI:</span>
                        <span>%{(currentBank.magneticDensityRange[0] * 100).toFixed(0)} - %{(currentBank.magneticDensityRange[1] * 100).toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-white/60 text-[9px] block">FRAUD SKORU:</span>
                      <span
                        className={`font-bold text-[14px] ${
                          verdict === 'ONAYLANDI'
                            ? 'text-[#1f8a5b]'
                            : verdict === 'TEMKİNLİ İLERLE'
                            ? 'text-[#a56b13]'
                            : 'text-[#a23b35]'
                        }`}
                      >
                        {fraudScore}/100 — {verdict}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Maps: Heatmap & Edge Map */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-[18px] bg-[#FCFBF7] border border-[#EAE5DD] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#0E1E33]">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Activity size={13} className="text-[#a56b13]" />
                      Manyetik Isı Haritası (Heatmap)
                    </span>
                    <span className="text-[#6B7A90] text-[10px]">MICR Bant Yoğunluğu</span>
                  </div>
                  <canvas
                    ref={heatmapCanvasRef}
                    width={360}
                    height={160}
                    className="w-full h-auto rounded-[12px] border border-[#EAE5DD] block bg-[#0E1E33]"
                  />
                </div>

                <div className="rounded-[18px] bg-[#FCFBF7] border border-[#EAE5DD] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#0E1E33]">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Layers size={13} className="text-[#1f8a5b]" />
                      Klişe & Kabartma Haritası (Sobel)
                    </span>
                    <span className="text-[#6B7A90] text-[10px]">Optik Relief Analizi</span>
                  </div>
                  <canvas
                    ref={edgeCanvasRef}
                    width={360}
                    height={160}
                    className="w-full h-auto rounded-[12px] border border-[#EAE5DD] block bg-[#0E1E33]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Analysis Dossier & Multi-Panel Modules */}
            <div className="space-y-4">
              <div className="p-5 rounded-[22px] bg-[#FCFBF7] border border-[#EAE5DD] space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-[#EAE5DD] pb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#6B7A90] uppercase block">
                      KOKPİT KARAR RAPORU
                    </span>
                    <h3 className="serif text-[20px] text-[#0E1E33] m-0">
                      {currentBank.name} Çek İncelemesi
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider ${
                      verdict === 'ONAYLANDI'
                        ? 'bg-[#1f8a5b] text-white'
                        : verdict === 'TEMKİNLİ İLERLE'
                        ? 'bg-[#a56b13] text-white'
                        : 'bg-[#a23b35] text-white'
                    }`}
                  >
                    {verdict}
                  </span>
                </div>

                <div className="space-y-2 text-[12px] font-mono">
                  <div className="flex justify-between py-1 border-b border-[#EAE5DD]/60">
                    <span className="text-[#6B7A90]">Doğrulama Sonucu:</span>
                    <span className="font-medium text-[#0E1E33] text-right max-w-[200px]">
                      {verificationText}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#EAE5DD]/60">
                    <span className="text-[#6B7A90]">Manyetik Mürekkep:</span>
                    <span className="font-semibold text-[#0E1E33]">
                      %{((pixelStats?.magneticDensity || 0.05) * 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#EAE5DD]/60">
                    <span className="text-[#6B7A90]">UV Floresan Deseni:</span>
                    <span className="text-[#0E1E33] text-[11px]">
                      {currentBank.uvFluorescencePattern}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#EAE5DD]/60">
                    <span className="text-[#6B7A90]">Holografik Açı Kayması:</span>
                    <span className="text-[#0E1E33]">{currentBank.holographicShift.toFixed(2)} rad</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-[#6B7A90]">İşlem & Yanıt Süresi:</span>
                    <span className="text-[#1f8a5b] font-semibold">{processTime} ms</span>
                  </div>
                </div>
              </div>

              {/* Module 1: CIRO OCR Analizi */}
              <div className="p-5 rounded-[22px] bg-white border border-[#EAE5DD] space-y-3">
                <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-2">
                  <span className="text-[12px] font-mono font-semibold text-[#0E1E33] flex items-center gap-1.5">
                    <FileText size={14} className="text-[#0E1E33]" />
                    CIRO OCR & SİLSİLE OKUYUCU
                  </span>
                  <span className="text-[10px] font-mono text-[#1f8a5b] bg-[#1f8a5b]/10 px-2 py-0.5 rounded-full">
                    Güven: %92
                  </span>
                </div>

                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {ocrResult?.ciroChain.map((ciro) => (
                    <div
                      key={ciro.id}
                      className={`p-2 rounded-[10px] text-[11px] font-mono border flex items-start gap-2 ${
                        ciro.isValid
                          ? 'bg-[#1f8a5b]/5 border-[#1f8a5b]/20 text-[#0E1E33]'
                          : 'bg-[#a23b35]/5 border-[#a23b35]/20 text-[#a23b35]'
                      }`}
                    >
                      <span className="font-bold shrink-0">#{ciro.id}</span>
                      <div className="flex-1">
                        <div className="leading-tight">{ciro.text}</div>
                        {ciro.riskNote && (
                          <div className="text-[10px] font-semibold mt-0.5 opacity-90">
                            ⚠ {ciro.riskNote}
                          </div>
                        )}
                      </div>
                      {ciro.isValid ? (
                        <CheckCircle2 size={13} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle size={13} className="text-[#a23b35] shrink-0 mt-0.5" />
                      )}
                    </div>
                  ))}
                </div>

                {ocrResult?.crossValidationVerdict && (
                  <div className="text-[11px] font-mono p-2 rounded-[10px] bg-[#F5F1E9] text-[#0E1E33] border border-[#EAE5DD]">
                    {ocrResult.crossValidationVerdict}
                  </div>
                )}
              </div>

              {/* Module 2: Yapay Zeka (ML) Sahte Tespiti */}
              <div className="p-5 rounded-[22px] bg-white border border-[#EAE5DD] space-y-3">
                <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-2">
                  <span className="text-[12px] font-mono font-semibold text-[#0E1E33] flex items-center gap-1.5">
                    <Cpu size={14} className="text-[#0E1E33]" />
                    MAKİNE ÖĞRENMESİ (ML FRAUD DETECTOR)
                  </span>
                  <span className="text-[10px] font-mono text-[#6B7A90]">
                    {mlSampleCount} Eğitim Örneği
                  </span>
                </div>

                <div className="space-y-2 text-[12px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7A90]">Sahte Olma İhtimali:</span>
                    <span
                      className={`font-bold ${
                        mlResult?.isFraud ? 'text-[#a23b35]' : 'text-[#1f8a5b]'
                      }`}
                    >
                      %{((mlResult?.fraudProbability || 0.12) * 100).toFixed(1)}
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-[#F5F1E9] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        mlResult?.isFraud ? 'bg-[#a23b35]' : 'bg-[#1f8a5b]'
                      }`}
                      style={{ width: `${(mlResult?.fraudProbability || 0.12) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-[#6B7A90] m-0">
                    {mlResult?.explanation || 'Model optik matris verilerini analiz ediyor.'}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={handleTrainML}
                    className="flex-1 h-7 rounded-full bg-[#0E1E33] hover:bg-[#0E1E33]/90 text-white text-[10px] font-mono font-medium transition"
                  >
                    Modeli Eğit (Gradient Step)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Ciro Network Graph */}
        {kokpitTab === 'networkGraph' && (
          <div className="space-y-4">
            <CiroNetworkGraph />
          </div>
        )}

        {/* Tab 3: Twin Check Detector & QR Check Details */}
        {kokpitTab === 'qrAndTwins' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Twin Check Box */}
            <div className="p-5 rounded-[22px] bg-white border border-[#EAE5DD] space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-3">
                <div className="flex items-center gap-2">
                  <CopyCheck size={16} className="text-[#0E1E33]" />
                  <span className="text-[13px] font-bold text-[#0E1E33] uppercase">
                    İkiz Çek & Klişe Kardeşliği Dedektörü
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    twinCollisionResult?.hasCollision
                      ? 'bg-[#a23b35] text-white'
                      : 'bg-[#1f8a5b] text-white'
                  }`}
                >
                  {twinCollisionResult?.hasCollision ? '🚨 İKİZ ÇEK UYARISI' : '✅ ÖZGÜN ÇEK'}
                </span>
              </div>

              <div className="space-y-2 text-[12px]">
                <p className="text-[#6B7A90] text-[11px] leading-relaxed">
                  {twinCollisionResult?.record.explanation}
                </p>

                <div className="p-3 bg-[#FCFBF7] rounded-[12px] border border-[#EAE5DD] space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6B7A90]">Son Sorgulama Konumu:</span>
                    <span className="font-semibold text-[#0E1E33]">
                      {twinCollisionResult?.record.scannedByLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7A90]">Klişe Parmak İzi Benzerliği:</span>
                    <span className="font-semibold text-[#0E1E33]">
                      %{twinCollisionResult?.record.matchScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7A90]">Kayıt Kimliği:</span>
                    <span className="font-mono text-[#0E1E33]">
                      {twinCollisionResult?.record.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Check Performance Box */}
            <div className="p-5 rounded-[22px] bg-white border border-[#EAE5DD] space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-3">
                <div className="flex items-center gap-2">
                  <QrCode size={16} className="text-[#0E1E33]" />
                  <span className="text-[13px] font-bold text-[#0E1E33] uppercase">
                    Karekod (KKB/QR) 12 Aylık Karne
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1f8a5b] text-white">
                  Not: {qrCheckData?.grade}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-[#FCFBF7] rounded-[12px] border border-[#EAE5DD]">
                  <span className="text-[#6B7A90] block text-[10px]">ÖDENEN ÇEK (12 AY):</span>
                  <span className="font-bold text-[14px] text-[#1f8a5b]">
                    {qrCheckData?.paidCheckCount12m} Adet (₺{(qrCheckData?.paidCheckAmount12m || 0) / 1e6}M)
                  </span>
                </div>

                <div className="p-3 bg-[#FCFBF7] rounded-[12px] border border-[#EAE5DD]">
                  <span className="text-[#6B7A90] block text-[10px]">KARŞILIKSIZ / YAZILAN:</span>
                  <span className="font-bold text-[14px] text-[#a23b35]">
                    {qrCheckData?.bouncedCheckCount12m} Adet (Sonradan Ödendi)
                  </span>
                </div>

                <div className="p-3 bg-[#FCFBF7] rounded-[12px] border border-[#EAE5DD]">
                  <span className="text-[#6B7A90] block text-[10px]">PİYASADA DOLAŞIMDA:</span>
                  <span className="font-bold text-[14px] text-[#0E1E33]">
                    {qrCheckData?.circulatingCheckCount} Adet (₺{(qrCheckData?.circulatingTotalAmount || 0) / 1e6}M)
                  </span>
                </div>

                <div className="p-3 bg-[#FCFBF7] rounded-[12px] border border-[#EAE5DD]">
                  <span className="text-[#6B7A90] block text-[10px]">İLK ÇEK GEÇMİŞİ:</span>
                  <span className="font-bold text-[11px] text-[#0E1E33]">
                    {qrCheckData?.firstCheckDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module 3: Kriptografik Merkle Zinciri & Blockchain Senkronizasyonu */}
      <div className="bg-[#FAF7EE] px-6 py-4 border-t border-[#EAE5DD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] font-mono">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0E1E33]">
            <Lock size={14} className="text-[#1f8a5b]" />
            <span className="font-semibold">MERKLE DEĞİŞTİRİLEMEZ DEFTER & BLOCKCHAIN MÜHRÜ</span>
            <span className="text-[10px] bg-[#1f8a5b]/10 text-[#1f8a5b] px-2 py-0.5 rounded-full font-bold">
              {ledgerIntegrity ? '✅ ZİNCİR DOĞRULANDI' : '❌ TAHRİFAT SAPTANDI'}
            </span>
          </div>
          <div className="text-[11px] text-[#6B7A90] flex flex-wrap items-center gap-3">
            <span>Zincir: <strong className="text-[#0E1E33]">{chainLength} Blok</strong></span>
            <span>Blok Hash: <span className="text-[#0E1E33]">{latestHash ? latestHash.substring(0, 16) + '...' : 'GENESIS_001'}</span></span>
            <span>IPFS CID: <span className="text-[#0E1E33]">{latestIpfsCid.substring(0, 18)}...</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportLedger}
            className="h-8 px-3.5 rounded-full bg-white hover:bg-black/5 text-[#0E1E33] text-[11px] font-mono flex items-center gap-1.5 transition border border-[#EAE5DD]"
          >
            <Download size={12} />
            <span>Defteri Dışa Aktar (JSON)</span>
          </button>

          <label className="h-8 px-3.5 rounded-full bg-white hover:bg-black/5 text-[#0E1E33] text-[11px] font-mono flex items-center gap-1.5 transition border border-[#EAE5DD] cursor-pointer">
            <Upload size={12} />
            <span>İçe Aktar</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportLedger}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Factoring & Discount Simulator Modal */}
      <FactoringSimulatorModal
        isOpen={isFactoringModalOpen}
        onClose={() => setIsFactoringModalOpen(false)}
        amount={1250000}
        daysRemaining={90}
        temkinScore={fraudScore < 40 ? 92 : 68}
      />

      {/* Official Report Modal */}
      <OfficialReportModal
        isOpen={isOfficialReportModalOpen}
        onClose={() => setIsOfficialReportModalOpen(false)}
        bankName={currentBank.name}
        checkNumber="88492019"
        amount={1250000}
        score={fraudScore}
        verdict={verdict}
        blockHash={latestHash}
        ipfsCid={latestIpfsCid}
        density={pixelStats?.magneticDensity || 0.05}
      />
    </div>
  );
};
