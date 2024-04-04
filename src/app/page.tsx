"use client"

import favicon from "@/app/assets/images/logo.svg";
import iconDollar from "@/app/assets/images/icon-dollar.svg";
import iconPerson from "@/app/assets/images/icon-person.svg";
import { useState } from "react";

export default function Home() {
  const [bill, setBill] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [customTipPercent, setCustomTipPercent] = useState<number>();

  const pageFunction = (billNum: number, peopleNum: number, tipPercentNum: number) => {
    setBill(billNum);
    setPeople(peopleNum);
    setTipAmount(tipPercentNum);

    if (bill !== undefined && people !== undefined && tipAmount !== undefined) {
      let tipDecimal = tipAmount / 100;
      setTotalAmount(bill * tipDecimal)
      setTipAmount((bill * tipDecimal) / people)
    }
  
  }

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
        <img className="my-32" src={favicon.src} alt="" />
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
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-28" onClick={() => handlePercent(0.05)}>5%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-28" onClick={() => handlePercent(0.1)}>10%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-28" onClick={() => handlePercent(0.15)}>15%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-28" onClick={() => handlePercent(0.25)}>25%</button>
              <button className="text-center bg-button rounded-md text-button-text text-2xl py-2 w-28" onClick={() => handlePercent(0.5)}>50%</button>
              <input className="text-center rounded-md text-2xl py-2 w-28" onChange={(e) => handleCustomPercent(parseInt(e.target.value))} type="number" placeholder="Custom" />
            </div>
            <p className="text-sm text-header">Number of People</p>
            <div className="flex items-center bg-input rounded-sm py-2 px-4">
              <img src={iconPerson.src} alt="dollar icon" />
              <input className="text-right text-inputText bg-invis outline-none rounded-r-sm text-2xl placeholder-inputPlaceholder w-full" onChange={handlePeople} type="number" placeholder="0" />
            </div>
          </div>
          <div className="bg-button rounded-md p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <div>
                  <p className=" text-container">Tip Amount</p>
                  <p className="text-header">/ person</p>
                </div>
                <p className="text-5xl text-amount">${tipAmount ? tipAmount : "0.00"}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-container">Total</p>
                  <p className="text-header">/ person</p>
                </div>
                <p className="text-5xl text-amount">${totalAmount ? totalAmount : "0.00"}</p>
              </div>
            </div>
            <div>
              <button className="bg-header w-full">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

