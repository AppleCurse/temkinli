import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, Phone, Mail, CheckCircle2, X } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSaved] = useState(false);
  const [activeModal, setActiveModal] = useState<'kvkk' | 'terms' | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
    setEmailInput('');
  };

  const whatsappUrl = "https://wa.me/908505120737?text=" + encodeURIComponent("Merhaba, Temkin platformu hakkında kurumsal bilgi almak istiyorum.");

  return (
    <footer id="iletisim" className="bg-[#0E1E33] text-[#FCFBF7] rounded-t-[32px] mt-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          {/* Main Callout */}
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-[#FCFBF7]/40 uppercase mb-4">
              İLETİŞİM VE KURUMSAL İHTİYAT
            </div>
            <h2 className="serif text-[42px] sm:text-[64px] lg:text-[80px] leading-[0.9] tracking-[-0.04em] text-white">
              En pahalı karar,<br />
              <span className="opacity-60 italic text-[36px] sm:text-[54px] lg:text-[68px]">
                emin olmadan verilenidir.
              </span>
            </h2>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[56px] px-8 rounded-full bg-[#25D366] text-[#0E1E33] text-[15px] font-semibold items-center gap-3 hover:brightness-105 transition shadow-lg"
              >
                <MessageCircle size={20} />
                <span>WhatsApp’tan Anında Yaz</span>
                <ArrowUpRight size={18} />
              </a>

              <a
                href="tel:+908505120737"
                className="inline-flex h-[56px] px-8 rounded-full border border-white/20 text-white text-[15px] font-medium items-center gap-3 hover:bg-white/10 transition"
              >
                <Phone size={18} />
                <span>0850 512 07 37</span>
              </a>
            </div>
          </div>

          {/* Email Signup Form & Contact Details */}
          <div className="space-y-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[24px]">
            <div>
              <div className="text-[11px] font-mono text-[#FCFBF7]/50 uppercase mb-2">
                KURUMSAL BÜLTEN & SUNUM
              </div>
              <p className="text-[14px] text-[#FCFBF7]/80 leading-[1.6]">
                E-postanızı bırakın; Temkin karar istihbaratı sunumu ve örnek analiz raporunu iletelim.
              </p>

              <form onSubmit={handleEmailSubmit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="E-posta adresiniz..."
                  required
                  className="flex-1 h-11 rounded-full bg-white/10 border border-white/20 px-5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-full bg-white text-[#0E1E33] text-[13px] font-medium hover:bg-white/90 transition shrink-0"
                >
                  Gönder
                </button>
              </form>

              {submitted && (
                <div className="mt-3 text-[12px] font-mono text-[#2ECC71] flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  <span>Talebiniz alındı. Örnek rapor e-postanıza iletilecek.</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-[14px]">
                <Mail size={16} className="text-[#FCFBF7]/50" />
                <a href="mailto:bilgi@temkin.com.tr" className="text-white hover:underline">
                  bilgi@temkin.com.tr
                </a>
              </div>

              <div className="pt-2 text-[12px] font-mono text-[#FCFBF7]/60">
                TEMKİN TEKNOLOJİ A.Ş. • MERSİS NO: 081290182740001<br />
                Maslak Mah. Büyükdere Cad. No:182, Sarıyer / İSTANBUL
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 justify-between items-center text-[11px] font-mono text-[#FCFBF7]/50">
          <div>
            © 2026 TEMKİN TEKNOLOJİ A.Ş. • Tüm hakları saklıdır.
          </div>

          <div className="flex gap-6">
            <button onClick={() => setActiveModal('kvkk')} className="hover:text-white underline">
              KVKK Aydınlatma Metni
            </button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white underline">
              Kullanım Şartları
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Legal Notices */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#0E1E33] max-w-[540px] w-full p-6 sm:p-8 rounded-[24px] shadow-2xl relative space-y-4">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-[#6B7A90] hover:text-[#0E1E33]"
            >
              <X size={20} />
            </button>

            <div className="text-[10px] font-mono text-[#6B7A90] uppercase">YASAL BİLGİLENDİRME</div>
            <h3 className="serif text-[28px]">
              {activeModal === 'kvkk' ? 'KVKK Aydınlatma Metni' : 'Kullanım ve Hizmet Şartları'}
            </h3>

            <div className="text-[13px] text-[#6B7A90] leading-[1.65] space-y-3 max-h-[300px] overflow-y-auto pr-2">
              <p>
                Temkin Teknoloji A.Ş. olarak, platformumuz üzerinden iletilen ticari belge görselleri ve veriler 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca yalnızca anlık karar istihbaratı üretilmesi amacıyla işlenmektedir.
              </p>
              <p>
                Platformumuz bir kredi veya bankacılık kuruluşu değildir; sunulan skorlar ve tavsiyeler kamusal veri kaynakları, ticaret sicili ve optik tarama verilerine dayalı karar destek analizleridir.
              </p>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full h-11 rounded-full bg-[#0E1E33] text-white text-[13px] font-medium"
            >
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
