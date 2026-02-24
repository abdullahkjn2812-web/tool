import { useState, useEffect } from "react";
import "./App.css";

const CURRENCIES = ["USD", "PKR", "EUR", "GBP", "SAR", "AED"];

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [rate, setRate] = useState(280);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedAt, setupdateAt] = useState(null);

  const numericAmount = Number(amount);
  const safeAmount =
    Number.isFinite(numericAmount) && numericAmount > 0 ? numericAmount : 0;
  const converted = safeAmount * rate;

  function swapCurrencies() {
    const newFrom = to;
    const newTo = from;
    setFrom(newFrom);
    setTo(newTo);
  }
  useEffect(() => {
    if (from === to) {
      setRate(1);
      return;
    }

    async function fetchRate() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://open.er-api.com/v6/latest/${from}`,
        );
        const data = await response.json();
        console.log("keys : ", Object.keys(data.rates || {}));

        if (data.result !== "success") {
          setError("API error");
          return;
        }

        const nextRate = data.rates?.[to];
        if (!nextRate) {
          setError(`Rate not available for ${to}`);
          return;
        }

        setRate(nextRate);
        setupdateAt(new Date());
      } catch (err) {
        console.error("Fetch Error :", err);
        setError("Network Error");
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, [from, to]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Currency Converter</h1>

        <label className="text-sm text-slate-300">Amount</label>
        <input
          className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label className="text-sm text-slate-300">From</label>
            <select
              className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700"
            onClick={swapCurrencies}
            disabled={from === to}
            title="Swap"
          >
            ↔
          </button>

          <div>
            <label className="text-sm text-slate-300">To</label>
            <select
              className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-slate-950 border border-slate-800 p-4">
          {loading && <p className="text-slate-300">Loading rate...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && (
            <>
              <p className="text-lg">
                <span className="text-slate-300">{safeAmount}</span>{" "}
                <b>{from}</b> ={" "}
                <b className="text-emerald-400">{converted.toFixed(2)}</b>
                <b>{to}</b>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Rate: 1 {from} = {rate.toFixed(2)} {to}
                {updatedAt && (
                  <p className="mt-1 text-xs text-slate-500">
                    Updated: {updatedAt.toLocaleTimeString()}
                  </p>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
