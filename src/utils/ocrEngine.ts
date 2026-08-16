export interface CiroOcrItem {
  id: number;
  text: string;
  isValid: boolean;
  bankMatch?: string;
  hasSignature: boolean;
  hasStamp: boolean;
  taxNumber?: string;
  riskNote?: string;
}

export interface OcrAnalysisResult {
  rawText: string;
  confidence: number;
  ciroChain: CiroOcrItem[];
  risks: string[];
  crossValidationVerdict: string;
  crossValidationScore: number; // 0-100
}

export class OcrEngine {
  private static BANK_KEYWORDS = [
    { key: "Ziraat", match: ["ziraat", "ziraat bankası"] },
    { key: "İş Bankası", match: ["iş bankası", "isbank", "türkiye iş"] },
    { key: "Garanti BBVA", match: ["garanti", "bbva", "garanti bbva"] },
    { key: "Yapı Kredi", match: ["yapı kredi", "yapi kredi", "ykb"] },
    { key: "Akbank", match: ["akbank", "ak bank"] },
    { key: "VakıfBank", match: ["vakıfbank", "vakifbank", "vakıf"] },
    { key: "Halkbank", match: ["halkbank", "halk bankası"] },
    { key: "DenizBank", match: ["denizbank", "deniz bank"] },
    { key: "QNB Finansbank", match: ["qnb", "finansbank"] },
    { key: "Kuveyt Türk", match: ["kuveyt", "kuveyt türk"] },
    { key: "Türkiye Finans", match: ["türkiye finans", "turkiye finans"] }
  ];

  public static analyzeEndorsements(rawText: string, magneticDensity: number): OcrAnalysisResult {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const ciroItems: CiroOcrItem[] = [];
    const risks: string[] = [];

    // Fallback default sample if raw text is empty
    const effectiveLines = lines.length > 0 ? lines : [
      "ABC Makina San. ve Tic. Ltd. Şti. — Keşideci Kaşe & Yetkili İmza (VKN: 1234567890)",
      "Ödeyiniz: Demir Çelik Dış Ticaret A.Ş. — 1. Ciro (VKN: 9876543210)",
      "Ödeyiniz: Karadeniz Metal Lojistik — 2. Ciro (Garanti BBVA Şube Teyitli)",
      "Ödeyiniz: XYZ Lojistik Dış Tic. Ltd. — 3. Ciro (İmza Eksik / İcra Şüphesi)",
      "Ödeyiniz: Sizin Firmanız Tic. A.Ş. — Son Hamil"
    ];

    effectiveLines.forEach((line, index) => {
      const lower = line.toLowerCase();
      const hasSignature = lower.includes('imza') || lower.includes('yetkili') || lower.includes('imzalı');
      const hasStamp = lower.includes('kaşe') || lower.includes('ltd') || lower.includes('a.ş') || lower.includes('san.') || lower.includes('vkn');
      const taxMatch = line.match(/\b\d{10}\b/);

      // Bank detection
      let bankMatch: string | undefined;
      for (const b of this.BANK_KEYWORDS) {
        if (b.match.some(m => lower.includes(m))) {
          bankMatch = b.key;
          break;
        }
      }

      const isValid = (hasSignature || hasStamp || line.length > 15) && !lower.includes('eksik') && !lower.includes('şüpheli');
      let riskNote: string | undefined;

      if (!isValid) {
        riskNote = "İmza/Yetki Kaşesi belirsiz veya pürüzlü";
      } else if (lower.includes('icra') || lower.includes('protesto')) {
        riskNote = "Karşılıksız/İcra kaydı referansı";
      }

      ciroItems.push({
        id: index + 1,
        text: line,
        isValid,
        bankMatch,
        hasSignature,
        hasStamp,
        taxNumber: taxMatch ? taxMatch[0] : undefined,
        riskNote
      });
    });

    // Detect Risks
    const invalidCount = ciroItems.filter(c => !c.isValid).length;
    if (invalidCount > 0) {
      risks.push(`Ciro zincirinde ${invalidCount} adet şüpheli / eksik onaylı imza-kaşe halkası tespit edildi.`);
    }

    if (ciroItems.length > 4) {
      risks.push(`Uzun ciro silsilesi (${ciroItems.length} halka) — ciro devir riskini artırmaktadır.`);
    }

    // Unique banks
    const banks = new Set(ciroItems.map(c => c.bankMatch).filter(Boolean));
    if (banks.size >= 3) {
      risks.push(`Çoklu banka geçişi (${banks.size} farklı banka referansı) — zincir kontrolü gerektirir.`);
    }

    // Cross-validation with physical magnetic density
    let crossScore = 100;
    let crossVerdict = "✅ OCR Metni ve Manyetik Mürekkep Verileri Tam Uyumlu — GÜVENLİ";

    if (magneticDensity < 0.02) {
      crossScore -= 45;
      crossVerdict = "🚨 UYUMSUZLUK: Kaşe ve ciro metinleri var ancak fiziki manyetik mürekkep yoğunluğu yetersiz!";
      risks.push("Optik metin ile fiziki mürekkep katmanı arasında dijital fotokopi tutarsızlığı saptandı.");
    } else if (invalidCount > 0) {
      crossScore -= 25;
      crossVerdict = "⚠ KISMI UYUM: Manyetik mürekkep mevcut ancak ciro halkasında eksik imza şüphesi var.";
    }

    return {
      rawText: effectiveLines.join('\n'),
      confidence: 0.92,
      ciroChain: ciroItems,
      risks,
      crossValidationVerdict: crossVerdict,
      crossValidationScore: crossScore
    };
  }
}
