import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { AudioSpeechAssistant } from '../utils/audioSpeechAssistant';

interface TemkinBeyCardProps {
  speechText: string;
  verdict?: 'ILERLE' | 'TEMKİNLİ_İLERLE' | 'DUR' | null;
  isAnalyzing?: boolean;
}

export const TemkinBeyCard: React.FC<TemkinBeyCardProps> = ({
  speechText,
  verdict,
  isAnalyzing = false,
}) => {
  const [typedText, setTypedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Typewriter effect
  useEffect(() => {
    setTypedText('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(speechText.slice(0, i));
      if (i >= speechText.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [speechText]);

  // Voice narration toggle
  const toggleVoiceNarration = () => {
    if (isSpeaking) {
      AudioSpeechAssistant.stop();
      setIsSpeaking(false);
    } else {
      AudioSpeechAssistant.speak(
        speechText,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="rounded-[28px] bg-white border border-[#EAE5DD] p-6 lg:p-8 shadow-xs sticky top-[88px]">
      {/* Character Visual Stage */}
      <div className="relative mx-auto w-[240px] h-[300px] sm:w-[260px] sm:h-[320px] lg:w-[290px] lg:h-[360px] flex items-end justify-center">
        <div className="breathe w-full h-full">
          <svg
            viewBox="0 0 260 340"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow */}
            <ellipse cx="130" cy="328" rx="72" ry="8" fill="#0E1E33" opacity="0.08" />

            {/* Suit & Body */}
            <path d="M 28 300 Q 38 250 72 234 L 188 234 Q 222 250 232 300 Z" fill="#0E1E33" />
            
            {/* White Shirt Collar & Vest */}
            <path d="M 100 234 L 130 272 L 160 234 Z" fill="#FCFBF7" opacity="0.9" />
            
            {/* Tie */}
            <path d="M 118 250 L 130 290 L 142 250 Z" fill="#0E1E33" />
            <path d="M 122 250 L 130 268 L 138 250 Z" fill="white" opacity="0.85" />

            {/* Collar Band */}
            <rect x="110" y="210" width="40" height="28" rx="8" fill="#0E1E33" />

            {/* Head Silhouette */}
            <ellipse cx="130" cy="180" rx="52" ry="56" fill="#0E1E33" />

            {/* Classic Fedora Hat Brim & Crown */}
            <ellipse cx="130" cy="152" rx="88" ry="18" fill="#0E1E33" />
            <path
              d="M 78 152 Q 78 96 130 92 Q 182 96 182 152"
              fill="#0E1E33"
              stroke="#1A2E4F"
              strokeWidth="1.2"
            />
            {/* Hat Band */}
            <path d="M 80 138 Q 130 144 180 138 L 180 152 Q 130 158 80 152 Z" fill="#0A1528" />
            
            {/* Monocle or Glasses Reflection */}
            <ellipse cx="116" cy="112" rx="18" ry="10" fill="white" opacity="0.06" />

            {/* Glasses rim outline subtle */}
            <circle cx="115" cy="180" r="14" fill="none" stroke="#F5F1E9" strokeWidth="1.5" opacity="0.3" />
            <circle cx="145" cy="180" r="14" fill="none" stroke="#F5F1E9" strokeWidth="1.5" opacity="0.3" />
            <line x1="129" y1="180" x2="131" y2="180" stroke="#F5F1E9" strokeWidth="1.5" opacity="0.3" />
          </svg>
        </div>

        {/* Floating Character Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0E1E33] text-white rounded-full px-3.5 py-1.5 shadow-sm border border-white/10">
          <span
            className={`h-2 w-2 rounded-full ${
              isAnalyzing
                ? 'bg-[#a56b13] animate-pulse'
                : verdict === 'DUR'
                ? 'bg-[#a23b35]'
                : 'bg-[#2ECC71] animate-dot-pulse'
            }`}
          />
          <span className="text-[11px] font-mono tracking-wide whitespace-nowrap">
            Temkin Bey — Kıdemli İhtiyat
          </span>
        </div>
      </div>

      {/* Dynamic Typewriter Speech Bubble */}
      <div className="mt-6 relative rounded-[20px] border border-[#EAE5DD] bg-[#FCFBF7] p-5 pr-6 shadow-2xs">
        <div className="absolute -top-2 left-12 h-4 w-4 rotate-45 bg-[#FCFBF7] border-l border-t border-[#EAE5DD]" />
        
        {/* Speech Header with Audio Button */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#0E1E33]/50 uppercase">
            TEMKİN BEY DİYOR Kİ
          </div>

          <button
            onClick={toggleVoiceNarration}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition ${
              isSpeaking
                ? 'bg-[#1f8a5b] text-white animate-pulse'
                : 'bg-black/5 hover:bg-black/10 text-[#0E1E33]'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={12} />
                <span>Sesi Durdur</span>
              </>
            ) : (
              <>
                <Volume2 size={12} className="text-[#1f8a5b]" />
                <span>Sesli Dinle</span>
              </>
            )}
          </button>
        </div>

        <p className="serif text-[16px] sm:text-[17px] leading-[1.45] text-[#0E1E33] min-h-[76px] m-0">
          {typedText}
          <span className="inline-block w-[7px] h-[1.1em] bg-[#0E1E33]/40 ml-1 translate-y-0.5 animate-pulse" />
        </p>

        <div className="mt-4 pt-3 border-t border-[#EAE5DD]/60 flex items-center justify-between text-[11px] font-mono text-[#6B7A90]">
          <span className="flex items-center gap-1.5">
            <span className="h-[1px] w-6 bg-current inline-block" />
            <span>
              {isAnalyzing
                ? 'Analiz Taranıyor...'
                : verdict === 'ILERLE'
                ? 'Karar: İlerle'
                : verdict === 'TEMKİNLİ_İLERLE'
                ? 'Karar: Temkinli İlerle'
                : verdict === 'DUR'
                ? 'Karar: DUR!'
                : 'Karar Vermeden Önce'}
            </span>
          </span>
          <span className="text-[10px] opacity-70">2026 / VADELİ TİCARET</span>
        </div>
      </div>

      {/* Trust Stats Chips */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] font-mono">
        <div className="rounded-[14px] bg-[#F5F1E9] p-2.5 text-center">
          <div className="serif text-[18px] text-[#0E1E33] leading-none">1.247</div>
          <div className="text-[#6B7A90] mt-1 text-[10px]">çek temkinlendi</div>
        </div>
        <div className="rounded-[14px] bg-[#F5F1E9] p-2.5 text-center">
          <div className="serif text-[18px] text-[#0E1E33] leading-none">%98,3</div>
          <div className="text-[#6B7A90] mt-1 text-[10px]">isabet oranı</div>
        </div>
        <div className="rounded-[14px] bg-[#F5F1E9] p-2.5 text-center">
          <div className="serif text-[18px] text-[#0E1E33] leading-none">2.1s</div>
          <div className="text-[#6B7A90] mt-1 text-[10px]">karar süresi</div>
        </div>
      </div>
    </div>
  );
};
