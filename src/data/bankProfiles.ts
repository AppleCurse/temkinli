export interface BankProfile {
  id: string;
  name: string;
  code: string;
  magneticDensityRange: [number, number]; // [min, max]
  plateSignature: number[];
  uvFluorescencePattern: string;
  securityThreadPosition: [number, number];
  holographicShift: number;
  microPrintLocation: [number, number];
  category: 'Kamu' | 'Özel' | 'Katılım' | 'Yabancı';
  riskSensitivity: 'Yüksek' | 'Standart' | 'Hassas';
}

export const BANK_PROFILES: Record<string, BankProfile> = {
  ziraat: {
    id: "ziraat",
    name: "T.C. Ziraat Bankası",
    code: "0010",
    magneticDensityRange: [0.03, 0.12],
    plateSignature: [0.45, 0.32, 0.78, 0.21, 0.56, 0.43],
    uvFluorescencePattern: "365nm Yeşil/Mavi Lif (0xAA, 0xBB)",
    securityThreadPosition: [0.35, 0.50],
    holographicShift: 0.15,
    microPrintLocation: [0.15, 0.85],
    category: "Kamu",
    riskSensitivity: "Standart"
  },
  isbank: {
    id: "isbank",
    name: "Türkiye İş Bankası",
    code: "0064",
    magneticDensityRange: [0.02, 0.09],
    plateSignature: [0.52, 0.28, 0.81, 0.19, 0.63, 0.39],
    uvFluorescencePattern: "385nm Mavi/Turkuaz Lif (0x11, 0x22)",
    securityThreadPosition: [0.40, 0.45],
    holographicShift: 0.20,
    microPrintLocation: [0.20, 0.80],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  garanti: {
    id: "garanti",
    name: "Garanti BBVA",
    code: "0062",
    magneticDensityRange: [0.04, 0.15],
    plateSignature: [0.38, 0.41, 0.72, 0.25, 0.48, 0.51],
    uvFluorescencePattern: "365nm Yeşil Kılcal Lif (0x44, 0x55)",
    securityThreadPosition: [0.30, 0.55],
    holographicShift: 0.25,
    microPrintLocation: [0.25, 0.75],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  yapikredi: {
    id: "yapikredi",
    name: "Yapı Kredi Bankası",
    code: "0067",
    magneticDensityRange: [0.025, 0.11],
    plateSignature: [0.48, 0.35, 0.69, 0.23, 0.52, 0.47],
    uvFluorescencePattern: "385nm Çift Renkli Lif (0x77, 0x88)",
    securityThreadPosition: [0.45, 0.40],
    holographicShift: 0.18,
    microPrintLocation: [0.18, 0.82],
    category: "Özel",
    riskSensitivity: "Standart"
  },
  akbank: {
    id: "akbank",
    name: "Akbank T.A.Ş.",
    code: "0046",
    magneticDensityRange: [0.025, 0.10],
    plateSignature: [0.42, 0.38, 0.75, 0.22, 0.55, 0.44],
    uvFluorescencePattern: "365nm Kırmızı/Sarı Parıltı (0x88, 0x99)",
    securityThreadPosition: [0.38, 0.48],
    holographicShift: 0.22,
    microPrintLocation: [0.22, 0.78],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  vakifbank: {
    id: "vakifbank",
    name: "VakıfBank",
    code: "0015",
    magneticDensityRange: [0.035, 0.13],
    plateSignature: [0.44, 0.36, 0.73, 0.24, 0.58, 0.42],
    uvFluorescencePattern: "365nm Sarı/Yeşil Çift Bant (0xBB, 0xCC)",
    securityThreadPosition: [0.33, 0.52],
    holographicShift: 0.16,
    microPrintLocation: [0.16, 0.84],
    category: "Kamu",
    riskSensitivity: "Standart"
  },
  halkbank: {
    id: "halkbank",
    name: "Türkiye Halk Bankası",
    code: "0012",
    magneticDensityRange: [0.028, 0.11],
    plateSignature: [0.46, 0.33, 0.76, 0.20, 0.54, 0.45],
    uvFluorescencePattern: "385nm Mavi/Gri Lifler (0xCC, 0xDD)",
    securityThreadPosition: [0.37, 0.47],
    holographicShift: 0.19,
    microPrintLocation: [0.19, 0.81],
    category: "Kamu",
    riskSensitivity: "Standart"
  },
  denizbank: {
    id: "denizbank",
    name: "DenizBank A.Ş.",
    code: "0134",
    magneticDensityRange: [0.03, 0.14],
    plateSignature: [0.41, 0.39, 0.74, 0.26, 0.51, 0.46],
    uvFluorescencePattern: "365nm Mavi/Kırmızı Mikro-Nokta (0xDD, 0xEE)",
    securityThreadPosition: [0.32, 0.53],
    holographicShift: 0.23,
    microPrintLocation: [0.23, 0.77],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  qnb: {
    id: "qnb",
    name: "QNB Finansbank",
    code: "0111",
    magneticDensityRange: [0.022, 0.09],
    plateSignature: [0.50, 0.30, 0.79, 0.18, 0.60, 0.41],
    uvFluorescencePattern: "385nm Turkuaz Matris (0xEE, 0xFF)",
    securityThreadPosition: [0.42, 0.42],
    holographicShift: 0.21,
    microPrintLocation: [0.21, 0.79],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  teb: {
    id: "teb",
    name: "Türk Ekonomi Bankası (TEB)",
    code: "0032",
    magneticDensityRange: [0.026, 0.10],
    plateSignature: [0.43, 0.37, 0.71, 0.24, 0.53, 0.45],
    uvFluorescencePattern: "365nm Yeşil Karekod Matris",
    securityThreadPosition: [0.36, 0.49],
    holographicShift: 0.17,
    microPrintLocation: [0.17, 0.83],
    category: "Özel",
    riskSensitivity: "Standart"
  },
  kuveytturk: {
    id: "kuveytturk",
    name: "Kuveyt Türk Katılım Bankası",
    code: "0205",
    magneticDensityRange: [0.024, 0.10],
    plateSignature: [0.47, 0.34, 0.77, 0.21, 0.57, 0.40],
    uvFluorescencePattern: "385nm Altın/Yeşil Lif",
    securityThreadPosition: [0.39, 0.46],
    holographicShift: 0.24,
    microPrintLocation: [0.24, 0.76],
    category: "Katılım",
    riskSensitivity: "Hassas"
  },
  turkiyefinans: {
    id: "turkiyefinans",
    name: "Türkiye Finans Katılım Bankası",
    code: "0206",
    magneticDensityRange: [0.028, 0.12],
    plateSignature: [0.44, 0.38, 0.73, 0.22, 0.55, 0.43],
    uvFluorescencePattern: "365nm Turuncu Parıltı",
    securityThreadPosition: [0.34, 0.51],
    holographicShift: 0.18,
    microPrintLocation: [0.18, 0.82],
    category: "Katılım",
    riskSensitivity: "Standart"
  },
  albaraka: {
    id: "albaraka",
    name: "Albaraka Türk Katılım Bankası",
    code: "0203",
    magneticDensityRange: [0.025, 0.11],
    plateSignature: [0.49, 0.31, 0.79, 0.19, 0.61, 0.38],
    uvFluorescencePattern: "385nm Kırmızı/Yeşil Mikro-Lif",
    securityThreadPosition: [0.41, 0.44],
    holographicShift: 0.22,
    microPrintLocation: [0.22, 0.78],
    category: "Katılım",
    riskSensitivity: "Standart"
  },
  sekerbank: {
    id: "sekerbank",
    name: "Şekerbank T.A.Ş.",
    code: "0059",
    magneticDensityRange: [0.030, 0.13],
    plateSignature: [0.40, 0.42, 0.70, 0.27, 0.49, 0.50],
    uvFluorescencePattern: "365nm Sarı Şerit",
    securityThreadPosition: [0.29, 0.56],
    holographicShift: 0.26,
    microPrintLocation: [0.26, 0.74],
    category: "Özel",
    riskSensitivity: "Standart"
  },
  ing: {
    id: "ing",
    name: "ING Bank A.Ş.",
    code: "0099",
    magneticDensityRange: [0.021, 0.09],
    plateSignature: [0.51, 0.29, 0.80, 0.18, 0.62, 0.40],
    uvFluorescencePattern: "385nm Turuncu Floresan Matris",
    securityThreadPosition: [0.43, 0.41],
    holographicShift: 0.20,
    microPrintLocation: [0.20, 0.80],
    category: "Yabancı",
    riskSensitivity: "Hassas"
  },
  fibabanka: {
    id: "fibabanka",
    name: "Fibabanka A.Ş.",
    code: "0103",
    magneticDensityRange: [0.027, 0.11],
    plateSignature: [0.45, 0.35, 0.74, 0.23, 0.54, 0.44],
    uvFluorescencePattern: "365nm Mavi Kılcal",
    securityThreadPosition: [0.37, 0.48],
    holographicShift: 0.19,
    microPrintLocation: [0.19, 0.81],
    category: "Özel",
    riskSensitivity: "Standart"
  },
  odeabank: {
    id: "odeabank",
    name: "Odea Bank A.Ş.",
    code: "0146",
    magneticDensityRange: [0.023, 0.10],
    plateSignature: [0.46, 0.36, 0.75, 0.21, 0.56, 0.42],
    uvFluorescencePattern: "385nm Mor Parıltı",
    securityThreadPosition: [0.38, 0.47],
    holographicShift: 0.21,
    microPrintLocation: [0.21, 0.79],
    category: "Yabancı",
    riskSensitivity: "Hassas"
  },
  anadolubank: {
    id: "anadolubank",
    name: "Anadolubank A.Ş.",
    code: "0135",
    magneticDensityRange: [0.029, 0.12],
    plateSignature: [0.43, 0.39, 0.72, 0.25, 0.52, 0.46],
    uvFluorescencePattern: "365nm Mavi/Sarı Lif",
    securityThreadPosition: [0.35, 0.50],
    holographicShift: 0.17,
    microPrintLocation: [0.17, 0.83],
    category: "Özel",
    riskSensitivity: "Standart"
  },
  alternatifbank: {
    id: "alternatifbank",
    name: "Alternatifbank A.Ş.",
    code: "0124",
    magneticDensityRange: [0.026, 0.11],
    plateSignature: [0.47, 0.33, 0.76, 0.20, 0.58, 0.41],
    uvFluorescencePattern: "385nm Yeşil Lif Matrisi",
    securityThreadPosition: [0.40, 0.45],
    holographicShift: 0.23,
    microPrintLocation: [0.23, 0.77],
    category: "Yabancı",
    riskSensitivity: "Standart"
  },
  aktifbank: {
    id: "aktifbank",
    name: "Aktif Yatırım Bankası",
    code: "0143",
    magneticDensityRange: [0.032, 0.14],
    plateSignature: [0.39, 0.43, 0.69, 0.28, 0.47, 0.52],
    uvFluorescencePattern: "365nm Güvenlik Filigranı",
    securityThreadPosition: [0.28, 0.57],
    holographicShift: 0.27,
    microPrintLocation: [0.27, 0.73],
    category: "Özel",
    riskSensitivity: "Hassas"
  },
  burganbank: {
    id: "burganbank",
    name: "Burgan Bank A.Ş.",
    code: "0125",
    magneticDensityRange: [0.024, 0.10],
    plateSignature: [0.48, 0.32, 0.78, 0.20, 0.60, 0.39],
    uvFluorescencePattern: "385nm Mavi/Turuncu Lif",
    securityThreadPosition: [0.42, 0.43],
    holographicShift: 0.22,
    microPrintLocation: [0.22, 0.78],
    category: "Yabancı",
    riskSensitivity: "Standart"
  },
  emlakkatilim: {
    id: "emlakkatilim",
    name: "Türkiye Emlak Katılım Bankası",
    code: "0209",
    magneticDensityRange: [0.031, 0.13],
    plateSignature: [0.45, 0.35, 0.74, 0.22, 0.56, 0.44],
    uvFluorescencePattern: "365nm Sarı/Turkuaz Lif",
    securityThreadPosition: [0.36, 0.49],
    holographicShift: 0.18,
    microPrintLocation: [0.18, 0.82],
    category: "Katılım",
    riskSensitivity: "Standart"
  },
  vakifkatilim: {
    id: "vakifkatilim",
    name: "Vakıf Katılım Bankası",
    code: "0210",
    magneticDensityRange: [0.030, 0.12],
    plateSignature: [0.46, 0.34, 0.75, 0.21, 0.55, 0.43],
    uvFluorescencePattern: "385nm Sarı Lif Matrisi",
    securityThreadPosition: [0.37, 0.48],
    holographicShift: 0.19,
    microPrintLocation: [0.19, 0.81],
    category: "Katılım",
    riskSensitivity: "Standart"
  },
  ziraatkatilim: {
    id: "ziraatkatilim",
    name: "Ziraat Katılım Bankası",
    code: "0208",
    magneticDensityRange: [0.033, 0.13],
    plateSignature: [0.44, 0.37, 0.73, 0.23, 0.54, 0.45],
    uvFluorescencePattern: "365nm Yeşil Lif Deseni",
    securityThreadPosition: [0.34, 0.51],
    holographicShift: 0.16,
    microPrintLocation: [0.16, 0.84],
    category: "Katılım",
    riskSensitivity: "Standart"
  }
};
