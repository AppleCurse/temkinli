export type VerdictType = 'ILERLE' | 'TEMKİNLİ_İLERLE' | 'DUR';

export interface CiroLink {
  id: number;
  from: string;
  to: string;
  status: 'temiz' | 'normal' | 'riskli';
  note?: string;
  taxNumber?: string;
}

export interface CheckAnalysisResult {
  id: string;
  firmName: string;
  taxNumber: string;
  amount: number; // e.g. 1250000
  currency: string; // 'TL'
  dueDate: string; // '15.12.2026'
  daysRemaining: number;
  issueCity: string;
  bankName: string;
  checkNumber: string;
  score: number; // 0-100
  verdict: VerdictType;
  verdictSummary: string;
  verdictDetail: string;
  confidenceScore: number; // e.g. 88
  tahsilatRiski: number; // 0-100 (lower is better or score out of 100)
  belgeRiski: number;
  karsiTarafRiski: number;
  ciroChain: CiroLink[];
  keyRisks: string[];
  recommendations: string[];
  analyzedAt: string;
}

export interface DefterEntry {
  id: string;
  date: string;
  firmName: string;
  taxNumber?: string;
  checkNumber?: string;
  amount: number;
  termDays: number;
  score: number;
  previousScore?: number;
  verdict: VerdictType;
  summary: string;
  category: 'Cek' | 'Firma' | 'Islem';
}

export interface SampleCheckPreset {
  title: string;
  subtitle: string;
  badge: string;
  firmName: string;
  amount: number;
  termDays: number;
  security: string;
  frontImageName: string;
  backImageName: string;
  result: CheckAnalysisResult;
}
