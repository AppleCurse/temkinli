export interface BlockRecord {
  index: number;
  timestamp: number;
  bankName: string;
  fraudScore: number;
  magneticDensity: number;
  verdict: string;
  previousHash: string;
  hash: string;
  ipfsCid: string;
  txSignature: string;
}

// Pure JS SHA-256 implementation
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export class CryptoLedgerManager {
  private chain: BlockRecord[] = [];
  private pendingRecords: BlockRecord[] = [];

  constructor() {
    this.initGenesisBlock();
  }

  private async initGenesisBlock() {
    const rawData = "0_GENESIS_TEMKIN_ROOT_BLOCK_0000000000000000";
    const genesisHash = await sha256(rawData);
    const genesis: BlockRecord = {
      index: 0,
      timestamp: Date.now() - 86400000 * 3,
      bankName: "TCMB / GENESIS",
      fraudScore: 0,
      magneticDensity: 0.05,
      verdict: "ROOT",
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: genesisHash,
      ipfsCid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
      txSignature: "0xgenesis_root_signature_0001"
    };
    this.chain = [genesis];
  }

  public async addBlock(
    bankName: string,
    fraudScore: number,
    density: number,
    verdict: string
  ): Promise<BlockRecord> {
    const index = this.chain.length;
    const timestamp = Date.now();
    const previousHash = this.chain[this.chain.length - 1]?.hash || "0".repeat(64);

    const rawData = `${index}${timestamp}${bankName}${fraudScore.toFixed(2)}${density.toFixed(4)}${verdict}${previousHash}`;
    const hash = await sha256(rawData);

    // IPFS CID representation
    const ipfsCid = `Qm${hash.substring(0, 44)}`;
    const txSignature = `0x${hash.substring(0, 40)}`;

    const newBlock: BlockRecord = {
      index,
      timestamp,
      bankName,
      fraudScore,
      magneticDensity: density,
      verdict,
      previousHash,
      hash,
      ipfsCid,
      txSignature
    };

    this.chain.push(newBlock);
    this.pendingRecords.push(newBlock);
    return newBlock;
  }

  public async verifyIntegrity(): Promise<{ valid: boolean; errorIndex?: number }> {
    if (this.chain.length <= 1) return { valid: true };

    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.previousHash !== previous.hash) {
        return { valid: false, errorIndex: i };
      }

      const rawData = `${current.index}${current.timestamp}${current.bankName}${current.fraudScore.toFixed(2)}${current.magneticDensity.toFixed(4)}${current.verdict}${current.previousHash}`;
      const calculatedHash = await sha256(rawData);

      if (calculatedHash !== current.hash) {
        return { valid: false, errorIndex: i };
      }
    }

    return { valid: true };
  }

  public getChain(): BlockRecord[] {
    return [...this.chain];
  }

  public getLatestHash(): string {
    return this.chain[this.chain.length - 1]?.hash || "0";
  }

  public exportJson(): string {
    return JSON.stringify(this.chain, null, 2);
  }

  public importJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr) as BlockRecord[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.chain = parsed;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
