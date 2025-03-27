import { useState } from "react";

export default function Home() {
  const [blocks, setBlocks] = useState(10);
  const [domes, setDomes] = useState(2);
  const [telehandlers, setTelehandlers] = useState(2);
  const [slowMonth, setSlowMonth] = useState(false);

  const profitPerBlock = 353;
  const profitPerDome = 1353;
  const profitPerTelehandler = 890;

  const monthlyProfit =
    blocks * profitPerBlock +
    domes * profitPerDome +
    telehandlers * profitPerTelehandler;

  const adjustedProfit = slowMonth ? monthlyProfit * 0.5 : monthlyProfit;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Monthly Profit Forecaster</h1>

      <label>Concrete Loads (One Way, 540km): {blocks}</label>
      <input type="range" min="0" max="20" value={blocks} onChange={(e) => setBlocks(Number(e.target.value))} />
      <p>{blocks} loads @ ${profitPerBlock} profit each</p>

      <label>MegaDome Pickups (One Way, 540km): {domes}</label>
      <input type="range" min="0" max="10" value={domes} onChange={(e) => setDomes(Number(e.target.value))} />
      <p>{domes} pickups @ ${profitPerDome} saved each</p>

      <label>Telehandler Moves (One Way, 200km): {telehandlers}</label>
      <input type="range" min="0" max="10" value={telehandlers} onChange={(e) => setTelehandlers(Number(e.target.value))} />
      <p>{telehandlers} moves @ ${profitPerTelehandler} profit each</p>

      <label>
        <input type="checkbox" checked={slowMonth} onChange={(e) => setSlowMonth(e.target.checked)} />
        Apply Winter Slowdown (50% Revenue)
      </label>

      <h2>Estimated Monthly Profit: ${adjustedProfit.toFixed(2)}</h2>
    </div>
  );
}