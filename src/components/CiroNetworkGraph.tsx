import React, { useState } from 'react';
import { Network, ShieldAlert, CheckCircle2, AlertTriangle, Building2, UserCheck, ArrowRight, Info } from 'lucide-react';

export interface NetworkNode {
  id: string;
  label: string;
  role: 'Keşideci' | '1. Ciro' | '2. Ciro' | '3. Ciro (Şüpheli)' | 'Son Hamil (Siz)';
  status: 'SAFE' | 'WARNING' | 'DANGER';
  vkn: string;
  city: string;
  taxStatus: string;
  concordatStatus: string;
  executionFileCount: number;
  capital: string;
  score: number;
}

export const CiroNetworkGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-3');

  const nodes: NetworkNode[] = [
    {
      id: 'node-0',
      label: 'ABC Makina San. Ltd. Şti.',
      role: 'Keşideci',
      status: 'SAFE',
      vkn: '1234567890',
      city: 'İstanbul / Tuzla',
      taxStatus: 'Faal / Borcu Yok',
      concordatStatus: 'Temiz (Konkordato Yok)',
      executionFileCount: 0,
      capital: '₺ 25.000.000',
      score: 92
    },
    {
      id: 'node-1',
      label: 'Demir Çelik Dış Ticaret A.Ş.',
      role: '1. Ciro',
      status: 'SAFE',
      vkn: '9876543210',
      city: 'Kocaeli / Gebze',
      taxStatus: 'Faal / Düzenli Mükellef',
      concordatStatus: 'Temiz',
      executionFileCount: 1,
      capital: '₺ 50.000.000',
      score: 88
    },
    {
      id: 'node-2',
      label: 'Karadeniz Metal Lojistik',
      role: '2. Ciro',
      status: 'SAFE',
      vkn: '4455667788',
      city: 'Samsun / Tekkeköy',
      taxStatus: 'Faal',
      concordatStatus: 'Temiz',
      executionFileCount: 0,
      capital: '₺ 10.000.000',
      score: 84
    },
    {
      id: 'node-3',
      label: 'XYZ Lojistik Dış Tic. Ltd.',
      role: '3. Ciro (Şüpheli)',
      status: 'DANGER',
      vkn: '3322119988',
      city: 'Mersin / Akdeniz',
      taxStatus: 'Gayrifaal Şüphesi / Resen Terkin İncelemesinde',
      concordatStatus: '🚨 Geçici Konkordato Mühleti (3 Ay)',
      executionFileCount: 8,
      capital: '₺ 500.000',
      score: 28
    },
    {
      id: 'node-4',
      label: 'Sizin Firmanız Tic. A.Ş.',
      role: 'Son Hamil (Siz)',
      status: 'SAFE',
      vkn: '1122334455',
      city: 'İstanbul / Merkez',
      taxStatus: 'Faal',
      concordatStatus: 'Temiz',
      executionFileCount: 0,
      capital: '₺ 30.000.000',
      score: 95
    }
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  return (
    <div className="p-5 rounded-[22px] bg-white border border-[#EAE5DD] space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-3">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-[#0E1E33]" />
          <span className="text-[13px] font-mono font-bold text-[#0E1E33] uppercase">
            CİRO HALKASI ÇAPRAZ BORÇ & KONKORDATO AĞI
          </span>
        </div>
        <span className="text-[10px] font-mono bg-[#a23b35]/10 text-[#a23b35] px-2.5 py-0.5 rounded-full font-bold">
          1 RİSKLİ HALKA SAPTANDI
        </span>
      </div>

      {/* Interactive Node Chain Flow */}
      <div className="bg-[#FCFBF7] p-4 rounded-[16px] border border-[#EAE5DD] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[620px] gap-2">
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setSelectedNodeId(node.id)}
                className={`flex flex-col items-center p-2.5 rounded-[14px] border text-center transition-all cursor-pointer ${
                  selectedNodeId === node.id
                    ? 'ring-2 ring-[#0E1E33] shadow-md scale-105'
                    : 'hover:border-[#0E1E33]/40'
                } ${
                  node.status === 'DANGER'
                    ? 'bg-[#a23b35]/10 border-[#a23b35]/40 text-[#a23b35]'
                    : 'bg-white border-[#EAE5DD] text-[#0E1E33]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1.5 ${
                    node.status === 'DANGER'
                      ? 'bg-[#a23b35] text-white'
                      : 'bg-[#0E1E33] text-white'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-tight block max-w-[95px] truncate">
                  {node.role}
                </span>
                <span className="text-[9px] text-[#6B7A90] font-mono block max-w-[95px] truncate">
                  {node.label.split(' ')[0]}
                </span>
              </button>

              {idx < nodes.length - 1 && (
                <div className="flex items-center text-[#6B7A90]">
                  <ArrowRight size={14} className={idx === 2 ? 'text-[#a23b35] animate-pulse' : ''} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Selected Node Detailed Intel Card */}
      <div className={`p-4 rounded-[16px] border text-[12px] font-mono space-y-3 transition-colors ${
        selectedNode.status === 'DANGER'
          ? 'bg-[#a23b35]/5 border-[#a23b35]/30'
          : 'bg-[#F5F1E9] border-[#EAE5DD]'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-[#6B7A90] uppercase block">
              HALKA #{nodes.findIndex((n) => n.id === selectedNode.id) + 1} — {selectedNode.role}
            </span>
            <h4 className="serif text-[16px] text-[#0E1E33] font-bold m-0">
              {selectedNode.label}
            </h4>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            selectedNode.status === 'DANGER'
              ? 'bg-[#a23b35] text-white'
              : 'bg-[#1f8a5b] text-white'
          }`}>
            İstihbarat Skoru: {selectedNode.score}/100
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
          <div>
            <span className="text-[#6B7A90] block">VKN / Şehir:</span>
            <span className="font-semibold text-[#0E1E33]">{selectedNode.vkn} / {selectedNode.city}</span>
          </div>
          <div>
            <span className="text-[#6B7A90] block">Sermaye:</span>
            <span className="font-semibold text-[#0E1E33]">{selectedNode.capital}</span>
          </div>
          <div>
            <span className="text-[#6B7A90] block">Aktif İcra Dosyası:</span>
            <span className={`font-semibold ${selectedNode.executionFileCount > 0 ? 'text-[#a23b35]' : 'text-[#1f8a5b]'}`}>
              {selectedNode.executionFileCount} Adet
            </span>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <span className="text-[#6B7A90] block">Konkordato & Mali Durum:</span>
            <span className={`font-semibold ${selectedNode.status === 'DANGER' ? 'text-[#a23b35]' : 'text-[#0E1E33]'}`}>
              {selectedNode.concordatStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
