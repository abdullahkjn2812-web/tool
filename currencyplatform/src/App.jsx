import React, { useEffect, useMemo, useState } from "react";

const CURRENCIES = [
  "USD",
  "INR",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "SGD",
  "SEK",
  "NOK",
  "DKK",
  "ZAR",
  "AED",
  "SAR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "THB",
  "IDR",
  "MYR",
  "PHP",
  "KRW",
  "TWD",
  "VND",
  "PKR",
  "BDT",
  "LKR",
  "NPR",
  "TRY",
  "RUB",
  "BRL",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "PEN",
  "EGP",
  "NGN",
  "KES",
];

function formatNumber(n) {
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(
    n,
  );
}

async function fetchRate(base, target) {
  const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Rate API failed (${res.status})`);
  const data = await res.json();

  if (data?.result !== "success")
    throw new Error(data?.error_type || "Rate API error");
  const r = data?.rates?.[target];
  if (!Number.isFinite(r)) throw new Error(`No rate for ${base} -> ${target}`);
  return r;
}

export default function App() {
  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount, setToAmount] = useState("0");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(null);

  const canConvert = useMemo(() => {
    const amt = Number(fromAmount);
    return Number.isFinite(amt) && amt >= 0 && fromCurrency && toCurrency;
  }, [fromAmount, fromCurrency, toCurrency]);

  async function handleConvert() {
    setError("");
    if (!canConvert) return;

    const amt = Number(fromAmount);
    setLoading(true);
    try {
      const r = await fetchRate(fromCurrency, toCurrency);
      setRate(r);
      setToAmount(String(amt * r));
    } catch (e) {
      setError(e?.message || "Something went wrong");
      setRate(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    setError("");
    setRate(null);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }

  useEffect(() => {
    const amt = Number(fromAmount);
    if (!Number.isFinite(amt) || amt === 0) return;
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen w-full text-white bg-[radial-gradient(1200px_600px_at_20%_80%,rgba(70,160,255,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(120,70,255,0.25),transparent_60%),linear-gradient(180deg,#040321,#071a55)]">
      {/* FULL WIDTH CARD */}
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-none mx-auto
      sm:rounded-[18px] border-0 sm:border-2 border-white/35
      bg-white/15 backdrop-blur-[14px]
      shadow-[0_24px_80px_rgba(0,0,0,0.35)]
      p-6 sm:p-8"
      >
        {/* FROM LABELS */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-[22px] sm:text-[26px] font-semibold text-white/60">
            From
          </div>
          <div className="text-[22px] sm:text-[26px] font-semibold text-white/60">
            Currency Type
          </div>
        </div>

        {/* FROM PANEL */}
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-6 py-5">
          <input
            className="w-[60%] bg-transparent text-[32px] sm:text-[40px] text-zinc-900 outline-none"
            inputMode="decimal"
            value={fromAmount}
            onChange={(e) =>
              setFromAmount(e.target.value.replace(/[^\d.]/g, ""))
            }
          />

          <select
            className="w-40 sm:w-45 cursor-pointer rounded-2xl border border-black/10 bg-[#f5f6fa] px-4 py-3 text-[22px] sm:text-[26px] text-zinc-900 outline-none lowercase"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* SWAP BUTTON - RESPONSIVE CENTER */}
        <div className="relative flex justify-center -my-3 z-10">
          <button
            type="button"
            onClick={handleSwap}
            className="rounded-xl bg-black px-4 py-2 text-[18px] sm:text-[22px] font-bold shadow-xl active:scale-[0.97]"
          >
            swap
          </button>
        </div>

        {/* TO LABELS */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-[22px] sm:text-[26px] font-semibold text-white/60">
            To
          </div>
          <div className="text-[22px] sm:text-[26px] font-semibold text-white/60">
            Currency Type
          </div>
        </div>

        {/* TO PANEL */}
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-6 py-5">
          <input
            className="w-[60%] bg-transparent text-[32px] sm:text-[40px] text-zinc-900 outline-none"
            readOnly
            value={formatNumber(Number(toAmount))}
          />

          <select
            className="w-[160px] sm:w-[180px] cursor-pointer rounded-2xl border border-black/10 bg-[#f5f6fa] px-4 py-3 text-[22px] sm:text-[26px] text-zinc-900 outline-none lowercase"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* CONVERT BUTTON */}
        <button
          type="button"
          onClick={handleConvert}
          disabled={!canConvert || loading}
          className="mt-7 w-full rounded-2xl bg-black px-6 py-5 text-[22px] sm:text-[26px] font-bold disabled:opacity-70"
        >
          {loading
            ? "Converting..."
            : `Convert ${fromCurrency} to ${toCurrency}`}
        </button>

        {/* RATE INFO */}
        <div className="mt-3 min-h-[26px]">
          {rate && !error && (
            <div className="text-white/75 text-sm">
              Rate: 1 {fromCurrency} = {formatNumber(rate)} {toCurrency}
            </div>
          )}
          {error && <div className="text-red-200 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
}
