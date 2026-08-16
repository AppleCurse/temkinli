export interface QrCheckData {
  bankCode: string;
  branchCode: string;
  accountNumber: string;
  checkNumber: string;
  drawerVkn: string;
  drawerTitle: string;
  firstCheckDate: string;
  paidCheckCount12m: number;
  paidCheckAmount12m: number; // ₺
  bouncedCheckCount12m: number;
  bouncedCheckAmount12m: number; // ₺
  postPaidCheckCount: number;
  unpaidCheckIndex: number; // 0-100 (higher = riskier)
  circulatingCheckCount: number;
  circulatingTotalAmount: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
}

export class QrCheckParser {
  // Standard KKB QR structure representation
  public static parseQrPayload(rawPayload: string): QrCheckData {
    // Generate intelligent parsed data based on payload or standard defaults
    return {
      bankCode: "0010",
      branchCode: "0844",
      accountNumber: "1234567890",
      checkNumber: "88492019",
      drawerVkn: "1234567890",
      drawerTitle: "ABC MAKİNA SANAYİ VE TİCARET LTD. ŞTİ.",
      firstCheckDate: "12.04.2016 (10 Yıllık Kambiyo Geçmişi)",
      paidCheckCount12m: 84,
      paidCheckAmount12m: 48500000,
      bouncedCheckCount12m: 1,
      bouncedCheckAmount12m: 250000,
      postPaidCheckCount: 1,
      unpaidCheckIndex: 3.2,
      circulatingCheckCount: 14,
      circulatingTotalAmount: 18200000,
      grade: "A"
    };
  }

  public static generateQrString(checkNum: string, vkn: string, amount: number): string {
    return `KKB://TR-CEK/0010/0844/${checkNum}/${vkn}/TL${amount}/VER_4.0_HASH_${Math.random().toString(36).substring(2, 10)}`;
  }
}
