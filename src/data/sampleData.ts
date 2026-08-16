import { SampleCheckPreset, DefterEntry } from '../types';

export const SAMPLE_PRESETS: SampleCheckPreset[] = [
  {
    title: "Ciro Zincirinde Kırılma Riski",
    subtitle: "3. ciroda karşılıksız çek geçmişi olan firma tespit edildi.",
    badge: "TEMKİNLİ İLERLE",
    firmName: "ABC Makina San. ve Tic. Ltd. Şti.",
    amount: 1250000,
    termDays: 120,
    security: "Çek",
    frontImageName: "abc_makina_cek_on.jpg",
    backImageName: "abc_makina_cek_arka.jpg",
    result: {
      id: "CHK-2026-881",
      firmName: "ABC Makina San. ve Tic. Ltd. Şti.",
      taxNumber: "1234567890",
      amount: 1250000,
      currency: "TL",
      dueDate: "15.12.2026",
      daysRemaining: 125,
      issueCity: "İstanbul (Kocaeli OSB Şubesi)",
      bankName: "Garanti BBVA - Gebze Ticari",
      checkNumber: "TR88492019",
      score: 68,
      verdict: "TEMKİNLİ_İLERLE",
      verdictSummary: "3. ciro halkasında geçmişte icra takibi olan firma mevcut.",
      verdictDetail: "Keşideci ABC Makina finansal olarak dengeli. Ancak ciro silsilesindeki 3. imza sahibi XYZ Lojistik A.Ş. son 12 ayda 2 karşılıksız çek kaydına sahip. Çek ciro edilmeden önce ek teminat veya keşideciden doğrudan doğrulama alınması önerilir.",
      confidenceScore: 88,
      tahsilatRiski: 31,
      belgeRiski: 12,
      karsiTarafRiski: 44,
      ciroChain: [
        { id: 1, from: "ABC Makina San. Ltd.", to: "Demir Çelik San. A.Ş.", status: "temiz", note: "Keşideci — Temiz geçmiş", taxNumber: "1234567890" },
        { id: 2, from: "Demir Çelik San. A.Ş.", to: "Karadeniz Metal Lojistik", status: "normal", note: "Ciro 1 — Temiz", taxNumber: "9876543210" },
        { id: 3, from: "Karadeniz Metal Lojistik", to: "XYZ Lojistik Dış Ticaret", status: "riskli", note: "⚠ Karşılıksız geçmişi (2025/Q4)", taxNumber: "4561237890" },
        { id: 4, from: "XYZ Lojistik Dış Ticaret", to: "Sizin Firmanız", status: "normal", note: "Son Halka", taxNumber: "7890123456" }
      ],
      keyRisks: [
        "Ciro zincirinin 3. halkasındaki firmaya ait açılmış 2 dava var.",
        "120 günlük vade sektörel ortalamanın (90 gün) üzerinde.",
        "Ciro imzaları arasındaki tarih aralıklarında 18 günlük boşluk mevcut."
      ],
      recommendations: [
        "Çeki almadan önce keşideci ABC Makina'dan faturaya dayalı teyit yazısı isteyin.",
        "Mümkünse vadeli süreyi 90 güne çekin veya %20 peşinat talep edin.",
        "Temkin Finansman modülü üzerinden katılım/faktoring tekliflerini değerlendirin."
      ],
      analyzedAt: "Bugün, 14:32"
    }
  },
  {
    title: "Yüksek Temkin Puanlı Güvenli İşlem",
    subtitle: "Keşideci ve tüm ciro zinciri yüksek kredi notuna sahip.",
    badge: "İLERLE",
    firmName: "Özçelik İnşaat ve Yapı Elemanları A.Ş.",
    amount: 3400000,
    termDays: 60,
    security: "Peşin + Çek",
    frontImageName: "ozcelik_yapi_cek_on.jpg",
    backImageName: "ozcelik_yapi_cek_arka.jpg",
    result: {
      id: "CHK-2026-904",
      firmName: "Özçelik İnşaat ve Yapı Elemanları A.Ş.",
      taxNumber: "9820194821",
      amount: 3400000,
      currency: "TL",
      dueDate: "10.10.2026",
      daysRemaining: 59,
      issueCity: "Ankara (Ostim Kurumsal)",
      bankName: "İş Bankası - Ostim Sanayi",
      checkNumber: "TR10928374",
      score: 92,
      verdict: "ILERLE",
      verdictSummary: "Sıfır karşılıksız geçmişi, güçlü MERSİS yapısı ve kısa vade.",
      verdictDetail: "Keşideci Özçelik Yapı 18 yıllık ticari geçmişe sahip olup ödeme performansı mükemmeldir. Ciro silsilesinde yer alan tüm 2 ciro sahibi kurumların karşılıksız geçmişi ve icra kaydı bulunmamaktadır. İşlem yapılması önerilir.",
      confidenceScore: 96,
      tahsilatRiski: 8,
      belgeRiski: 5,
      karsiTarafRiski: 11,
      ciroChain: [
        { id: 1, from: "Özçelik İnşaat A.Ş.", to: "Anadolu Çimento A.Ş.", status: "temiz", note: "Keşideci — 18 Yıllık MERSİS Kaydı", taxNumber: "9820194821" },
        { id: 2, from: "Anadolu Çimento A.Ş.", to: "Sizin Firmanız", status: "temiz", note: "Ciro 1 — Yüksek Kredi Notu", taxNumber: "5512049281" }
      ],
      keyRisks: [
        "Tutar yüksek (3.4M TL), ancak firmanın özkaynak/ciro oranı bu tutarı rahatlıkla karşılıyor."
      ],
      recommendations: [
        "İşlem güvenle sürdürülebilir.",
        "Arzu edilirse Temkin Finansman kanalıyla %0.85 avantajlı oranla anında kırdırılabilir."
      ],
      analyzedAt: "Bugün, 11:15"
    }
  },
  {
    title: "Yüksek Riskli / Tahrifat ve Karşılıksız Uyarısı",
    subtitle: "Konkordato süreci ve belge tahrifat şüphesi.",
    badge: "DUR",
    firmName: "Körfez Tekstil Lojistik San. Tic. Ltd.",
    amount: 5800000,
    termDays: 180,
    security: "Teminatsız",
    frontImageName: "korfez_tekstil_on.jpg",
    backImageName: "korfez_tekstil_arka.jpg",
    result: {
      id: "CHK-2026-112",
      firmName: "Körfez Tekstil Lojistik San. Tic. Ltd.",
      taxNumber: "3829104812",
      amount: 5800000,
      currency: "TL",
      dueDate: "20.02.2027",
      daysRemaining: 192,
      issueCity: "Bursa (Nilüfer OSB)",
      bankName: "Halkbank - Nilüfer",
      checkNumber: "TR44910283",
      score: 24,
      verdict: "DUR",
      verdictSummary: "Keşideci hakkında devam eden konkordato mühleti ve belgede tutar tahrifat şüphesi.",
      verdictDetail: "DİKKAT: Körfez Tekstil hakkında Bursa 1. Asliye Ticaret Mahkemesi'nde devam eden geçici konkordato mühleti kararı mevcuttur. Ayrıca çek yaprağındaki rakam ve yazı alanlarında optik uyumsuzluk (tahrifat şüphesi) algılanmıştır. Mal teslimatı yapılması ÇOK YÜKSEK RİSKLİDİR.",
      confidenceScore: 94,
      tahsilatRiski: 88,
      belgeRiski: 76,
      karsiTarafRiski: 82,
      ciroChain: [
        { id: 1, from: "Körfez Tekstil Ltd.", to: "Karakaya İplik Dış Tic.", status: "riskli", note: "⚠ Konkordato Mühleti Kararı (Bursa 1. ATM)", taxNumber: "3829104812" },
        { id: 2, from: "Karakaya İplik Dış Tic.", to: "Ege Dokuma A.Ş.", status: "riskli", note: "⚠ Karşılıksız Çek İcra Takibi", taxNumber: "1092837461" },
        { id: 3, from: "Ege Dokuma A.Ş.", to: "Sizin Firmanız", status: "normal", note: "Son Halka", taxNumber: "8829102938" }
      ],
      keyRisks: [
        "Keşideci şirket konkordato koruması altındadır, çek tahsili kanunen durdurulabilir.",
        "Yazı ile yazılan rakam kısmında silinti/düzeltme izi saptandı.",
        "180 günlük aşırı uzun vade, karşılıksız kalma riskini katlamaktadır."
      ],
      recommendations: [
        "Bu çeki ödeme aracı olarak kabul etmeyin.",
        "Teslimatı durdurun veya nakit / banka teminat mektubu şartı koşun.",
        "Hukuk müşavirinizle görüşerek işlem kaydını resmiyete dökün."
      ],
      analyzedAt: "Bugün, 09:40"
    }
  }
];

export const INITIAL_DEFTER_ENTRIES: DefterEntry[] = [
  {
    id: "DEF-2026-08",
    date: "12.08.2026",
    firmName: "ABC Makina San. ve Tic. Ltd. Şti.",
    taxNumber: "1234567890",
    checkNumber: "TR88492019",
    amount: 1250000,
    termDays: 120,
    score: 68,
    previousScore: 42,
    verdict: "TEMKİNLİ_İLERLE",
    summary: "3. ciro halkasında riskli firma. Ek teminat ile işlem onaylandı.",
    category: "Cek"
  },
  {
    id: "DEF-2026-07",
    date: "04.08.2026",
    firmName: "Özçelik İnşaat ve Yapı Elemanları A.Ş.",
    taxNumber: "9820194821",
    checkNumber: "TR10928374",
    amount: 3400000,
    termDays: 60,
    score: 92,
    previousScore: 90,
    verdict: "ILERLE",
    summary: "Temiz ciro zinciri, MERSİS doğrulaması tam.",
    category: "Cek"
  },
  {
    id: "DEF-2026-06",
    date: "28.07.2026",
    firmName: "Körfez Tekstil Lojistik San. Tic. Ltd.",
    taxNumber: "3829104812",
    checkNumber: "TR44910283",
    amount: 5800000,
    termDays: 180,
    score: 24,
    previousScore: 30,
    verdict: "DUR",
    summary: "Konkordato mühleti tespiti ve belge tahrifat uyarısı nedeniyle mal teslimi durduruldu.",
    category: "Firma"
  },
  {
    id: "DEF-2026-05",
    date: "15.07.2026",
    firmName: "Aydınlar Ambalaj ve Matbaacılık",
    taxNumber: "5510293841",
    checkNumber: "TR30918273",
    amount: 850000,
    termDays: 90,
    score: 81,
    previousScore: 78,
    verdict: "ILERLE",
    summary: "İstikrarlı ödeme performansı, 3. çek temkinlendi.",
    category: "Cek"
  },
  {
    id: "DEF-2026-04",
    date: "02.06.2026",
    firmName: "Doğan Otomotiv Dış Ticaret A.Ş.",
    taxNumber: "7728193840",
    checkNumber: "TR99201928",
    amount: 2100000,
    termDays: 45,
    score: 88,
    previousScore: 85,
    verdict: "ILERLE",
    summary: "Kısa vade ve doğrudan keşideci ödemesi.",
    category: "Islem"
  }
];

export const TEMKIN_BEY_SPEECHES = {
  idle: "Merhaba. Ben Temkin Bey. Çeki temkinlemeden alırsan ya ödenmezse? Önce ön ve arka yüzü yükle veya hazır örneklerden seç, hikayesini çıkaralım.",
  frontDone: "Güzel. Ön yüz tamam. Şimdi arka yüzü de ekle — ciro zinciri orada. Asıl risk cironun kuyruğunda saklıdır.",
  backDone: "Güzel. Arka yüz alındı. Şimdi ön yüzü de yükle ki tutar ile keşideci imzasını eşleştireyim.",
  oneDone: "Güzel. Bir yüz tamamlandı. Diğer yüzü de yükle, saniyeler içinde bütün defterleri tarayayım.",
  analyzing: "Temkinliyorum... Keşideci MERSİS kaydı, ciro silsilesi, karşılıksız çek defteri ve mahkeme kararlarına bakıyorum... 3 saniye.",
  resultILERLE: "Bak. Bu çek pırıl pırıl. Keşidecisi de sağlam, ciro zinciri de. Karar: İLERLE. Çekle yürüyen ekonomiden çekinme, temkinle.",
  resultTEMKİNLİ_İLERLE: "Bak. Keşideci iyi ama ciro zincirinin 3. halkasında pürüz var. Karar: TEMKİNLİ İLERLE. Temkinlemeden mal verme, ek teminat iste.",
  resultDUR: "Dur! Bu çekte konkordato ve tahrifat şüphesi var. Sakın malı teslim etme! Karar: DUR. En pahalı karar, emin olmadan atılan imzadır."
};
