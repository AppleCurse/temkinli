import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { CheckAnalyzer } from './components/CheckAnalyzer';
import { TemkinBeyCard } from './components/TemkinBeyCard';
import { CoreZeroOpticsStudio } from './components/CoreZeroOpticsStudio';
import { ModulesSection } from './components/ModulesSection';
import { VerbSection } from './components/VerbSection';
import { FactoringComparison } from './components/FactoringComparison';
import { ContactFooter } from './components/ContactFooter';
import { BrandMediaGallerySection } from './components/BrandMediaGallerySection';
import { TemkinDefteriSection } from './components/TemkinDefteriSection';

import { CheckAnalysisResult, DefterEntry, VerdictType } from './types';
import { INITIAL_DEFTER_ENTRIES, TEMKIN_BEY_SPEECHES } from './data/sampleData';
import { MessageCircle, Sparkles, Cpu } from 'lucide-react';

export default function App() {
  const [temkinBeySpeech, setTemkinBeySpeech] = useState<string>(TEMKIN_BEY_SPEECHES.idle);
  const [currentVerdict, setCurrentVerdict] = useState<VerdictType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'analyzer' | 'coreZero'>('analyzer');
  const [defterEntries, setDefterEntries] = useState<DefterEntry[]>(INITIAL_DEFTER_ENTRIES);

  const scrollToSection = (id: string) => {
    if (id === 'core-zero') {
      setActiveTab('coreZero');
      setTimeout(() => {
        const el = document.getElementById('core-zero-container');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      return;
    }

    if (id === 'cek') {
      setActiveTab('analyzer');
      setTimeout(() => {
        const el = document.getElementById('cek');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveToDefter = useCallback((result: CheckAnalysisResult) => {
    const newEntry: DefterEntry = {
      id: `DEF-2026-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('tr-TR'),
      firmName: result.firmName,
      taxNumber: result.taxNumber,
      checkNumber: result.checkNumber,
      amount: result.amount,
      termDays: result.daysRemaining,
      score: result.score,
      verdict: result.verdict,
      summary: result.verdictSummary,
      category: 'Cek'
    };
    setDefterEntries((prev) => [newEntry, ...prev]);
  }, []);

  const handleAnalysisStateChange = useCallback(
    (
      frontUploaded: boolean,
      backUploaded: boolean,
      analyzing: boolean,
      result: CheckAnalysisResult | null
    ) => {
      setIsAnalyzing(analyzing);

      if (analyzing) {
        setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.analyzing);
        setCurrentVerdict(null);
        return;
      }

      if (result) {
        setCurrentVerdict(result.verdict);
        if (result.verdict === 'ILERLE') {
          setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.resultILERLE);
        } else if (result.verdict === 'TEMKİNLİ_İLERLE') {
          setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.resultTEMKİNLİ_İLERLE);
        } else {
          setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.resultDUR);
        }
        return;
      }

      if (frontUploaded && backUploaded) {
        setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.oneDone);
      } else if (frontUploaded) {
        setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.frontDone);
      } else if (backUploaded) {
        setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.backDone);
      } else {
        setTemkinBeySpeech(TEMKIN_BEY_SPEECHES.idle);
        setCurrentVerdict(null);
      }
    },
    []
  );

  const mobileWhatsappUrl =
    'https://wa.me/908505120737?text=' +
    encodeURIComponent('Merhaba, Temkin karar istihbaratı platformu hakkında bilgi alabilir miyim?');

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#0E1E33] selection:bg-[#0E1E33] selection:text-white">
      {/* Header Bar */}
      <Header onNavigate={scrollToSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onNavigate={scrollToSection} />

        {/* Manifesto Banner */}
        <ManifestoSection />

        {/* Navigation Mode Switcher Bar */}
        <section id="cek" className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 scroll-mt-20">
          <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-4 flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveTab('analyzer')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'analyzer'
                    ? 'bg-[#0E1E33] text-white shadow-sm'
                    : 'bg-white text-[#0E1E33] border border-[#EAE5DD] hover:bg-black/5'
                }`}
              >
                <Sparkles size={14} className={activeTab === 'analyzer' ? 'text-[#1f8a5b]' : ''} />
                <span>Temkin Karar İstihbaratı</span>
              </button>

              <button
                onClick={() => setActiveTab('coreZero')}
                className={`px-5 py-2.5 rounded-full text-[13px] font-medium font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'coreZero'
                    ? 'bg-[#0E1E33] text-white shadow-sm'
                    : 'bg-white text-[#0E1E33] border border-[#EAE5DD] hover:bg-black/5'
                }`}
              >
                <Cpu size={14} className={activeTab === 'coreZero' ? 'text-[#1f8a5b]' : ''} />
                <span>Core-Zero Optik Kokpit v4.0</span>
                <span className="text-[9px] bg-[#1f8a5b] text-white px-2 py-0.5 rounded-full font-bold">
                  WASM + ML + 30+ BANKA
                </span>
              </button>
            </div>

            <div className="text-[12px] font-mono text-[#6B7A90] hidden md:flex items-center gap-3">
              {activeTab === 'coreZero' ? (
                <>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a5b]" /> Spektral UV (365nm)
                  </span>
                  <span>•</span>
                  <span>Holografik Şerit</span>
                  <span>•</span>
                  <span>30+ Banka Profili</span>
                  <span>•</span>
                  <span>Merkle Defteri</span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a5b]" /> MERSİS Taraması
                  </span>
                  <span>•</span>
                  <span>Ciro Silsilesi</span>
                  <span>•</span>
                  <span>Konkordato & Karşılıksız Kütüğü</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* View Mode 1: Check Analyzer & Temkin Bey Section */}
        {activeTab === 'analyzer' && (
          <section id="analyzer" className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 scroll-mt-20">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-start">
              <div>
                <CheckAnalyzer
                  onAnalysisStateChange={handleAnalysisStateChange}
                  onSaveToDefter={handleSaveToDefter}
                />
              </div>
              <div>
                <TemkinBeyCard
                  speechText={temkinBeySpeech}
                  verdict={currentVerdict}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>
          </section>
        )}

        {/* View Mode 2: Core-Zero Optics & Intelligence Studio v4.0 */}
        {activeTab === 'coreZero' && (
          <section id="core-zero-container" className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 scroll-mt-20">
            <CoreZeroOpticsStudio />
          </section>
        )}

        {/* Modules Grid (01-04) */}
        <ModulesSection />

        {/* Brand Media Showcase & Posters */}
        <BrandMediaGallerySection />

        {/* Temkin Defteri (Ticari Hafıza ve Geçmiş) */}
        <TemkinDefteriSection entries={defterEntries} />

        {/* Verb Section ('temkinlemek') */}
        <VerbSection />

        {/* Factoring vs TEMKİN Comparison */}
        <FactoringComparison />
      </main>

      {/* Footer */}
      <ContactFooter />

      {/* Sticky Mobile Floating WhatsApp Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pointer-events-none bg-gradient-to-t from-[#FCFBF7] to-transparent pt-6">
        <a
          href={mobileWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex h-[52px] w-full rounded-full bg-[#0E1E33] text-white items-center justify-center gap-2.5 text-[14px] font-medium shadow-xl border border-white/10 active:scale-98 transition"
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          <span>WhatsApp’tan Sor — 0850 512 07 37</span>
        </a>
      </div>
    </div>
  );
}
