export default function Topbar({ onAdd }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur">
          <span className="text-lg">🐾</span>
        </div>
        <div>
          <div className="text-sm font-semibold">Pati Kasa</div>
          <div className="text-xs opacity-90">Petshop Gün Sonu • Satış Takibi</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur outline-none ring-1 ring-white/20">
          <option className="text-slate-900">Bugün</option>
          <option className="text-slate-900">Bu Hafta</option>
          <option className="text-slate-900">Bu Ay</option>
        </select>

        <select className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur outline-none ring-1 ring-white/20">
          <option className="text-slate-900">Kasa</option>
          <option className="text-slate-900">POS</option>
        </select>

        <button
          onClick={onAdd}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          + Satış Ekle
        </button>
      </div>
    </div>
  );
}
