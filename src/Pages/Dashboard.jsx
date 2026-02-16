import { useEffect, useMemo, useState } from "react";
import StatCard from "../Components/StatCard";
import SalesTable from "../Components/SalesTable";
import SaleModal from "../Components/SaleModal";
import { formatTRY } from "../Interfaces/sale";

const LS_KEY = "gun_sonu_kasa_sales_v1";

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // load
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      setSales(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(sales));
  }, [sales]);

  const totals = useMemo(() => {
    const totalRevenue = sales.reduce((acc, s) => acc + s.price * s.quantity, 0);
    const totalQty = sales.reduce((acc, s) => acc + s.quantity, 0);
    const totalOrders = sales.length;
    const avgBasket = totalOrders ? totalRevenue / totalOrders : 0;

    return { totalRevenue, totalQty, totalOrders, avgBasket };
  }, [sales]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(sale) {
    setEditing(sale);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setEditing(null);
  }

  // EKLE
  function createSale(draft) {
    const newSale = {
      id: uid(),
      createdAt: new Date().toISOString(),
      ...draft,
    };
    setSales((prev) => [newSale, ...prev]);
  }

  // GÜNCELLE
  function updateSale(id, draft) {
    setSales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...draft } : s))
    );
  }

  // SİL
  function deleteSale(id) {
    setSales((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="min-h-screen paw-pattern">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ÜST: HOŞ GELDİN KARTI */}
        <div className="rounded-[28px] bg-white/80 p-6 backdrop-blur shadow-[0_12px_30px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(120,199,195,0.25)]">
                <span className="text-2xl">🐾</span>
              </div>

              <div>
                <div className="text-xs font-extrabold tracking-[0.25em] text-[color:var(--coral)]">
                  HOŞ GELDİN
                </div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  Pawly • Gün Sonu Kasa
                </h1>
                <p className="text-sm text-slate-500">
                  Evcil dostların için en iyisini keşfetmeye devam et!
                </p>
              </div>
            </div>

            <button
              onClick={openCreate}
              className="rounded-2xl bg-[color:var(--mint)] px-5 py-3 text-sm font-extrabold text-white
                         shadow-[0_10px_20px_rgba(120,199,195,0.35)]
                         hover:bg-[color:var(--mint-dark)] transition"
            >
              + Satış Ekle
            </button>
          </div>

          {/* NET */}
          <div className="mt-6 rounded-[24px] bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.06)] ring-1 ring-[rgba(244,160,139,0.20)]">
            <div className="text-xs font-extrabold tracking-[0.25em] text-[color:var(--coral)]">
              NET
            </div>
            <div className="mt-2 text-3xl font-extrabold text-slate-900">
              {formatTRY(totals.totalRevenue)}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Bugünkü toplam kazanç
            </div>
          </div>

          {/* STAT KARTLAR */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              title="Toplam Gelir"
              value={formatTRY(totals.totalRevenue)}
              hint="Bugün"
            />
            <StatCard
              title="İşlem"
              value={String(totals.totalOrders)}
              hint="Kayıt sayısı"
            />
            <StatCard
              title="Satılan Adet"
              value={String(totals.totalQty)}
              hint="Toplam ürün"
            />
            <StatCard
              title="Ortalama Sepet"
              value={formatTRY(totals.avgBasket)}
              hint="Sipariş başı"
            />
          </div>
        </div>

        {/* ALT: TABLO KARTI */}
        <div className="mt-6 rounded-[28px] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] ring-1 ring-[rgba(244,160,139,0.25)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Satış Kayıtları
              </h2>
              <p className="text-sm text-slate-500">
                Ekle, düzenle, sil — gün sonu raporu otomatik.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="rounded-2xl border-2 border-[color:var(--coral)] px-4 py-2.5 text-sm font-extrabold text-[color:var(--coral)]
                         hover:bg-[rgba(244,160,139,0.12)] transition"
            >
              + Satış Ekle
            </button>
          </div>

          <div className="mt-4">
            <SalesTable sales={sales} onEdit={openEdit} onDelete={deleteSale} />
          </div>
        </div>
      </div>

      <SaleModal
        open={open}
        onClose={closeModal}
        onCreate={createSale}
        onUpdate={updateSale}
        editing={editing}
      />
    </div>
  );
}
