"use client"

import favicon from "@/app/assets/images/logo.svg";
import iconDollar from "@/app/assets/images/icon-dollar.svg";
import iconPerson from "@/app/assets/images/icon-person.svg";
import { useState } from "react";

export default function Home() {
  const [bill, setBill] = useState<number>();
  const [people, setPeople] = useState<number>();
  const [tipAmount, setTipAmount] = useState<number>();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [tipPercent, setTipPercent] = useState<number>();
  const [peopleError, setPeopleError] = useState<string>();
  const [activeButton, setActiveButton] = useState<number | null>(null);;

  const pageFunction = (billNum: number | undefined, peopleNum: number | undefined, tipPercentNum: number | undefined) => {
    const billValue = billNum !== undefined ? billNum : 0;
    const peopleValue = peopleNum !== undefined ? peopleNum : 0;
    const tipPercentValue = tipPercentNum !== undefined ? tipPercentNum : 0;

    setBill(billValue);
    setPeople(peopleValue);
    setTipPercent(tipPercentValue);

    if (billValue !== undefined && peopleValue !== undefined && tipPercentValue !== undefined && tipPercentValue !== 0 && peopleValue !== 0) {
      let tipDecimal = tipPercentValue / 100;
      let tipAmountResult = (billValue * tipDecimal) / peopleValue;
      let totalAmountResult = (billValue + tipAmountResult) / peopleValue;

      if (!isNaN(tipAmountResult) && !isNaN(totalAmountResult)) {
        setTotalAmount(Math.round(totalAmountResult * 100) / 100);
        setTipAmount(Math.round(tipAmountResult * 100) / 100);
      } else {
        setTotalAmount(0);
        setTipAmount(0);
      }

      const resetButton = document.getElementById('resetButton');
      if (resetButton) {
        resetButton.className = "bg-amount hover:bg-body text-button hover:text-button w-full py-3 rounded-md"
      }
    }

    if (peopleNum == 0) {
      setPeopleError(`Can't be zero`)
      const peopleDiv = document.getElementById('peopleDiv');
      if (peopleDiv) {
        peopleDiv.className = "flex items-center bg-input rounded-md py-2 px-4 border-2 border-invis border-opacity-100 border-warning";
      }
    } else {
      setPeopleError('')
      const peopleDiv = document.getElementById('peopleDiv');
      if (peopleDiv) {
        peopleDiv.className = "flex items-center bg-input rounded-md py-2 px-4 border-2 border-invis hover:border-opacity-100 hover:border-amount";
      }
    }
  }


  const clearInfo = () => {
    setBill(undefined);
    setPeople(undefined);
    setTipPercent(undefined);
    setTipAmount(undefined);
    setTotalAmount(undefined);

    let billInput = document.getElementById('billInput') as HTMLInputElement;
    let peopleInput = document.getElementById('peopleInput') as HTMLInputElement;
    let customTipInput = document.getElementById('customTipInput') as HTMLInputElement;

    if (billInput && peopleInput && customTipInput) {
      billInput.value = '';
      peopleInput.value = '';
      customTipInput.value = '';
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.className = "bg-header hover:bg-body text-button hover:text-button w-full py-3 rounded-md"
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-body">
      <div className="flex flex-col">
        <img className="my-32" src={favicon.src} alt="" />
      </div>
      <div className="flex justify-center items-center bg-container p-8 rounded-2xl">
        <div className="grid grid-cols-2 gap-8">
          <div className="p-4">
            <p className="text-sm text-header">Bill</p>
            <div className="flex items-center bg-input rounded-md py-2 px-4 border-2 border-invis hover:border-opacity-100 hover:border-amount">
              <img src={iconDollar.src} alt="dollar icon" />
              <input onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} className="text-right text-inputText bg-invis outline-none rounded-r-sm text-2xl placeholder-inputPlaceholder w-full" onChange={(e) => pageFunction(parseInt(e.target.value), people, tipAmount)} type="number" placeholder="0" id="billInput" />
            </div>

            <p className=" text-sm text-header mt-8">Select Tip %</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <button className={`text-center hover:bg-amount hover:text-button ${activeButton === 5 ? "bg-amount" : "bg-button" } rounded-md text-button-text text-2xl py-2 w-28`} onClick={() => { pageFunction(bill, people, 5); setActiveButton(5); }}>5%</button>
              <button className={`text-center hover:bg-amount hover:text-button ${activeButton === 10 ? "bg-amount" : "bg-button" } rounded-md text-button-text text-2xl py-2 w-28`} onClick={() => { pageFunction(bill, people, 10); setActiveButton(10); }}>10%</button>
              <button className={`text-center hover:bg-amount hover:text-button ${activeButton === 15 ? "bg-amount" : "bg-button" } rounded-md text-button-text text-2xl py-2 w-28`} onClick={() => { pageFunction(bill, people, 15); setActiveButton(15); }}>15%</button>
              <button className={`text-center hover:bg-amount hover:text-button ${activeButton === 25 ? "bg-amount" : "bg-button" } rounded-md text-button-text text-2xl py-2 w-28`} onClick={() => { pageFunction(bill, people, 25); setActiveButton(25); }}>25%</button>
              <button className={`text-center hover:bg-amount hover:text-button ${activeButton === 50 ? "bg-amount text-button" : "bg-button text-button-text" } rounded-md text-2xl py-2 w-28`} onClick={() => { pageFunction(bill, people, 50); setActiveButton(50); }}>50%</button>
              <input onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} className="text-right px-2 text-inputText rounded-md text-2xl py-2 w-28 focus:outline-amount caret-amount placeholder:text-center" onChange={(e) => { pageFunction(bill, people, parseInt(e.target.value)), setActiveButton(null) }} type="number" placeholder="Custom" id="customTipInput" />
            </div>
            <div className="mt-8 flex justify-between">
              <p className="text-sm text-header">Number of People</p>
              <p className="text-sm text-warning">{peopleError}</p>
            </div>

            <div className="flex items-center bg-input rounded-md py-2 px-4 border-2 border-invis hover:border-opacity-100 hover:border-amount" id="peopleDiv">
              <img src={iconPerson.src} alt="dollar icon" />
              <input onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} className="text-right text-inputText bg-invis outline-none rounded-r-sm text-2xl placeholder-inputPlaceholder w-full" onChange={(e) => pageFunction(bill, parseInt(e.target.value), tipPercent)} type="number" placeholder="0" id="peopleInput" />
            </div>
          </div>
          <div className="bg-button rounded-md p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className=" text-container">Tip Amount</p>
                  <p className="text-header">/ person</p>
                </div>
                <p className="text-5xl text-amount">${tipAmount ? tipAmount : "0.00"}</p>
              </div>
              <div className="flex justify-between items-center mt-10">
                <div>
                  <p className="text-container">Total</p>
                  <p className="text-header">/ person</p>
                </div>
                <p className="text-5xl text-amount">${totalAmount ? totalAmount : "0.00"}</p>
              </div>
            </div>
            <div>
              <button id="resetButton" className="bg-header hover:bg-body text-button hover:text-button w-full py-3 rounded-md" onClick={clearInfo}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

