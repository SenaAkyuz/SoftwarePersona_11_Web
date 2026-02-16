export default function StatCard({ title, value, hint }) {
  return (
    <div
      className="rounded-[22px] bg-white px-5 py-4
                 shadow-[0_10px_24px_rgba(0,0,0,0.06)]
                 ring-1 ring-[rgba(244,160,139,0.20)]"
    >
      <div className="text-xs font-extrabold tracking-wide text-[color:var(--coral)]">
        {title}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}
