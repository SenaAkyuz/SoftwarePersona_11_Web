import { useEffect, useMemo, useState } from "react";
import { emptySale, safeNumber } from "../Interfaces/sale";

export default function SaleModal({ open, onClose, onCreate, onUpdate, editing }) {
  const isEdit = useMemo(() => Boolean(editing), [editing]);

  const [form, setForm] = useState(emptySale);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setError("");
    if (editing) {
      setForm({
        customerName: editing.customerName,
        itemName: editing.itemName,
        price: String(editing.price),
        quantity: editing.quantity,
      });
    } else {
      setForm(emptySale);
    }
  }, [open, editing]);

  if (!open) return null;

  function submit() {
    setError("");

    const customerName = form.customerName.trim();
    const itemName = form.itemName.trim();
    const price = safeNumber(form.price);
    const quantity = safeNumber(form.quantity);

    if (!customerName || !itemName) {
      setError("Müşteri adı ve ürün adı zorunlu.");
      return;
    }
    if (price <= 0) {
      setError("Fiyat 0'dan büyük olmalı.");
      return;
    }
    if (quantity <= 0) {
      setError("Adet 0'dan büyük olmalı.");
      return;
    }

    const payload = { customerName, itemName, price, quantity };

    if (editing) onUpdate(editing.id, payload);
    else onCreate(payload);

    onClose();
  }

  const inputClass =
    "rounded-2xl border-2 border-[rgba(244,160,139,0.55)] bg-white px-4 py-3 outline-none " +
    "focus:border-[color:var(--coral)] focus:ring-4 focus:ring-[rgba(120,199,195,0.25)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] ring-1 ring-[rgba(244,160,139,0.35)]">
        <div className="flex items-start justify-between gap-4">
          <div className="pr-2">
            <div className="text-xs font-extrabold tracking-[0.25em] text-[color:var(--coral)]">
              {isEdit ? "GÜNCELLE" : "YENİ KAYIT"}
            </div>
            <h3 className="mt-1 text-lg font-extrabold text-slate-900">
              {isEdit ? "Satış Kaydını Güncelle" : "Yeni Satış Ekle"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Müşteri, ürün, fiyat ve adet bilgilerini gir.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border-2 border-[rgba(244,160,139,0.45)] px-3 py-2 text-sm font-extrabold text-[color:var(--coral)]
                       hover:bg-[rgba(244,160,139,0.12)] transition"
          >
            Kapat
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4">
          <label className="grid gap-1.5">
            <span className="text-xs font-extrabold text-slate-700">
              Müşteri Adı
            </span>
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className={inputClass}
              placeholder="Örn: Ahmet Y."
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-xs font-extrabold text-slate-700">Ürün Adı</span>
            <input
              value={form.itemName}
              onChange={(e) => setForm({ ...form, itemName: e.target.value })}
              className={inputClass}
              placeholder="Örn: Kedi Maması 2kg"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-xs font-extrabold text-slate-700">
                Birim Fiyat (₺)
              </span>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
                min={0}
                step="0.01"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-extrabold text-slate-700">Adet</span>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className={inputClass}
                min={1}
                step="1"
              />
            </label>
          </div>

          <div className="rounded-[20px] bg-[rgba(120,199,195,0.12)] p-4 text-sm text-slate-800 ring-1 ring-[rgba(120,199,195,0.30)]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Anlık Toplam</span>
              <span className="font-extrabold">
                {(safeNumber(form.price) * safeNumber(form.quantity)).toFixed(2)} ₺
              </span>
            </div>
          </div>

          {error ? (
            <div className="rounded-[20px] bg-[rgba(244,160,139,0.16)] p-4 text-sm text-[color:var(--coral)] ring-1 ring-[rgba(244,160,139,0.35)]">
              <span className="font-semibold">{error}</span>
            </div>
          ) : null}

          <div className="mt-1 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-2xl border-2 border-[color:var(--coral)] px-5 py-3 text-sm font-extrabold text-[color:var(--coral)]
                         hover:bg-[rgba(244,160,139,0.12)] transition"
            >
              Vazgeç
            </button>

            <button
              onClick={submit}
              className="rounded-2xl bg-[color:var(--mint)] px-5 py-3 text-sm font-extrabold text-white
                         shadow-[0_10px_20px_rgba(120,199,195,0.35)]
                         hover:bg-[color:var(--mint-dark)] transition"
            >
              {isEdit ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
