import React, { useState } from 'react';
import { WorkOrderData } from '../types';
import { X, Check, RotateCcw, Zap, Link2, ShieldCheck, Plus, Minus } from 'lucide-react';

interface TerminationsWeldsLugsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrder: WorkOrderData;
  onSave: (updated: WorkOrderData) => void;
}

export const TerminationsWeldsLugsModal: React.FC<TerminationsWeldsLugsModalProps> = ({
  isOpen,
  onClose,
  workOrder,
  onSave,
}) => {
  const [formData, setFormData] = useState<WorkOrderData>({ ...workOrder });
  const [activeTab, setActiveTab] = useState<'all' | 'terminations' | 'welds' | 'lugs'>('all');

  if (!isOpen) return null;

  const handleUpdate = (
    category: 'welds' | 'lugs' | 'terminations',
    key: string,
    val: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: val,
      },
    }));
  };

  const adjustNumeric = (
    category: 'welds' | 'lugs' | 'terminations',
    key: string,
    delta: number
  ) => {
    const current = (formData[category] as any)[key] || '0';
    const num = parseInt(current.replace(/[^0-9]/g, ''), 10) || 0;
    const nextVal = Math.max(0, num + delta);
    const formatted = nextVal < 10 ? `0${nextVal}` : `${nextVal}`;
    handleUpdate(category, key, formatted);
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden font-['Cairo',sans-serif]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">تعديل أرقام النهاية واللحام واللقزات</h2>
              <p className="text-xs text-amber-100/90">
                تحديث سريع ومعتمد لكميات وأرقام النهايات والمفاصل واللقزات في جدول كروكي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            عرض الكل معاً
          </button>
          <button
            onClick={() => setActiveTab('terminations')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'terminations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            النهايات (Terminations)
          </button>
          <button
            onClick={() => setActiveTab('welds')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'welds'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            اللحامات (Welds / Joints)
          </button>
          <button
            onClick={() => setActiveTab('lugs')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'lugs'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            اللقزات (Lugs)
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: النهايات (Terminations) */}
          {(activeTab === 'all' || activeTab === 'terminations') && (
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  <h3 className="font-bold text-sm text-blue-900">أرقام النهايات (Terminations)</h3>
                </div>
                <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md font-medium">
                  نهايات الكيابل: 70، 185، 300، 500
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 't70', label: 'نهاية 70' },
                  { key: 't185', label: 'نهاية 185' },
                  { key: 't300', label: 'نهاية 300' },
                  { key: 't500', label: 'نهاية 500' },
                ].map(({ key, label }) => {
                  const val = (formData.terminations as any)[key] || '00';
                  return (
                    <div
                      key={key}
                      className="bg-white border border-blue-200 rounded-lg p-2.5 shadow-xs flex flex-col items-center gap-1.5"
                    >
                      <span className="text-xs font-bold text-slate-700">{label}</span>
                      <div className="flex items-center gap-1 w-full justify-center">
                        <button
                          type="button"
                          onClick={() => adjustNumeric('terminations', key, -1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="إنقاص 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleUpdate('terminations', key, e.target.value)}
                          className="w-14 text-center font-mono font-bold text-sm text-blue-900 bg-blue-50/50 border border-blue-300 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => adjustNumeric('terminations', key, 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="زيادة 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        {['00', '01', '02', '—'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleUpdate('terminations', key, preset)}
                            className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 hover:bg-blue-100 text-slate-700"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: اللحامات (Welds) */}
          {(activeTab === 'all' || activeTab === 'welds') && (
            <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
                  <h3 className="font-bold text-sm text-rose-900">أرقام اللحامات والمفاصل (Welds / Joints)</h3>
                </div>
                <span className="text-[11px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md font-medium">
                  اللحامات: 70، 300، 500
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'w70', label: 'لحام 70 (Weld 70)' },
                  { key: 'w300', label: 'لحام 300 (Weld 300)' },
                  { key: 'w500', label: 'لحام 500 (Weld 500)' },
                ].map(({ key, label }) => {
                  const val = (formData.welds as any)[key] || '00';
                  return (
                    <div
                      key={key}
                      className="bg-white border border-rose-200 rounded-lg p-2.5 shadow-xs flex flex-col items-center gap-1.5"
                    >
                      <span className="text-xs font-bold text-slate-700">{label}</span>
                      <div className="flex items-center gap-1 w-full justify-center">
                        <button
                          type="button"
                          onClick={() => adjustNumeric('welds', key, -1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="إنقاص 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleUpdate('welds', key, e.target.value)}
                          className="w-16 text-center font-mono font-bold text-sm text-rose-900 bg-rose-50/50 border border-rose-300 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-rose-500"
                        />
                        <button
                          type="button"
                          onClick={() => adjustNumeric('welds', key, 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="زيادة 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        {['00', '01', '02', '03'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleUpdate('welds', key, preset)}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 hover:bg-rose-100 text-slate-700"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: اللقزات (Lugs) */}
          {(activeTab === 'all' || activeTab === 'lugs') && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                  <h3 className="font-bold text-sm text-emerald-900">أرقام اللقزات (Lugs / Taps)</h3>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-medium">
                  اللقزات: 70، 185، 300، 500
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'l70', label: 'لقز 70' },
                  { key: 'l185', label: 'لقز 185' },
                  { key: 'l300', label: 'لقز 300' },
                  { key: 'l500', label: 'لقز 500' },
                ].map(({ key, label }) => {
                  const val = (formData.lugs as any)[key] || '00';
                  return (
                    <div
                      key={key}
                      className="bg-white border border-emerald-200 rounded-lg p-2.5 shadow-xs flex flex-col items-center gap-1.5"
                    >
                      <span className="text-xs font-bold text-slate-700">{label}</span>
                      <div className="flex items-center gap-1 w-full justify-center">
                        <button
                          type="button"
                          onClick={() => adjustNumeric('lugs', key, -1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="إنقاص 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleUpdate('lugs', key, e.target.value)}
                          className="w-14 text-center font-mono font-bold text-sm text-emerald-900 bg-emerald-50/50 border border-emerald-300 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => adjustNumeric('lugs', key, 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                          title="زيادة 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        {['00', '01', '02', '—'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleUpdate('lugs', key, preset)}
                            className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 hover:bg-emerald-100 text-slate-700"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setFormData({ ...workOrder })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة تعيين للقيم السابقة</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Check className="w-4 h-4" />
              <span>حفظ وتحديث الجدول فوراً</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
