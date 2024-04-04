"use client"

import favicon from "@/app/assets/images/logo.svg";
import iconDollar from "@/app/assets/images/icon-dollar.svg";
import iconPerson from "@/app/assets/images/icon-person.svg";
import { useState } from "react";

export default function Home() {
  const [bill, setBill] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [customTipPercent, setCustomTipPercent] = useState<number>();

  const handleBill = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setBill(isNaN(value) ? 0 : value);
  }

  const handlePeople = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = await parseInt(event.target.value);
    await setPeople(undefined == value ? 1 : value);

    if (customTipPercent !== undefined && customTipPercent > 0) {
      await handleCustomPercent(customTipPercent);
    }
  }

  const handlePercent = (percent: number) => {
    let tip
    if(people && Number(people > 0)) {
      tip = (bill * percent) / people;
    } else {
      tip = bill * percent
    }
    let total = (bill * percent);
    setTipAmount(tip);
    setTotalAmount(total);
  }
  const handleCustomPercent = (percent: number) => {
    setCustomTipPercent(percent);
    percent = percent / 100
    let tip;
    if(people && Number(people > 0)) {
      tip = (bill * percent) / people;
    } else {
      tip = bill * percent
    }
    let total = (bill * percent);
    setTipAmount(tip);
    setTotalAmount(total);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-body">
      <div className="flex flex-col">
        <img src={favicon.src} alt="" />
      </div>
      <div className="flex justify-center items-center bg-container p-8 rounded-2xl">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-header">Bill</p>
            <div className="flex items-center bg-input rounded-sm py-2 px-4">
              <img src={iconDollar.src} alt="dollar icon" />
              <input className="text-right text-inputText bg-invis outline-none rounded-r-sm text-2xl placeholder-inputPlaceholder w-full" onChange={handleBill} type="number" placeholder="0" />
            </div>
      
            <p className=" text-sm text-header">Select Tip %</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-32" onClick={() => handlePercent(0.05)}>5%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-32" onClick={() => handlePercent(0.1)}>10%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-32" onClick={() => handlePercent(0.15)}>15%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-32" onClick={() => handlePercent(0.25)}>25%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-32" onClick={() => handlePercent(0.5)}>50%</button>
              <input className="text-center rounded-md text-2xl py-2 w-32" onChange={(e) => handleCustomPercent(parseInt(e.target.value))} type="number" placeholder="Custom" />
            </div>
            <p className="text-sm text-header">Number of People</p>
            <input className="text-right" onChange={handlePeople} type="number" placeholder="0" />
          </div>
          <div>
            <div className="flex">
              <div>
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <p>${tipAmount}</p>
            </div>
            <div className="flex">
              <div>
                <p>Total</p>
                <p>/ person</p>
              </div>
              <p>${totalAmount}</p>
            </div>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
}

