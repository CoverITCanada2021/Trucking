import { useState } from "react";

export default function Home() {
  const [fuelCost, setFuelCost] = useState(1.80);
  const [truckPayment, setTruckPayment] = useState(2277.14);
  const [insurance, setInsurance] = useState(333.33);
  const [driverWage, setDriverWage] = useState(30);
  const [wearRate, setWearRate] = useState(0.25);

  const [blockDistance, setBlockDistance] = useState(540);
  const [domeDistance, setDomeDistance] = useState(540);
  const [telehandlerDistance, setTelehandlerDistance] = useState(200);

  const [blocks, setBlocks] = useState(10);
  const [domes, setDomes] = useState(2);
  const [telehandlers, setTelehandlers] = useState(2);
  const [slowMonth, setSlowMonth] = useState(false);

  const fuelLoaded = 60;
  const fuelEmpty = 40;
  const avgSpeed = 80;

  const calcTrip = (distance, loadedOneWay = true) => {
    const fuelUsed = loadedOneWay
      ? ((fuelLoaded * distance) + (fuelEmpty * distance)) / 100
      : (fuelLoaded * 2 * distance) / 100;
    const fuelCostTotal = fuelUsed * fuelCost;
    const wear = distance * 2 * wearRate;
    const hours = (distance * 2) / avgSpeed;
    const driver = hours * driverWage;
    return fuelCostTotal + wear + driver;
  };

  const blockCost = calcTrip(blockDistance);
  const domeCost = calcTrip(domeDistance);
  const telehandlerCost = calcTrip(telehandlerDistance);

  const blockCharge = 2000;
  const domeSavings = 3000;
  const telehandlerCharge = 1500;

  const blockProfit = blockCharge - blockCost;
  const domeProfit = domeSavings - domeCost;
  const telehandlerProfit = telehandlerCharge - telehandlerCost;

  const monthlyFixed = truckPayment + insurance;
  const variableProfit = (blocks * blockProfit) + (domes * domeProfit) + (telehandlers * telehandlerProfit);
  const monthlyProfit = variableProfit - monthlyFixed;
  const adjustedProfit = slowMonth ? monthlyProfit * 0.5 : monthlyProfit;
  const annualProfit = (adjustedProfit * 4) + (monthlyProfit * 8);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Advanced Profit Forecasting Tool</h1>

      <h2>Global Settings</h2>
      <label>Fuel Cost ($/L): <input type="number" value={fuelCost} step="0.01" onChange={(e) => setFuelCost(+e.target.value)} /></label><br />
      <label>Truck Payment ($/mo): <input type="number" value={truckPayment} onChange={(e) => setTruckPayment(+e.target.value)} /></label><br />
      <label>Insurance ($/mo): <input type="number" value={insurance} onChange={(e) => setInsurance(+e.target.value)} /></label><br />
      <label>Driver Wage ($/hr): <input type="number" value={driverWage} onChange={(e) => setDriverWage(+e.target.value)} /></label><br />
      <label>Wear & Tear ($/km): <input type="number" value={wearRate} step="0.01" onChange={(e) => setWearRate(+e.target.value)} /></label><br />

      <h2>Distances (km one-way)</h2>
      <label>Block Load Distance: <input type="number" value={blockDistance} onChange={(e) => setBlockDistance(+e.target.value)} /></label><br />
      <label>MegaDome Distance: <input type="number" value={domeDistance} onChange={(e) => setDomeDistance(+e.target.value)} /></label><br />
      <label>Telehandler Distance: <input type="number" value={telehandlerDistance} onChange={(e) => setTelehandlerDistance(+e.target.value)} /></label><br />

      <h2>Monthly Load Counts</h2>
      <label>Concrete Loads: <input type="number" value={blocks} onChange={(e) => setBlocks(+e.target.value)} /></label><br />
      <label>MegaDome Pickups: <input type="number" value={domes} onChange={(e) => setDomes(+e.target.value)} /></label><br />
      <label>Telehandler Moves: <input type="number" value={telehandlers} onChange={(e) => setTelehandlers(+e.target.value)} /></label><br />

      <label>
        <input type="checkbox" checked={slowMonth} onChange={(e) => setSlowMonth(e.target.checked)} />
        Apply Winter Slowdown (50%)
      </label>

      <h2>Results</h2>
      <p>Monthly Fixed Costs: ${monthlyFixed.toFixed(2)}</p>
      <p>Variable Profit (before fixed): ${variableProfit.toFixed(2)}</p>
      <p><strong>Net Monthly Profit: ${adjustedProfit.toFixed(2)}</strong></p>
      <p><strong>Estimated Annual Profit: ${annualProfit.toFixed(2)}</strong></p>
    </div>
  );
}