import { formatTRY } from "../Interfaces/sale";

export default function SalesTable({ sales, onEdit, onDelete }) {
  if (!sales.length) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[rgba(244,160,139,0.45)] bg-white/60 p-10 text-center shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-[rgba(244,160,139,0.25)]">
          <span className="text-xl">🦴</span>
        </div>

        <div className="mt-3 text-base font-extrabold text-slate-900">
          Henüz satış yok
        </div>

        <div className="mt-1 text-sm text-slate-500">
          İlk kaydı ekleyip gün sonu raporunu otomatik hesaplayabilirsin.
        </div>

        <div className="mt-4 text-sm text-slate-500">
          İpucu:{" "}
          <span className="font-semibold text-slate-700">Mama</span>,{" "}
          <span className="font-semibold text-slate-700">Kum</span>,{" "}
          <span className="font-semibold text-slate-700">Oyuncak</span> gibi
          ürünlerle başla.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[20px] ring-1 ring-black/5">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase">
          <tr className="border-b border-[rgba(244,160,139,0.20)] bg-[rgba(244,160,139,0.10)] text-[color:var(--coral)]">
            <th className="py-3 pr-3 pl-3 font-extrabold">Müşteri</th>
            <th className="py-3 pr-3 font-extrabold">Ürün</th>
            <th className="py-3 pr-3 font-extrabold">Birim</th>
            <th className="py-3 pr-3 font-extrabold">Adet</th>
            <th className="py-3 pr-3 font-extrabold">Toplam</th>
            <th className="py-3 pr-3 font-extrabold">Tarih</th>
            <th className="py-3 pr-3 text-right font-extrabold">İşlem</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {sales.map((s) => {
            const total = s.price * s.quantity;
            return (
              <tr
                key={s.id}
                className="border-b border-slate-100 hover:bg-[rgba(120,199,195,0.12)] transition"
              >
                <td className="py-3 pr-3 pl-3 font-semibold text-slate-900">
                  {s.customerName}
                </td>
                <td className="py-3 pr-3 text-slate-700">{s.itemName}</td>
                <td className="py-3 pr-3 text-slate-700">{formatTRY(s.price)}</td>
                <td className="py-3 pr-3 text-slate-700">{s.quantity}</td>
                <td className="py-3 pr-3 font-extrabold text-slate-900">
                  {formatTRY(total)}
                </td>
                <td className="py-3 pr-3 text-slate-500">
                  {new Date(s.createdAt).toLocaleString("tr-TR")}
                </td>
                <td className="py-3 pr-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(s)}
                      className="rounded-xl border-2 border-[rgba(244,160,139,0.55)]
                                 px-3 py-1.5 text-xs font-extrabold text-slate-700
                                 hover:bg-[rgba(244,160,139,0.12)] transition"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="rounded-xl bg-[rgba(244,160,139,0.16)]
                                 px-3 py-1.5 text-xs font-extrabold text-[color:var(--coral)]
                                 hover:bg-[rgba(244,160,139,0.22)] transition"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
