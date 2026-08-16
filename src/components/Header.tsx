import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const whatsappUrl = "https://wa.me/908505120737?text=" + encodeURIComponent("Merhaba, Temkin hakkında bilgi almak istiyorum.");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b bg-[#FCFBF7]/90 border-[#EAE5DD]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8 lg:gap-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-3 text-left focus:outline-none group"
          >
            <span className="serif text-[28px] tracking-[-0.02em] font-normal text-[#0E1E33] group-hover:opacity-80 transition-opacity">
              TEMKİN
            </span>
            <span className="hidden sm:inline-block text-[9px] tracking-[0.22em] font-mono font-medium text-[#6B7A90] -translate-y-1">
              İHTİYAT PAYI
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] tracking-wide font-medium">
            {[
              { label: 'ÇEK ANALİZİ', id: 'cek' },
              { label: 'OPTİK KOKPİT v4.0', id: 'core-zero' },
              { label: 'VİTRİN', id: 'brand-gallery' },
              { label: 'HAFIZA DEFTERİ', id: 'defter' },
              { label: 'MODÜLLER', id: 'moduller' },
              { label: 'İLETİŞİM', id: 'iletisim' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors uppercase tracking-wider text-[11px] font-mono ${
                  link.id === 'core-zero'
                    ? 'text-[#1f8a5b] font-bold bg-[#1f8a5b]/10 px-2.5 py-1 rounded-full'
                    : 'text-[#0E1E33]/70 hover:text-[#0E1E33]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+908505120737"
            className="hidden md:flex items-center gap-2 text-[13px] font-mono font-medium tracking-wide text-[#0E1E33] hover:opacity-80 transition"
          >
            <Phone size={14} className="text-[#6B7A90]" />
            <span>0850 512 07 37</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 rounded-full bg-[#0E1E33] text-white text-[13px] font-medium flex items-center gap-2 hover:bg-[#0E1E33]/90 transition shadow-xs"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
