import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, Sparkles, X } from 'lucide-react';
import { TRADE_GLOSSARY, GlossaryTerm } from '../data/glossary';

interface TermTooltipProps {
  termKey?: keyof typeof TRADE_GLOSSARY | string;
  customTerm?: GlossaryTerm;
  children?: React.ReactNode;
  inline?: boolean;
  className?: string;
  position?: 'top' | 'bottom' | 'auto';
  showIcon?: boolean;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({
  termKey,
  customTerm,
  children,
  inline = true,
  className = '',
  position = 'auto',
  showIcon = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const termData: GlossaryTerm | undefined =
    customTerm || (termKey ? TRADE_GLOSSARY[termKey] : undefined);

  // Position calculation
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      if (position === 'auto') {
        // If not enough room on top, open to bottom
        if (rect.top < 220) {
          setPlacement('bottom');
        } else {
          setPlacement('top');
        }
      } else {
        setPlacement(position);
      }
    }
  }, [isOpen, position]);

  // Click outside and escape handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Kambiyo':
        return 'bg-[#0E1E33] text-white';
      case 'Hukuk':
        return 'bg-[#a23b35] text-white';
      case 'İstihbarat':
        return 'bg-[#1f8a5b] text-white';
      case 'Risk':
        return 'bg-[#a56b13] text-white';
      default:
        return 'bg-[#6B7A90] text-white';
    }
  };

  return (
    <span
      ref={triggerRef}
      className={`relative ${inline ? 'inline-flex items-center gap-1' : 'block'} cursor-help ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      aria-expanded={isOpen}
      aria-label={`${termData.title} terim açıklaması`}
    >
      <span className="border-b border-dotted border-[#0E1E33]/50 hover:border-[#0E1E33] transition-colors pb-[1px]">
        {children || termData.term}
      </span>

      {showIcon && (
        <span className="opacity-60 hover:opacity-100 transition-opacity text-[#6B7A90] -translate-y-0.5">
          <HelpCircle size={12} />
        </span>
      )}

      {/* Popover Bubble */}
      {isOpen && (
        <span
          ref={popoverRef}
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className={`block absolute z-50 w-[290px] sm:w-[320px] p-4 rounded-[18px] bg-white border border-[#EAE5DD] shadow-[0_16px_36px_-10px_rgba(14,30,51,0.22)] text-left cursor-default transition-all duration-200 ease-out left-1/2 -translate-x-1/2 ${
            placement === 'top'
              ? 'bottom-full mb-2.5 animate-in fade-in-0 slide-in-from-bottom-2'
              : 'top-full mt-2.5 animate-in fade-in-0 slide-in-from-top-2'
          }`}
        >
          {/* Arrow notch */}
          <span
            className={`block absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-[#EAE5DD] ${
              placement === 'top'
                ? 'bottom-[-7px] border-r border-b'
                : 'top-[-7px] border-l border-t'
            }`}
          />

          <span className="block relative z-10 space-y-2.5">
            {/* Header: Category Badge + Title */}
            <span className="flex items-start justify-between gap-2 border-b border-[#EAE5DD] pb-2">
              <span className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadgeClass(
                    termData.category
                  )}`}
                >
                  {termData.category.toUpperCase()}
                </span>
                <span className="font-semibold text-[13px] text-[#0E1E33] leading-tight">
                  {termData.title}
                </span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-[#6B7A90] hover:text-[#0E1E33] p-0.5 rounded-full transition"
                aria-label="Kapat"
              >
                <X size={13} />
              </button>
            </span>

            {/* Definition text */}
            <span className="block text-[12px] leading-[1.6] text-[#0E1E33]/85 m-0 font-normal">
              {termData.definition}
            </span>

            {/* Practical Trade Tip if present */}
            {termData.tip && (
              <span className="flex p-2.5 rounded-[12px] bg-[#F5F1E9] border border-[#EAE5DD] text-[11px] leading-[1.5] text-[#0E1E33] items-start gap-2">
                <Sparkles size={13} className="text-[#a56b13] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-[#0E1E33]">Temkin İpucu:</strong>{' '}
                  {termData.tip}
                </span>
              </span>
            )}

            <span className="block text-[9px] font-mono text-[#6B7A90] pt-1 opacity-70">
              <span className="flex items-center justify-between">
                <span>TEMKİN KARAR SÖZLÜĞÜ</span>
                <span>Dokunarak kapat</span>
              </span>
            </span>
          </span>
        </span>
      )}
    </span>
  );
};
