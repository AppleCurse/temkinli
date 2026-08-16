export interface TwinCheckRecord {
  id: string;
  checkNumber: string;
  bankCode: string;
  drawerVkn: string;
  amount: number;
  scanTimestamp: number;
  scannedByLocation: string;
  plateSignatureHash: string;
  matchScore: number; // 0-100%
  twinStatus: 'ORIGINAL' | 'SUSPECT_TWIN' | 'CRITICAL_COLLISION';
  explanation: string;
}

export class TwinCheckDetector {
  // In-memory cross-merchant registry of scanned check fingerprints
  private static registry: TwinCheckRecord[] = [
    {
      id: "TWIN-REG-9812",
      checkNumber: "88492019",
      bankCode: "0010",
      drawerVkn: "1234567890",
      amount: 1250000,
      scanTimestamp: Date.now() - 1000 * 60 * 60 * 3.5, // 3.5 hours ago
      scannedByLocation: "İstanbul / İkitelli OSB Faktoring Şb.",
      plateSignatureHash: "a7f8e910bc4412",
      matchScore: 94,
      twinStatus: "CRITICAL_COLLISION",
      explanation: "Aynı manyetik mikr ve seri numarası 3.5 saat önce başka bir faktoring şubesinde işlem gördü!"
    },
    {
      id: "TWIN-REG-7741",
      checkNumber: "45129980",
      bankCode: "0064",
      drawerVkn: "9876543210",
      amount: 850000,
      scanTimestamp: Date.now() - 1000 * 60 * 60 * 18, // 18 hours ago
      scannedByLocation: "Bursa / Nilüfer Ticaret Merkezi",
      plateSignatureHash: "b2c3d4e5f67890",
      matchScore: 42,
      twinStatus: "ORIGINAL",
      explanation: "Klişe parmak izi özgün; piyasada aktif ikiz kopya kaydı yok."
    },
    {
      id: "TWIN-REG-6619",
      checkNumber: "77182903",
      bankCode: "0062",
      drawerVkn: "5432109876",
      amount: 3400000,
      scanTimestamp: Date.now() - 1000 * 60 * 60 * 48,
      scannedByLocation: "İzmir / Bornova Sanayi",
      plateSignatureHash: "c9876543210abc",
      matchScore: 88,
      twinStatus: "SUSPECT_TWIN",
      explanation: "Aynı keşidecinin benzer seri aralığı 48 saat içinde 3 farklı ilde sorgulandı."
    }
  ];

  public static checkCollision(
    checkNumber: string,
    bankCode: string,
    drawerVkn: string,
    amount: number
  ): {
    hasCollision: boolean;
    record: TwinCheckRecord;
    alertLevel: 'GREEN' | 'YELLOW' | 'RED';
  } {
    // Check if matching record exists
    const match = this.registry.find(
      (r) => r.checkNumber === checkNumber || (r.bankCode === bankCode && r.drawerVkn === drawerVkn && r.amount === amount)
    );

    if (match) {
      const alertLevel = match.twinStatus === 'CRITICAL_COLLISION' ? 'RED' : match.twinStatus === 'SUSPECT_TWIN' ? 'YELLOW' : 'GREEN';
      return {
        hasCollision: match.twinStatus !== 'ORIGINAL',
        record: match,
        alertLevel
      };
    }

    // Default clean record
    const cleanRecord: TwinCheckRecord = {
      id: `TWIN-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      checkNumber,
      bankCode,
      drawerVkn,
      amount,
      scanTimestamp: Date.now(),
      scannedByLocation: "Merkezi Çek Takas ve İstihbarat Ağı (Anlık)",
      plateSignatureHash: Math.random().toString(36).substring(2, 12),
      matchScore: 12,
      twinStatus: "ORIGINAL",
      explanation: "Merkezi veri havuzunda mükerrer ikiz çek kaydı bulunamadı. Klişe baskısı benzersiz."
    };

    return {
      hasCollision: false,
      record: cleanRecord,
      alertLevel: 'GREEN'
    };
  }

  public static registerScan(record: TwinCheckRecord) {
    this.registry.unshift(record);
  }

  public static getRecentTwins(): TwinCheckRecord[] {
    return [...this.registry];
  }
}
