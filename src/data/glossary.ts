export interface GlossaryTerm {
  term: string;
  title: string;
  definition: string;
  category: 'Kambiyo' | 'Hukuk' | 'İstihbarat' | 'Risk';
  tip?: string;
}

export const TRADE_GLOSSARY: Record<string, GlossaryTerm> = {
  ciro_silsilesi: {
    term: "Ciro Silsilesi",
    title: "Ciro Silsilesi (Zinciri)",
    definition: "Çekin keşideciden başlayarak son alacaklıya (hamile) kadar devredilmesini sağlayan kesintisiz imza ve ciro dizisi.",
    category: "Kambiyo",
    tip: "Zincirdeki herhangi bir halkanın usulsüzlüğü veya riskli olması, sonraki tüm hamillerin tahsilatını tehlikeye sokar."
  },
  kesideci: {
    term: "Keşideci Sicili",
    title: "Keşideci & İtibar Sicili",
    definition: "Çeki düzenleyen, imzalayan ve bankadaki hesabından ödenmesini taahhüt eden asıl borçlu şirketin geçmiş ödeme performansı ve sicili.",
    category: "İstihbarat",
    tip: "Keşidecinin karşılıksız çek geçmişi, sermaye yapısı ve MERSİS kayıtları birincil risk kaynağıdır."
  },
  bilgi_guveni: {
    term: "Bilgi Güveni",
    title: "Bilgi Güveni Skoru (0–100)",
    definition: "Çek analizi için taranan resmi veri tabanlarının (Ticaret Sicili, MERSİS, Çek Görüntüleme OCR, Mahkeme Kayıtları) doluluk, netlik ve teyit oranıdır.",
    category: "İstihbarat",
    tip: "Ön ve arka yüz belgeleri net yüklendiğinde bilgi güveni %90'ın üzerine çıkar."
  },
  temkin_puani: {
    term: "Temkin Puanı",
    title: "Temkin Karar Puanı",
    definition: "Keşideci güvenilirliği, ciro halkalarının direnci, vade uyumu, tahrifat ihtimali ve sektör dinamiklerini harmanlayan 0–100 arası nihai karar notu.",
    category: "Risk",
    tip: "75+ İLERLE, 45-74 TEMKİNLİ İLERLE, 0-44 DUR kararı üretir."
  },
  tahsilat_riski: {
    term: "Tahsilat Riski",
    title: "Tahsilat & Karşılıksız Kalma Riski",
    definition: "Çekin vade gününde banka hesabında yeterli karşılık bulunamama veya ödemenin protesto olma olasılığıdır.",
    category: "Risk",
    tip: "Vade uzadıkça ve ciro sayısı arttıkça tahsilat riski geometrik artar."
  },
  belge_riski: {
    term: "Belge & Tahrifat Riski",
    title: "Belge & Optik Tahrifat Riski",
    definition: "Çek yaprağı üzerindeki rakam, yazı, keşide tarihi, banka filigranı ve manyetik kodlama alanlarında silinti, kazıntı veya montaj şüphesi tespit oranıdır.",
    category: "Kambiyo",
    tip: "Tahrifat tespit edilen çekler doğrudan hukuki geçersizlik ve adli risk doğurur."
  },
  karsi_taraf: {
    term: "Karşı Taraf Riski",
    title: "Cirodaki Karşı Taraf Riski",
    definition: "Çeki size ciro eden veya önceki halkalarda yer alan ticari paydaşların mali güvenilirliği ve borçluluk durumudur.",
    category: "Risk",
    tip: "İş yaptığınız firma sağlam olsa bile önceki cirolardaki riskli bir firma çeke tedbir koydurabilir."
  },
  konkordato: {
    term: "Konkordato Mühleti",
    title: "Konkordato Mühleti",
    definition: "Borçlarını ödemekte zorlanan şirketin iflastan korunmak amacıyla Asliye Ticaret Mahkemesi'nden aldığı ve icra takipleri ile çek ödemelerini donduran yasal koruma kararı.",
    category: "Hukuk",
    tip: "Konkordatodaki firmanın keşide ettiği çekler bankadan tahsil edilemez."
  },
  mersis: {
    term: "MERSİS Kaydı",
    title: "Merkezi Sicil Kayıt Sistemi",
    definition: "Ticaret Bakanlığı koordinasyonunda tüm şirketlerin sicil gazetesi, ortaklık payları, yetkili temsilcileri ve adres değişikliklerini içeren merkezi kayıt kütüğü.",
    category: "İstihbarat",
    tip: "Yakın zamanda ortak veya adres değiştirmiş 'paravan' yapılar MERSİS çapraz kontrolünde hemen ortaya çıkar."
  },
  acik_hesap: {
    term: "Açık Hesap",
    title: "Açık Hesap (Teminatsız Ticaret)",
    definition: "Malın teslim edilip ödemenin çek, senet veya teminat mektubu olmaksızın sadece faturaya dayalı vadeli beklenmesi usulüdür.",
    category: "Risk",
    tip: "En yüksek risk içeren ticaret modelidir; temkinlenmemiş firmaya açık hesap açılması önerilmez."
  },
  karsiliksiz_defter: {
    term: "Karşılıksız Çek Defteri",
    title: "TCMB & Risk Merkezi Karşılıksız Kütüğü",
    definition: "Türkiye'de bankalara ibraz edilip karşılığı bulunmayan çeklerin ve keşidecilerinin yasal olarak kaydedildiği resmi kara liste.",
    category: "Hukuk",
    tip: "Son 5 yıl içinde karşılıksız çeki olan keşidecilerin çekleri yüksek iskonto gerektirir."
  }
};
